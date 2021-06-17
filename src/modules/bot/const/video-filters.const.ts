import { KeyboardButton, MenuOptionPayload } from '../../bot-menu';
import { VideoFilterType } from '../interfaces';


export const VIDEO_FILTERS: KeyboardButton<MenuOptionPayload<VideoFilterType>>[][] = [
    [
        new KeyboardButton('Start', { group: VideoFilterType.FROM, value: 'start', default: true }),
        new KeyboardButton('2 Year', { group: VideoFilterType.FROM, value: '2 year' }),
        new KeyboardButton('1 Year', { group: VideoFilterType.FROM, value: '1 year' }),
        new KeyboardButton('3 Month', { group: VideoFilterType.FROM, value: '3 month' }),
        new KeyboardButton('Now', { group: VideoFilterType.FROM, value: 'now', default: true }),
    ],
];
