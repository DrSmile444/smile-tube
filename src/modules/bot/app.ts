import { Telegraf } from 'telegraf';
import * as tg from 'telegraf/src/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';

import { Channel, FetchAction, FetchActionPayload, FetchActionType, youtubeService } from '../youtube-api';
import { botLocalesEn } from './locales/bot_en';
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntArray(min, max, count) {
    const numberArray = [];

    new Array(count).fill(0).forEach(() => {
        let randomInt;

        do {
            randomInt = getRandomInt(min, max);
        } while (numberArray.includes(randomInt));

        numberArray.push(randomInt);
    });

    return numberArray;
}

function getRandomItemsFromArray(array, count) {
    const min = 0;
    const max = array.length - 1;
    const randomIndexes = getRandomIntArray(min, max, count);

    return randomIndexes.map((index) => array[index]);
}

function delayMessage(time) {
    return () => new Promise((resolve) => setTimeout(resolve, time));
}

bot.on('text', async (ctx) => {
    const chatId = ctx.message.from.id;
    const username = ctx.update.message.from.username;
    const message = ctx.message.text;
    const { telegram } = ctx;

    ctx.reply(botLocalesEn.welcome(username, message), { parse_mode: 'Markdown' })
        .then(() => telegram.sendChatAction(chatId, 'typing'));

    try {
        let channel: Channel;

        youtubeService.updateChannelVideosList(message)
            .subscribe((action: FetchAction) => {
                switch (action.type) {
                    case FetchActionType.FOUND_CHANNEL:
                        channel = (action.payload as FetchActionPayload<FetchActionType.FOUND_CHANNEL>).channel;

                        const channelData = {
                            thumbnail: channel.thumbnail,
                            options: {
                                parse_mode: 'Markdown',
                                caption: botLocalesEn.foundChannel(channel.title, channel.videoCount),
                            } as tt.ExtraPhoto,
                        };

                        telegram.sendPhoto(chatId, channelData.thumbnail, channelData.options);
                        break;

                    case FetchActionType.VIDEOS_FETCHED:
                        // @ts-ignore
                        const { videos } = action.payload as FetchActionPayload<FetchActionType.VIDEOS_FETCHED>;

                        ctx.reply(botLocalesEn.fetchVideo(channel.videoCount, videos.length));
                        break;

                    case FetchActionType.FETCH_END:
                        // @ts-ignore
                        const { videos } = action.payload as FetchActionPayload<FetchActionType.FETCH_END>;
                        const randomVideos = getRandomItemsFromArray(videos, 10);
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
                        break;

                    case FetchActionType.ERROR:
                        const { error } = action.payload as FetchActionPayload<FetchActionType.ERROR>;
                        ctx.reply(botLocalesEn.error(message)).then(() => ctx.reply(error.message));
                }
            });
    } catch (e) {
        console.error(e);
        ctx.reply(botLocalesEn.error(message));
        ctx.reply(e);
    }
});

bot.launch().then(() => console.log('*** Bot has been started ***'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
