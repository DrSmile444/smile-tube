// @ts-ignore
import * as deepEqual from 'deep-equal';
import { Markup } from 'telegraf';

import { getCtxInfo } from '../bot/controllers/search-random/search-random.helper';
import { DefaultCtx, MenuConfig, MenuOption, MenuOptionPayload, MenuOptionShort, MenuType } from './interfaces';
import { KeyboardButton } from './keyboard-button';


export class KeyboardMenu<T extends DefaultCtx = DefaultCtx, D extends any = string> {
    messageId: number;
    private activeButtons: MenuOptionPayload<D>[] = [];

    private RADIO_FORMATTING = {
        active: '🔘',
        disabled: '',
    };

    private CHECKBOX_FORMATTING = {
        active: '✅',
        disabled: '',
    };

    static remapCompactToFull<V>(options: MenuOptionShort<V>): MenuOption<V> {
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

    static remapFullToCompact<V>(options: MenuOption<V>): MenuOptionShort<V> {
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

    constructor(
        private menuConfig: MenuConfig<D>,
    ) {}

    setMessageId(id: number) {
        this.messageId = id;
    }

    toggleActiveButton(ctx: T, activeButtons: MenuOptionPayload<D>) {
        const { chatId } = getCtxInfo(ctx as any);

        switch (this.menuConfig.type) {
            case MenuType.RADIO:
                this.activeButtons = this.activeButtons.filter((button) => button.group !== activeButtons.group);
                this.activeButtons.push(activeButtons);
                break;

            case MenuType.CHECKBOX:
                let buttonIndex = null;

                this.activeButtons.some((button, index) => {
                    const isButtonInList = deepEqual(button, activeButtons);

                    if (isButtonInList) {
                        buttonIndex = index;
                        return true;
                    }
                });

                if (buttonIndex) {
                    this.activeButtons.splice(buttonIndex, 1);
                } else {
                    this.activeButtons.push(activeButtons);
                }
                break;
        }

        if (this.messageId) {
            ctx.telegram.editMessageText(chatId, this.messageId, null, this.menuConfig.message, this.getKeyboard());
        }
    }

    async sendMenu(ctx: T) {
        const sentMessage = await ctx.reply(this.menuConfig.message, this.getKeyboard());
        this.messageId = sentMessage.message_id;
    }

    getKeyboard() {
        const buttons = this.menuConfig.filters.map((row) => {
            return row.map((button) => {
                const shortButton = KeyboardMenu.remapFullToCompact({
                    action: this.menuConfig.action,
                    payload: button.value,
                });

                return Markup.button.callback(this.formatButtonLabel(button), JSON.stringify(shortButton));
            });
        });

        return Markup.inlineKeyboard(buttons);
    }

    private formatButtonLabel(button: KeyboardButton<MenuOptionPayload<D>>) {
        const isDefaultActiveButton = this.activeButtons
            .filter((activeButton) => activeButton.group === button.value.group)
            .length === 0 && !!button.value.default;

        const isActiveButton = this.activeButtons.some((activeButton) => {
            return deepEqual(activeButton, button.value);
        }) || isDefaultActiveButton;

        switch (this.menuConfig.type) {
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
