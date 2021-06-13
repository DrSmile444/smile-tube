import { KeyboardButton, MenuOptionPayload } from '../../bot-menu';
import { VideoFilterType } from '../interfaces';


export const VIDEO_FILTERS: KeyboardButton<MenuOptionPayload<VideoFilterType>>[][] = [
    [
        new KeyboardButton('2 Year', { g: VideoFilterType.FROM, v: '2 year' }),
        new KeyboardButton('1 Year', { g: VideoFilterType.FROM, v: '1 year' }),
        new KeyboardButton('3 Month', { g: VideoFilterType.FROM, v: '3 month' }),
        new KeyboardButton('Start', { g: VideoFilterType.FROM, v: 'start', d: 1 }),
    ],
    [
        new KeyboardButton('2 Year', { g: VideoFilterType.TO, v: '2 year' }),
        new KeyboardButton('1 Year', { g: VideoFilterType.TO, v: '1 year' }),
        new KeyboardButton('3 Month', { g: VideoFilterType.TO, v: '3 month' }),
        new KeyboardButton('Now', { g: VideoFilterType.TO, v: 'Now', d: 1 }),
    ],
];
