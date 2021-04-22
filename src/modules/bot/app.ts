import axios from 'axios';
import { Telegraf } from 'telegraf';
import { Context } from 'telegraf/src/context';
import * as tg from 'telegraf/src/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';

import { asyncFilter } from '../../utils';
import { FetchAction, FetchActionPayload, FetchActionType, Video, youtubeService } from '../youtube-api';
import { botLocalesEn } from './locales/bot_en';
import { getRandomItemsFromArray } from './utils';
require('dotenv').config();


function delayMessage(time) {
    return () => new Promise((resolve) => setTimeout(resolve, time));
}

export class BotApp {
    private bot: Telegraf;

    constructor() {
        this.bot = new Telegraf(process.env.BOT_TOKEN);
        this.onText();
    }

    start() {
        this.bot.launch().then(() => console.log('*** Bot has been started ***'));
    }

    stop(reason: string) {
        this.bot.stop(reason);
    }

    onText() {
        this.bot.on('text', async (ctx) => {
            const chatId = ctx.message.from.id;
            const username = ctx.update.message.from.username;
            const message = ctx.message.text;
            const { telegram } = ctx;

            ctx.reply(botLocalesEn.welcome(username, message), { parse_mode: 'Markdown' })
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
                ctx.reply(botLocalesEn.error(message));
                ctx.reply(e);
            }
        });
    }

    onFoundChannel(ctx: Context, action: FetchAction<FetchActionType.FOUND_CHANNEL>) {
        const { channel } = action.payload;
        const { telegram } = ctx;
        const chatId = ctx.message.from.id;
        ctx.state.channel = channel;

        const channelData = {
            thumbnail: channel.thumbnail,
            options: {
                parse_mode: 'Markdown',
                caption: botLocalesEn.foundChannel(channel.title, channel.videoCount),
            } as tt.ExtraPhoto,
        };

        telegram.sendPhoto(chatId, channelData.thumbnail, channelData.options);
    }

    onVideosFetched(ctx: Context, action: FetchAction<FetchActionType.VIDEOS_FETCHED>) {
        const { channel } = ctx.state;
        const { videos } = action.payload;

        ctx.reply(botLocalesEn.fetchVideo(channel.videoCount, videos.length));
    }

    async onFetchEnd(ctx: Context, action: FetchAction<FetchActionType.VIDEOS_FETCHED>) {
        const { telegram } = ctx;
        const chatId = ctx.message.from.id;

        // @ts-ignore
        const { videos } = action.payload as FetchActionPayload<FetchActionType.FETCH_END>;
        const randomVideos = await asyncFilter(getRandomItemsFromArray(videos, 10), this.validateVideo);
        const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = randomVideos.map((video) => ({
            caption: video.title + '\n\n' + video.watchUrl,
            media: video.thumbnail,
            type: 'photo',
        }));

        ctx.reply(botLocalesEn.fetchAllVideos(videos.length))
            .then(delayMessage(2000))
            .then(() => telegram.sendDice(chatId))
            .then(() => telegram.sendChatAction(chatId, 'upload_photo'))
            .then(delayMessage(2000))
            .then(() => ctx.replyWithMediaGroup(mediaGroup));
    }

    async validateVideo(video: Video) {
        try {
            await axios.get(video.thumbnail);
            return true;
        } catch (e) {
            return false;
        }
    }

    onError(ctx: Context, action: FetchActionPayload<FetchActionType.ERROR>) {
        const message = (ctx.message as any).text;
        const { error } = action;
        ctx.reply(botLocalesEn.error(message)).then(() => ctx.reply(error && error.message || String(error)));
    }
}

const botApp = new BotApp();
botApp.start();

// Enable graceful stop
process.once('SIGINT', () => botApp.stop('SIGINT'));
process.once('SIGTERM', () => botApp.stop('SIGTERM'));
