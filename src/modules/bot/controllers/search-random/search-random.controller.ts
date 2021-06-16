import { match } from '@edjopato/telegraf-i18n';
import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

import { reduceArray } from '../../../../utils';
import { KeyboardMenu, MenuType, parseCallbackData } from '../../../bot-menu';
import { MenuContextUpdate } from '../../../bot-menu/interfaces';
import { VIDEO_FILTERS } from '../../const/video-filters.const';
import { VideoFilters, VideoFilterType } from '../../interfaces';
import { getBackKeyboard, getMainKeyboard } from '../../utils/keyboard.util';
import { getSearchedChannelsButtons } from './search-random.helper';
import { SearchRandomService } from './search-random.service';

const { BaseScene, Stage } = Scenes;

export const searchRandomController = new BaseScene('search-random');

searchRandomController.enter(async (ctx: ContextMessageUpdate) => {
    const { backKeyboard } = getBackKeyboard(ctx);
    const channelsKeyboard = getSearchedChannelsButtons(ctx, ctx.session.searchedChannels);
    const extra = Object.assign(
        { parse_mode: 'Markdown' },
        backKeyboard,
    );

    await ctx.reply(ctx.i18n.t('scenes.searchRandom.start'), extra as any);

    if (channelsKeyboard) {
        await ctx.reply(ctx.i18n.t('scenes.searchRandom.searchedChannelsList'), channelsKeyboard);
    }
});

searchRandomController.leave(async (ctx: ContextMessageUpdate) => {
    const { mainKeyboard } = getMainKeyboard(ctx);

    await ctx.reply(ctx.i18n.t('shared.whatNext'), mainKeyboard);
});

searchRandomController.command('leave', Stage.leave<any>());
searchRandomController.command('start', Stage.leave<any>());
searchRandomController.hears(match('keyboards.backKeyboard.back'), Stage.leave<any>());

const searchRandomService = new SearchRandomService(searchRandomController);

searchRandomController.action(/searchChannel/, (ctx: ContextMessageUpdate) => {
    const channelData = JSON.parse(ctx.callbackQuery.data);
    searchRandomService.onText(ctx, channelData.p);
});

const initVideoFiltersMenu = (ctx: ContextMessageUpdate) => {
    const videoFiltersMenu = new KeyboardMenu<ContextMessageUpdate, VideoFilterType, VideoFilters>(
        {
            action: 'videoFilters',
            message: 'Test keyboard',
            type: MenuType.RADIO,
            filters: VIDEO_FILTERS,
            groups: VideoFilterType,
            state: ctx.session.videoFilters,
            menuGetter: (menuCtx: ContextMessageUpdate) => menuCtx.scene.state.keyboardMenu,
            onChange: (changeCtx, state) => {
                changeCtx.session.videoFilters = state;
                changeCtx.reply(JSON.stringify(state));
            },
        },
    );

    videoFiltersMenu.sendMenu(ctx);
    ctx.scene.state.keyboardMenu = videoFiltersMenu;
};

searchRandomController.use(parseCallbackData);

searchRandomController.command('test', initVideoFiltersMenu);
searchRandomController.action(/videoFilters/, KeyboardMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initVideoFiltersMenu,
));

const initVideoFiltersCheckboxMenu = (ctx: ContextMessageUpdate) => {
    const videoFiltersMenu = new KeyboardMenu<ContextMessageUpdate, VideoFilterType, any>(
        {
            action: 'videoFiltersCheckbox',
            message: 'Test keyboard',
            type: MenuType.CHECKBOX,
            filters: VIDEO_FILTERS,
            groups: VideoFilterType,
            state: {from: ['1 year', '3 month'], to: [null, '2 year']},
            menuGetter: (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
            onChange: (changeCtx, state) => {
                changeCtx.reply(JSON.stringify(state));
            },
        },
    );

    videoFiltersMenu.sendMenu(ctx);
    ctx.scene.state.keyboardMenu = videoFiltersMenu;
};

searchRandomController.command('test_checkbox', initVideoFiltersCheckboxMenu);
searchRandomController.action(/videoFiltersCheckbox/, KeyboardMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initVideoFiltersCheckboxMenu,
));

searchRandomController.on('text', (ctx: ContextMessageUpdate) => searchRandomService.onText(ctx));
searchRandomService.onNextButtonClick();
