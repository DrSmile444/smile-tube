import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import { RegularMenu } from 'telegraf-menu';

import { SettingsFilter, SETTINGS_FILTERS } from '../const/settings-filters.const';
import { initLanguageMenu } from './language.menu';
import { initVideoFiltersMenu } from './video-filters.menu';

const { Stage } = Scenes;

export const initSettingsMenu = (ctx: ContextMessageUpdate) => {
    new RegularMenu<ContextMessageUpdate, SettingsFilter>(
        {
            action: 'settings',
            message: 'menu.settings.start',
            filters: SETTINGS_FILTERS,
            replaceable: true,
            menuGetter: (menuCtx) => menuCtx.scene.state.keyboardMenu,
            menuSetter(menuCtx, menu): any {
                menuCtx.scene.state.keyboardMenu = menu;
            },
            onChange: (changeCtx, state) => {
                console.log(state);
                switch (state) {
                    case SettingsFilter.BACK:
                        changeCtx.scene.state.keyboardMenu.destroyMenu(changeCtx);
                        changeCtx.scene.leave();
                        changeCtx.scene.enter('start');
                        break;

                    case SettingsFilter.LANGUAGE:
                        return initLanguageMenu(ctx, (submitCtx) => initSettingsMenu(submitCtx));
                        break;

                    case SettingsFilter.VIDEO_FILTERS:
                        return initVideoFiltersMenu(ctx, (submitCtx) => initSettingsMenu(submitCtx));
                        break;
                }
            },
        },
    ).sendMenu(ctx);
};
