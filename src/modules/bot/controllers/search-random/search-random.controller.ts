import { match } from '@edjopato/telegraf-i18n';
import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

const { BaseScene, Stage } = Scenes;

import { getBackKeyboard, getMainKeyboard } from '../../utils/keyboard.util';
import { SearchRandomHelper } from './search-random.service';

export const searchRandomController = new BaseScene('search-random');

searchRandomController.enter(async (ctx: ContextMessageUpdate) => {
    const { backKeyboard } = getBackKeyboard(ctx);
    const extra = Object.assign(
        { parse_mode: 'Markdown' },
        backKeyboard,
    );

    ctx.reply(ctx.i18n.t('scenes.searchRandom.start'), extra as any);
});

searchRandomController.leave(async (ctx: ContextMessageUpdate) => {
    const { mainKeyboard } = getMainKeyboard(ctx);

    await ctx.reply(ctx.i18n.t('shared.whatNext'), mainKeyboard);
});

searchRandomController.command('leave', Stage.leave<any>());
searchRandomController.command('start', Stage.leave<any>());
searchRandomController.hears(match('keyboards.backKeyboard.back'), Stage.leave<any>());

const searchRandomHelper = new SearchRandomHelper(searchRandomController);
searchRandomHelper.onText();
searchRandomHelper.onNextButtonClick();
