import { KeyboardButton, MenuFilters } from 'telegraf-menu';

export const VIDEO_FILTERS: MenuFilters = [
    new KeyboardButton('Start', 'start', true),
    new KeyboardButton('2 Year', '2 year'),
    new KeyboardButton('1 Year', '1 year'),
    new KeyboardButton('3 Month', '3 month'),
    new KeyboardButton('Now', 'now', true),
];
