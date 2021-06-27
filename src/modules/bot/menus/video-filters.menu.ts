import { ContextMessageUpdate } from 'telegraf-context';
import { RangeMenu } from 'telegraf-menu';

import { VIDEO_FILTERS } from '../const/video-filters.const';
import { VideoFilters } from '../interfaces';

export const initVideoFiltersMenu = (ctx: ContextMessageUpdate) => {
    new RangeMenu<ContextMessageUpdate, VideoFilters>(
        {
            action: 'videoFilters',
            message: 'menu.videoFilters.start',
            submitMessage: 'menu.videoFilters.submit',
            filters: VIDEO_FILTERS,
            state: ctx.session.videoFilters,
            menuGetter: (menuCtx) => menuCtx.scene.state.keyboardMenu,
            menuSetter(menuCtx, menu): any {
                menuCtx.scene.state.keyboardMenu = menu;
            },
            onChange: (changeCtx, state) => {
                changeCtx.session.videoFilters = state;
            },
        },
    ).sendMenu(ctx);
};
