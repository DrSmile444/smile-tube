import { Telegraf } from 'telegraf';
import * as tg from 'telegraf/src/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';

import { youtubeService } from '../youtube-api';
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

    ctx.reply(`👋 Hello, @${ctx.update.message.from.username}!\n🔍 Searching for a passed channel\n\n*${ctx.message.text}*`, { parse_mode: 'Markdown' });
    ctx.telegram.sendChatAction(chatId, 'typing');

    try {
        const videos = await youtubeService.fetchVideosFromChannel(ctx.message.text, 30);
        const channelData = {
            thumbnail: videos.channel.thumbnail,
            options: {
                parse_mode: 'Markdown',
                caption: '🔍 Found the channel!\n*'
                    + videos.channel.title + '* with *' + videos.channel.videoCount + '* videos.\n\n'
                    + '🎲 Showing random 10 videos:',
            } as tt.ExtraPhoto,
        };

        const randomVideos = getRandomItemsFromArray(videos.videos, 10);
        const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = randomVideos.map((video) => ({
            caption: video.title + '\n\n' + video.watchUrl,
            media: video.thumbnail,
            type: 'photo',
        }));

        ctx.telegram.sendPhoto(chatId, channelData.thumbnail, channelData.options)
            .then(delayMessage(1000))
            .then(() => ctx.telegram.sendDice(chatId))
            .then(delayMessage(2000))
            .then(() => ctx.replyWithMediaGroup(mediaGroup));
    } catch (e) {
        console.error(e);
        ctx.reply(`Cannot find ${ctx.message.text} channel. Please, try another`);
    }


});

bot.launch().then(() => console.log('*** Bot has been started ***'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
