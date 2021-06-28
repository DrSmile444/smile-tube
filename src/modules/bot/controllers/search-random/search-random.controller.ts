import { match } from '@edjopato/telegraf-i18n';
import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import { GenericMenu } from 'telegraf-menu';

import { initVideoFiltersMenu } from '../../menus';
import { initLanguageMenu } from '../../menus/language.menu';
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

searchRandomController.use(GenericMenu.middleware());
searchRandomController.command('video_filters', initVideoFiltersMenu);
searchRandomController.action(/videoFilters/, GenericMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initVideoFiltersMenu,
));
searchRandomController.command('language', initLanguageMenu);
searchRandomController.action(/language/, GenericMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initLanguageMenu,
));

searchRandomController.on('text', (ctx: ContextMessageUpdate) => searchRandomService.onText(ctx));
searchRandomService.onNextButtonClick();
