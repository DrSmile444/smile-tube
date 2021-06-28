import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

import { getMainKeyboard } from '../../utils/keyboard.util';
import { getCtxInfo } from '../search-random/search-random.helper';

const { BaseScene, Stage } = Scenes;

export const startController = new BaseScene('start');

startController.enter(async (ctx: ContextMessageUpdate) => {
    const { username } = getCtxInfo(ctx);
    const { mainKeyboard } = getMainKeyboard(ctx);

    if (ctx.session.channel) {
        await ctx.reply(ctx.i18n.t('scenes.start.welcomeBack', { username }), mainKeyboard);
    } else {
        await ctx.reply(ctx.i18n.t('scenes.start.welcome', { username, message: 'none' }), mainKeyboard);
    }
});

startController.command('/leave', () => {
    Stage.leave();
});
