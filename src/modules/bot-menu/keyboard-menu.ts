// @ts-ignore
import * as deepEqual from 'deep-equal';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Markup } from 'telegraf';

import { getCtxInfo } from '../bot/controllers/search-random/search-random.helper';
import { DEFAULT_FORMATTERS } from './default-formatters';
import {
    DefaultCtx,
    MenuConfig,
    MenuFilters,
    MenuFormatters,
    MenuOption,
    MenuOptionPayload,
    MenuOptionShort,
    MenuType,
} from './interfaces';
import { KeyboardButton } from './keyboard-button';


export class KeyboardMenu<Ctx extends DefaultCtx = DefaultCtx, Group extends any = any, State extends object = any> {
    messageId: number;
    activeButtons: MenuOptionPayload<Group>[] = [];
    state: State;

    private RADIO_FORMATTING = {
        active: '🔘',
        disabled: '',
    };

    private CHECKBOX_FORMATTING = {
        active: '✅',
        disabled: '',
    };

    private _state$: BehaviorSubject<State> = new BehaviorSubject<State>(null);

    static remapCompactToFull<SGroup>(options: MenuOptionShort<SGroup>): MenuOption<SGroup> {
        const newOption = {
            action: options.a,
            payload: {
                default: !!options.p.d,
                group: options.p.g,
                value: options.p.v,
            },
        };

        if (!options.p.d) {
            delete newOption.payload.default;
        }

        return newOption;
    }

    constructor(
        private config: MenuConfig<Group, State>,
        private formatters: MenuFormatters<State, MenuFilters<Group>, Group> = DEFAULT_FORMATTERS,
    ) {
        if (config.state) {
            this.updateState(config.state);
        }
    }

    get state$() {
        return this._state$
            .asObservable()
            .pipe(skip(1));
    }

    static remapFullToCompact<SGroup>(options: MenuOption<SGroup>): MenuOptionShort<SGroup> {
        const newOption = {
            a: options.action,
            p: {
                d: Number(!!options.payload.default) as 1 | 0,
                g: options.payload.group,
                v: options.payload.value,
            },
        };

        if (!options.payload.default) {
            delete newOption.p.d;
        }

        return newOption;
    }

    setMessageId(id: number) {
        this.messageId = id;
    }

    toggleActiveButton(ctx: Ctx, activeButton: MenuOptionPayload<Group>) {
        let activeButtons = this.formatters.stateToMenu(
            this.state,
            this.config.filters,
            this.config.type,
            this.config.groups,
        ).map((button) => button.value);

        switch (this.config.type) {
            case MenuType.RADIO:
                activeButtons = activeButtons.filter((button) => button.group !== activeButton.group);
                activeButtons.push(activeButton);
                break;

            case MenuType.CHECKBOX:
                let buttonIndex = null;

                activeButtons.some((button, index) => {
                    const isButtonInList = deepEqual(button, activeButton);

                    if (isButtonInList) {
                        buttonIndex = index;
                        return true;
                    }
                });

                if (buttonIndex) {
                    activeButtons.splice(buttonIndex, 1);
                } else {
                    activeButtons.push(activeButton);
                }
                break;
        }

        const newState = this.formatters.menuToState(activeButtons, this.config.type, this.config.groups);
        this.activeButtons = activeButtons;
        this._state$.next(newState);
        this.state = newState;

        this.redrawMenu(ctx);
    }

    updateState(state: State, ctx?: Ctx) {
        this.activeButtons = this.formatters.stateToMenu(
            state,
            this.config.filters,
            this.config.type,
            this.config.groups,
        ).map((button) => button.value);
        this._state$.next(state);
        this.state = state;

        if (ctx) {
            this.redrawMenu(ctx);
        }
    }

    redrawMenu(ctx: Ctx) {
        const { chatId } = getCtxInfo(ctx as any);

        if (this.messageId) {
            ctx.telegram.editMessageText(chatId, this.messageId, null, this.config.message, this.getKeyboard());
        }
    }

    async sendMenu(ctx: Ctx) {
        const sentMessage = await ctx.reply(this.config.message, this.getKeyboard());
        this.messageId = sentMessage.message_id;
    }

    getKeyboard() {
        const buttons = this.config.filters.map((row) => {
            return row.map((button) => {
                const shortButton = KeyboardMenu.remapFullToCompact({
                    action: this.config.action,
                    payload: button.value,
                });

                return Markup.button.callback(this.formatButtonLabel(button), JSON.stringify(shortButton));
            });
        });

        return Markup.inlineKeyboard(buttons);
    }

    private formatButtonLabel(button: KeyboardButton<MenuOptionPayload<Group>>) {
        const isDefaultActiveButton = this.activeButtons
            .filter((activeButton) => activeButton.group === button.value.group)
            .length === 0 && !!button.value.default && this.config.type !== MenuType.CHECKBOX;

        const isActiveButton = this.activeButtons.some((activeButton) => {
            return deepEqual(activeButton, button.value);
        }) || isDefaultActiveButton;

        switch (this.config.type) {
            case MenuType.RADIO:
                return isActiveButton ?
                    this.RADIO_FORMATTING.active + ' ' + button.label :
                    this.RADIO_FORMATTING.disabled + ' ' + button.label;

            case MenuType.CHECKBOX:
                return isActiveButton ?
                    this.CHECKBOX_FORMATTING.active + ' ' + button.label :
                    this.CHECKBOX_FORMATTING.disabled + ' ' + button.label;
        }
    }
}
