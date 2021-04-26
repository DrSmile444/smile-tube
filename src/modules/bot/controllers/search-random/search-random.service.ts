import { Context } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import * as tg from 'telegraf/src/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';
import { BaseScene } from 'telegraf/typings/scenes';

import { asyncMap } from '../../../../utils';
import { FetchAction, FetchActionPayload, FetchActionType, youtubeService } from '../../../youtube-api';
import { getRandomItemsFromArray } from '../../utils';
import { addFetchedChannel, delayMessage, getMediaGroup, moreButton, validateVideo } from './search-random.helper';


export class SearchRandomHelper {
    scene: BaseScene<Context<any>>;

    constructor(scene: BaseScene<Context<any>>) {
        this.scene = scene;
    }

    onText() {
        this.scene.on('text', async (ctx: ContextMessageUpdate) => {
            const chatId = ctx.message.from.id;
            const username = ctx.update.message.from.username;
            const message = ctx.message.text;
            const { telegram } = ctx;

            ctx.reply(ctx.i18n.t('scenes.searchRandom.searchChannel', { username, message }), { parse_mode: 'Markdown' })
                .then(() => telegram.sendChatAction(chatId, 'typing'));

            try {
                youtubeService.updateChannelVideosList(message)
                    .subscribe((action: FetchAction) => {
                        switch (action.type) {
                            case FetchActionType.FOUND_CHANNEL:
                                this.onFoundChannel(ctx, action as any);
                                break;

                            case FetchActionType.VIDEOS_FETCHED:
                                this.onVideosFetched(ctx, action as any);
                                break;

                            case FetchActionType.FETCH_END:
                                this.onFetchEnd(ctx, action as any);
                                break;

                            case FetchActionType.ERROR:
                                this.onError(ctx, action as any);
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

    onNextButtonClick() {
        this.scene.action('random_more', async (ctx: ContextMessageUpdate) => {
            const chatId = ctx.callbackQuery.from.id;

            if (!ctx.session.videos) {
                return ctx.reply(ctx.i18n.t('scenes.errors.botReset'));
            }

            const { videos } = ctx.session;
            const { telegram } = ctx;

            const randomVideos = await asyncMap(getRandomItemsFromArray(videos, 10), validateVideo);
            const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = getMediaGroup(ctx, randomVideos);

            ctx.session.videos = videos;

            telegram.sendDice(chatId)
                .then(() => telegram.sendChatAction(chatId, 'upload_photo'))
                .then(delayMessage(2000))
                .then(() => ctx.replyWithMediaGroup(mediaGroup))
                .then(moreButton(ctx));
        });
    }

    onFoundChannel(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.FOUND_CHANNEL>) {
        const { channel } = action.payload;
        const { telegram } = ctx;
        const chatId = ctx.message.from.id;

        ctx.session.channel = channel;
        addFetchedChannel(ctx, channel);

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

        const { videos } = action.payload;
        const randomVideos = await asyncMap(getRandomItemsFromArray(videos, 10), validateVideo);
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

    onError(ctx: ContextMessageUpdate, action: FetchActionPayload<FetchActionType.ERROR>) {
        const message = (ctx.message as any).text;
        const { error } = action;
        ctx.reply(ctx.i18n.t('scenes.errors.notFound', { message })).then(() => ctx.reply(error && error.message || String(error)));
    }
}
