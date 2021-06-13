import { Context, NarrowedContext } from 'telegraf';

import { KeyboardButton } from './keyboard-button';

export enum MenuType {
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
}

export interface Filter<T = string> {
    label: string;
    value: T;
}

export interface MenuConfig<T extends any = string> {
    action: string;
    type: MenuType;
    message: string;
    filters: KeyboardButton<MenuOptionPayload<T>>[][];
}

/**
 * action   - Menu action name
 * payload  - Menu action payload
 * */
export interface MenuOption<T = string> {
    a: string;
    p: MenuOptionPayload<T>;
}

/**
 *  group   - Button group
 *  value   - Button payload
 *  {boolean} default - Is Default selected Button
 * */
export interface MenuOptionPayload<T extends any = string> {
    g: T;
    v: string;
    d?: 1 | 0;
}

export type DefaultCtx = NarrowedContext<Context<any> & { match: RegExpExecArray; }, any>;

export type MenuContextUpdate<T extends DefaultCtx = DefaultCtx, D = string> = {
    state: {
        callbackData: MenuOption<D>;
    };
} & T;
