import { KeyboardButton, MenuFilters } from 'telegraf-menu';

export enum Language {
    EN = 'en',
    RU = 'ru',
}

export const LANGUAGE_FILTERS: MenuFilters<Language> = [
    new KeyboardButton('🇺🇸 English', Language.EN),
    new KeyboardButton('🇷🇺 Русский', Language.RU),
];
