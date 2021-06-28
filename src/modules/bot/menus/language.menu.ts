import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import { MenuContextUpdate, RadioMenu } from 'telegraf-menu';

import { Language, LANGUAGE_FILTERS } from '../const/language-filters.const';

const { Stage } = Scenes;

export const initLanguageMenu = (ctx: ContextMessageUpdate, onSubmit?: (submitCtx: MenuContextUpdate<ContextMessageUpdate>) => any) => {
    const menu = new RadioMenu<ContextMessageUpdate, Language>(
        {
            action: 'language',
            message: 'menu.language.start',
            submitMessage: 'menu.language.submit',
            filters: LANGUAGE_FILTERS,
            replaceable: true,
            state: ctx.i18n.locale() as Language,
            menuGetter: (menuCtx) => menuCtx.scene.state.keyboardMenu,
            menuSetter(menuCtx, menu): any {
                menuCtx.scene.state.keyboardMenu = menu;
            },
            beforeChange(changeCtx, state): any {
                changeCtx.i18n.locale(state);
            },
            onSubmit: (submitCtx, state) => {
                if (onSubmit) {
                    return onSubmit?.(submitCtx);
                }

                menu.destroyMenu(submitCtx);
                submitCtx.scene.enter('start');
            },
        },
    );

    menu.sendMenu(ctx);
};
