import { match } from '@edjopato/telegraf-i18n';
import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import { GenericMenu } from 'telegraf-menu';

import { initSettingsMenu } from '../../menus/settings.menu';
import { getBackKeyboard } from '../../utils/keyboard.util';

const { BaseScene, Stage } = Scenes;

export const settingsController = new BaseScene('settings');

settingsController.enter(async (ctx: ContextMessageUpdate) => {
    const { backKeyboard } = getBackKeyboard(ctx);

    await ctx.reply(ctx.i18n.t('...'), backKeyboard).then((result) => {
        ctx.deleteMessage(result.message_id);
    });

    initSettingsMenu(ctx);
});

// settingsController.on('text', (ctx) => ctx.reply('lol'));

settingsController.command('leave', (ctx: ContextMessageUpdate) => {
    ctx.scene.leave();
    ctx.scene.enter('start');
});
settingsController.command('start', (ctx: ContextMessageUpdate) => {
    console.log('lol');
    ctx.scene.leave();
    ctx.scene.enter('start');
});

settingsController.hears(match('keyboards.backKeyboard.back'), Stage.leave<any>());
settingsController.use(GenericMenu.middleware());
settingsController.command('settings', initSettingsMenu);
settingsController.action(/settings/, GenericMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initSettingsMenu,
));
