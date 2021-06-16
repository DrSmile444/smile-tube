// @ts-ignore
import * as deepEqual from 'deep-equal';

import { reduceArray } from '../../utils';
import { MenuFilters, MenuFormatters, MenuType } from './interfaces';
import { KeyboardButton } from './keyboard-button';

export const DEFAULT_FORMATTERS: MenuFormatters<any, MenuFilters<any>, any> = {
    stateToMenu: (state = {}, filters, menuType, groups) => {
        const groupKeys = Object.values(groups);
        const allButtons = filters.reduce(reduceArray);

        const newButtons: KeyboardButton<any>[] = [];

        switch (menuType) {
            case MenuType.CHECKBOX:
                groupKeys.forEach((group) => {
                    const checkboxButton = allButtons.filter((button) => {
                        return button.value.group === group && state[group]?.some((item) => deepEqual(item, button.value.value));
                    });
                    newButtons.push(...checkboxButton);
                });
                break;

            case MenuType.RADIO:
                groupKeys.forEach((group) => {
                    const radioButton = allButtons.find((button) => {
                        return button.value.group === group && button.value.value === state[group];
                    });

                    newButtons.push(radioButton);
                });
        }

        return newButtons.filter(Boolean);
    },
    menuToState: (menu, menuType, groups ) => {
        const groupKeys = Object.values(groups);
        const newState: { [key: string]: any | any[] } = {};

        switch (menuType) {
            case MenuType.CHECKBOX:
                groupKeys.forEach((group) => {
                   newState[group] = menu
                       .filter((button) => button.group === group)
                       .map((button) => button.value);
                });
                break;

            case MenuType.RADIO:
                groupKeys.forEach((group) => {
                    newState[group] = menu.find((button) => button.group === group)?.value;
                });
                break;
        }

        Object.keys(newState).forEach((key) => {
            const value = newState[key];
            if (!value && value !== 0) {
                delete newState[key];
            }
        });

        return newState;
    },
};