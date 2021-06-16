import { KeyboardButton, MenuOptionPayload } from '../../bot-menu';
import { VideoFilterType } from '../interfaces';


export const VIDEO_FILTERS: KeyboardButton<MenuOptionPayload<VideoFilterType>>[][] = [
    [
        new KeyboardButton('2 Year', { group: VideoFilterType.FROM, value: '2 year' }),
        new KeyboardButton('1 Year', { group: VideoFilterType.FROM, value: '1 year' }),
        new KeyboardButton('3 Month', { group: VideoFilterType.FROM, value: '3 month' }),
        new KeyboardButton('Start', { group: VideoFilterType.FROM, value: null, default: true }),
    ],
    [
        new KeyboardButton('2 Year', { group: VideoFilterType.TO, value: '2 year' }),
        new KeyboardButton('1 Year', { group: VideoFilterType.TO, value: '1 year' }),
        new KeyboardButton('3 Month', { group: VideoFilterType.TO, value: '3 month' }),
        new KeyboardButton('Now', { group: VideoFilterType.TO, value: null, default: true }),
    ],
];
