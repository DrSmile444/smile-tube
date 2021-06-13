import { Context, NarrowedContext } from 'telegraf';

import { KeyboardButton } from './keyboard-button';

export enum MenuType {
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
}

export interface MenuConfig<T extends any = string> {
    action: string;
    type: MenuType;
    message: string;
    filters: KeyboardButton<MenuOptionPayload<T>>[][];
}

/**
 * Full types
 * */

export interface MenuOption<T = string> {
    action: string;
    payload: MenuOptionPayload<T>;
}

export interface MenuOptionPayload<T extends any = string> {
    group: T;
    value: string;
    default?: boolean;
}

/**
 * Short types for callback data
 * */

export interface MenuOptionShort<T = string> {
    a: string;
    p: MenuOptionPayloadShort<T>;
}

export interface MenuOptionPayloadShort<T extends any = string> {
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
