import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

const { BaseScene, Stage } = Scenes;

import { getMainKeyboard } from '../../utils/keyboard.util';

export const startController = new BaseScene('start');

startController.enter(async (ctx: ContextMessageUpdate) => {
    const username = ctx.update.message.from.username;
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
