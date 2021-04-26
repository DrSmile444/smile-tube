import { Markup } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export function getMainKeyboard(ctx: ContextMessageUpdate) {
    const mainKeyboardSearchRandom = ctx.i18n.t('keyboards.mainKeyboard.searchRandom');

    const mainKeyboard = Markup.keyboard([
        [mainKeyboardSearchRandom] as any,
    ]).oneTime().resize();

    return {
        mainKeyboard,
        mainKeyboardSearchRandom,
    };
}
