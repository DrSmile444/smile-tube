import { KeyboardButton, MenuFilters } from 'telegraf-menu';

export enum SettingsFilter {
    VIDEO_FILTERS = 'video_filters',
    LANGUAGE = 'language',
    BACK = 'back',
}

export const SETTINGS_FILTERS: MenuFilters<SettingsFilter>[] = [
    [
        new KeyboardButton('menu.settings.button.videoFilters', SettingsFilter.VIDEO_FILTERS),
        new KeyboardButton('menu.settings.button.language', SettingsFilter.LANGUAGE),
    ],
    [
        new KeyboardButton('keyboards.backKeyboard.back', SettingsFilter.BACK),
    ],
];
