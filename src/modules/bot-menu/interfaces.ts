import { Context, NarrowedContext } from 'telegraf';

import { KeyboardButton } from './keyboard-button';
import { KeyboardMenu } from './keyboard-menu';

export enum MenuType {
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
}

export interface MenuConfig<Group extends any = string, State extends object = any, Ctx extends DefaultCtx = DefaultCtx> {
    action: string;
    type: MenuType;
    message: string;
    filters: MenuFilters<Group>;
    groups: object;
    onChange: (ctx: MenuContextUpdate<Ctx, Group>, state: State) => any;
    menuGetter?: (ctx: Ctx) => KeyboardMenu;
    state?: State;
}

export type MenuFilters<Group extends any = string> = KeyboardButton<MenuOptionPayload<Group>>[][];

export interface MenuFormatters<State extends object, Filters extends any[][], Group> {
    stateToMenu: (state: State, filters: Filters, type: MenuType, groups: object) => Filters[0];
    menuToState: (menu: MenuOptionPayload<Group>[], type: MenuType, groups: object) => State;
}

/**
 * Full types
 * */

export interface MenuOption<Group = string> {
    action: string;
    payload: MenuOptionPayload<Group>;
}

export interface MenuOptionPayload<Group extends any = string> {
    group: Group;
    value: string;
    default?: boolean;
}

/**
 * Short types for callback data
 * */

export interface MenuOptionShort<Group = string> {
    a: string;
    p: MenuOptionPayloadShort<Group>;
}

export interface MenuOptionPayloadShort<Group extends any = string> {
    g: Group;
    v: string;
    d?: 1 | 0;
}

export type DefaultCtx = NarrowedContext<Context<any> & { match: RegExpExecArray; }, any>;

export type MenuContextUpdate<Ctx extends DefaultCtx = DefaultCtx, Group = string> = {
    state: {
        callbackData: MenuOption<Group>;
    };
} & Ctx;
