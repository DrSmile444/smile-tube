import { ContextMessageUpdate } from 'telegraf-context';
import { MenuContextUpdate, RangeMenu } from 'telegraf-menu';

import { VIDEO_FILTERS } from '../const/video-filters.const';
import { VideoFilters } from '../interfaces';

export const initVideoFiltersMenu = (ctx: ContextMessageUpdate, onSubmit?: (submitCtx: MenuContextUpdate<ContextMessageUpdate>) => any) => {
    const menu = new RangeMenu<ContextMessageUpdate, VideoFilters>(
        {
            action: 'videoFilters',
            message: 'menu.videoFilters.start',
            submitMessage: 'menu.videoFilters.submit',
            filters: VIDEO_FILTERS,
            state: ctx.session.videoFilters,
            replaceable: true,
            menuGetter: (menuCtx) => menuCtx.scene.state.keyboardMenu,
            menuSetter(menuCtx, menu): any {
                menuCtx.scene.state.keyboardMenu = menu;
            },
            onChange: (changeCtx, state) => {
                changeCtx.session.videoFilters = state;
            },
            onSubmit(submitCtx): any {
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
