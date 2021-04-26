import { I18n } from '@edjopato/telegraf-i18n';
import axios from 'axios';
import * as moment from 'moment';
import * as path from 'path';
import { Markup, Telegraf } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import * as LocalSession from 'telegraf-session-local';
import * as tg from 'telegraf/src/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';

import { asyncMap } from '../../utils';
import { FetchAction, FetchActionPayload, FetchActionType, Video, youtubeService } from '../youtube-api';
import { getUserInfo } from './middlewares';
import { getRandomItemsFromArray } from './utils';
require('dotenv').config();


function delayMessage(time) {
    return () => new Promise((resolve) => setTimeout(resolve, time));
}

const moreButton = (ctx: ContextMessageUpdate) => () => ctx.reply(ctx.i18n.t('scenes.shared.fetchMoreTitle'), Markup.inlineKeyboard([
    {
        text: ctx.i18n.t('scenes.shared.fetchMoreButton'),
        callback_data: 'random_more',
    },
]));

const getMediaGroup = (ctx: ContextMessageUpdate, videos: Video[]): ReadonlyArray<tg.InputMediaPhoto> => videos.map((video) => ({
    caption: [
        '<b>' + video.title + '</b>',
        '* ' + [
            ctx.i18n.t('scenes.shared.duration', { duration: video.duration }),
            ctx.i18n.t('scenes.shared.viewsCount', { views: video.viewCountText }),
            moment(video.publishedTime).fromNow(),
        ].join(' * '),
        '',
        'https://www.youtube.com/watch?v=' + video.videoId,
    ].join(('\n')),
    parse_mode: 'HTML',
    media: video.thumbnail,
    type: 'photo',
}));

export class BotApp {
    private bot: Telegraf;

    constructor() {
        this.bot = new Telegraf(process.env.BOT_TOKEN);

        // @ts-ignore
        const i18n = new I18n({
            defaultLanguage: 'en',
            directory: path.resolve(__dirname, 'locales'),
            useSession: true,
            sessionName: 'session',
        });

        const session = new LocalSession({ database: 'local.db.json' });

        this.bot.use(Telegraf.log());
        this.bot.use(session.middleware());
        this.bot.use(i18n.middleware());
        this.bot.use(getUserInfo);
        this.onNextButtonClick();
        this.onText();
    }

    start() {
        this.bot.launch().then(() => console.log('*** Bot has been started ***'));
    }

    stop(reason: string) {
        this.bot.stop(reason);
    }

    onNextButtonClick() {
        this.bot.action('random_more', async (ctx: ContextMessageUpdate) => {
            const chatId = ctx.callbackQuery.from.id;

            if (!ctx.session.videos) {
                // @ts-ignore
                return ctx.reply(ctx.i18n.t('scenes.errors.botReset'));
            }

            const { videos } = ctx.session;
            const { telegram } = ctx;

            const randomVideos = await asyncMap(getRandomItemsFromArray(videos, 10), this.validateVideo);
            const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = getMediaGroup(ctx, randomVideos);

            ctx.session.videos = videos;

            telegram.sendDice(chatId)
                .then(() => telegram.sendChatAction(chatId, 'upload_photo'))
                .then(delayMessage(2000))
                .then(() => ctx.replyWithMediaGroup(mediaGroup))
                .then(moreButton(ctx));
        });
    }

    onText() {
        this.bot.on('text', async (ctx: ContextMessageUpdate) => {
            const chatId = ctx.message.from.id;
            const username = ctx.update.message.from.username;
            const message = ctx.message.text;
            const { telegram } = ctx;

            ctx.reply(ctx.i18n.t('scenes.start.welcome', { username, message }), { parse_mode: 'Markdown' })
                .then(() => telegram.sendChatAction(chatId, 'typing'));

            try {
                youtubeService.updateChannelVideosList(message)
                    .subscribe((action: FetchAction) => {
                        switch (action.type) {
                            case FetchActionType.FOUND_CHANNEL:
                                this.onFoundChannel(ctx as any, action as any);
                                break;

                            case FetchActionType.VIDEOS_FETCHED:
                                this.onVideosFetched(ctx as any, action as any);
                                break;

                            case FetchActionType.FETCH_END:
                                this.onFetchEnd(ctx as any, action as any);
                                break;

                            case FetchActionType.ERROR:
                                this.onError(ctx as any, action as any);
                                break;
                        }
                    });
            } catch (e) {
                console.error(e);
                ctx.reply(ctx.i18n.t('scenes.errors.notFound', { message }));
                ctx.reply(e);
            }
        });
    }

    onFoundChannel(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.FOUND_CHANNEL>) {
        const { channel } = action.payload;
        const { telegram } = ctx;
        const chatId = ctx.message.from.id;
        ctx.session.channel = channel;

        const { title, videoCount } = channel;

        const channelData = {
            thumbnail: channel.thumbnail,
            options: {
                parse_mode: 'Markdown',
                caption: ctx.i18n.t('scenes.shared.foundChannel', { title, videoCount }),
            } as tt.ExtraPhoto,
        };

        telegram.sendPhoto(chatId, channelData.thumbnail, channelData.options);
    }

    onVideosFetched(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.VIDEOS_FETCHED>) {
        const { channel } = ctx.session;
        const { videos } = action.payload;

        ctx.reply(ctx.i18n.t('scenes.shared.fetchVideoProgress', { fetchedCount: channel.videoCount, videoCount: videos.length }));
    }

    async onFetchEnd(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.VIDEOS_FETCHED>) {
        const { telegram } = ctx;
        const chatId = ctx.message.from.id;

        // @ts-ignore
        const { videos } = action.payload as FetchActionPayload<FetchActionType.FETCH_END>;
        const randomVideos = await asyncMap(getRandomItemsFromArray(videos, 10), this.validateVideo);
        const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = getMediaGroup(ctx, randomVideos);

        ctx.session.videos = videos;

        ctx.reply(ctx.i18n.t('scenes.shared.fetchedAllVideos', { videoCount: videos.length }))
            .then(delayMessage(2000))
            .then(() => telegram.sendDice(chatId))
            .then(() => telegram.sendChatAction(chatId, 'upload_photo'))
            .then(delayMessage(2000))
            .then(() => ctx.replyWithMediaGroup(mediaGroup))
            .then(moreButton(ctx));
    }

    async validateVideo(video: Video): Promise<Video> {
        try {
            /**
             * Telegram cannot fetch some video previews and breaks the app.
             * To solve this issue, we're using mq previews instead
             * */
            await axios.get(`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`);

            return {
                ...video,
                thumbnail: `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`,
            };
        } catch (e) {
            try {
                await axios.get(video.thumbnail);

                console.log('*** NOTE: Using hqdefault with creds for https://www.youtube.com/watch?v=' + video.videoId);

                return video;
            } catch (e) {
                console.log('*** NOTE: Using deleted video for https://www.youtube.com/watch?v=' + video.videoId);

                return {
                    ...video,
                    thumbnail: `https://netstorage-tuko.akamaized.net/images/f66b622c39634a2c.jpg`,
                };
            }
        }
    }

    onError(ctx: ContextMessageUpdate, action: FetchActionPayload<FetchActionType.ERROR>) {
        const message = (ctx.message as any).text;
        const { error } = action;
        ctx.reply(ctx.i18n.t('scenes.errors.notFound', { message })).then(() => ctx.reply(error && error.message || String(error)));
    }
}

const botApp = new BotApp();
botApp.start();

// Enable graceful stop
process.once('SIGINT', () => botApp.stop('SIGINT'));
process.once('SIGTERM', () => botApp.stop('SIGTERM'));
