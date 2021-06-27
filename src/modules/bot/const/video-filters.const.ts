import { KeyboardButton, MenuFilters } from 'telegraf-menu';

export enum VideoFilter {
    START = 'start',
    FIVE_YEARS = '5 years',
    TWO_YEARS = '2 years',
    ONE_YEAR = '1 year',
    THREE_MONTH = '3 months',
    NOW = 'now',
}

export const VIDEO_FILTERS: MenuFilters<VideoFilter>[] = [
    [
        new KeyboardButton('menu.videoFilters.filter.start', VideoFilter.START, true),
        new KeyboardButton('menu.videoFilters.filter.fiveYears', VideoFilter.FIVE_YEARS),
        new KeyboardButton('menu.videoFilters.filter.twoYears', VideoFilter.TWO_YEARS),
    ],
    [
        new KeyboardButton('menu.videoFilters.filter.oneYear', VideoFilter.ONE_YEAR),
        new KeyboardButton('menu.videoFilters.filter.threeMonths', VideoFilter.THREE_MONTH),
        new KeyboardButton('menu.videoFilters.filter.now', VideoFilter.NOW, true),
    ],
];

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_MONTH * 12;

export const VIDEO_FILTERS_VALUES: Map<VideoFilter, number> = new Map<VideoFilter, number>();
VIDEO_FILTERS_VALUES.set(VideoFilter.START, null);
VIDEO_FILTERS_VALUES.set(VideoFilter.FIVE_YEARS, ONE_YEAR * 5);
VIDEO_FILTERS_VALUES.set(VideoFilter.TWO_YEARS, ONE_YEAR * 2);
VIDEO_FILTERS_VALUES.set(VideoFilter.ONE_YEAR, ONE_YEAR);
VIDEO_FILTERS_VALUES.set(VideoFilter.THREE_MONTH, ONE_MONTH * 3);
VIDEO_FILTERS_VALUES.set(VideoFilter.NOW, null);
