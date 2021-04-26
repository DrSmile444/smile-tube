import axios from 'axios';
import * as moment from 'moment';
import { Markup } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import * as tg from 'telegraf/src/core/types/typegram';

import { Video } from '../../../youtube-api';


export function delayMessage(time) {
    return () => new Promise((resolve) => setTimeout(resolve, time));
}

export const moreButton = (ctx: ContextMessageUpdate) => () => ctx.reply(ctx.i18n.t('scenes.shared.fetchMoreTitle'), Markup.inlineKeyboard([
    {
        text: ctx.i18n.t('scenes.shared.fetchMoreButton'),
        callback_data: 'random_more',
    },
]));

export const getMediaGroup = (ctx: ContextMessageUpdate, videos: Video[]): ReadonlyArray<tg.InputMediaPhoto> => videos.map((video) => ({
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

/**
 * @description
 * Returns valid video thumbnail for Telegram
 * */
export async function validateVideo(video: Video): Promise<Video> {
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