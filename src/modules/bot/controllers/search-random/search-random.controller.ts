import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

const { BaseScene, Stage } = Scenes;

import { getMainKeyboard } from '../../utils/keyboard.util';
import { SearchRandomHelper } from './search-random.service';

export const searchRandomController = new BaseScene('search-random');

searchRandomController.enter(async (ctx: ContextMessageUpdate) => {
    ctx.reply(ctx.i18n.t('scenes.searchRandom.start'), { parse_mode: 'Markdown' });
});

searchRandomController.leave(async (ctx: ContextMessageUpdate) => {
    const { mainKeyboard } = getMainKeyboard(ctx);

    await ctx.reply(ctx.i18n.t('shared.whatNext'), mainKeyboard);
});

searchRandomController.command('leave', Stage.leave<any>());

const searchRandomHelper = new SearchRandomHelper(searchRandomController);
searchRandomHelper.onText();
searchRandomHelper.onNextButtonClick();
