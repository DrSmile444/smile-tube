import { match } from '@edjopato/telegraf-i18n';
import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

import { KeyboardMenu, MenuContextUpdate, MenuType, parseCallbackData } from '../../../bot-menu';
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
            type: MenuType.RANGE,
            filters: VIDEO_FILTERS,
            groups: VideoFilterType,
            state: { from: [] },
            menuGetter: (menuCtx: ContextMessageUpdate) => menuCtx.scene.state.keyboardMenu,
            onChange: (changeCtx, state) => {
                changeCtx.reply(JSON.stringify(state));
            },
            onSubmit(changeCtx: MenuContextUpdate<ContextMessageUpdate, VideoFilterType>, state: any): any {
                changeCtx.reply('submit:' + JSON.stringify(state));
            },
            onSubmitUpdater(changeCtx: MenuContextUpdate<ContextMessageUpdate, VideoFilterType>): any {
                changeCtx.editMessageText('Test after submit');
            },
        },
    );

    videoFiltersMenu.sendMenu(ctx);
    ctx.scene.state.keyboardMenu = videoFiltersMenu;
};

searchRandomController.command('test_range', initVideoFiltersCheckboxMenu);
searchRandomController.action(/videoFiltersCheckbox/, KeyboardMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initVideoFiltersCheckboxMenu,
));

searchRandomController.on('text', (ctx: ContextMessageUpdate) => searchRandomService.onText(ctx));
searchRandomService.onNextButtonClick();
