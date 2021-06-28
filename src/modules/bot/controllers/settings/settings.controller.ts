import { match } from '@edjopato/telegraf-i18n';
import { Scenes } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import { GenericMenu } from 'telegraf-menu';
import { initLanguageMenu } from '../../menus/language.menu';

import { initSettingsMenu } from '../../menus/settings.menu';
import { getBackKeyboard } from '../../utils/keyboard.util';
import { searchRandomController } from '../search-random';

const { BaseScene, Stage } = Scenes;

export const settingsController = new BaseScene('settings');

settingsController.enter(async (ctx: ContextMessageUpdate) => {
    const { backKeyboard } = getBackKeyboard(ctx);

    await ctx.reply(ctx.i18n.t('...'), backKeyboard).then((result) => {
        ctx.deleteMessage(result.message_id);
    });

    initSettingsMenu(ctx);
});

settingsController.command('leave', (ctx: ContextMessageUpdate) => {
    ctx.scene.leave();
    ctx.scene.enter('start');
});
settingsController.command('start', (ctx: ContextMessageUpdate) => {
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
searchRandomController.command('language', initLanguageMenu);
searchRandomController.action(/language/, GenericMenu.onAction(
    (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
    initLanguageMenu,
));
