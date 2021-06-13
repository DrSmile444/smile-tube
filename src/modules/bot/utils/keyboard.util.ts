import { Markup } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';

/**
 * Returns back keyboard and its buttons according to the language
 * @param {ContextMessageUpdate} ctx - telegram context
 */
export function getBackKeyboard(ctx: ContextMessageUpdate) {
    const backKeyboardBack = ctx.i18n.t('keyboards.backKeyboard.back');
    let backKeyboard = Markup.keyboard([backKeyboardBack]);

    backKeyboard = backKeyboard.oneTime().resize();

    return {
        backKeyboard,
        backKeyboardBack,
    };
}

/**
 * Returns main keyboard and its buttons according to the language
 * @param {ContextMessageUpdate} ctx - telegram context
 */
export function getMainKeyboard(ctx: ContextMessageUpdate) {
    const mainKeyboardSearchRandom = ctx.i18n.t('keyboards.mainKeyboard.searchRandom');
    const mainKeyboardSearchLatest = ctx.i18n.t('keyboards.mainKeyboard.searchLatest');

    const mainKeyboard = Markup.keyboard([
        [mainKeyboardSearchRandom, mainKeyboardSearchLatest] as any,
    ]).oneTime().resize();

    return {
        mainKeyboard,
        mainKeyboardSearchRandom,
        mainKeyboardSearchLatest,
    };
}

/**
 * Returns keyboard for video filters
 * @param {ContextMessageUpdate} ctx - telegram context
 * */
export function getVideoFiltersKeyboard(ctx: ContextMessageUpdate) {
    return Markup.inlineKeyboard(
        [
            [Markup.button.callback('Custom From', JSON.stringify({ a: 'videoFilters', p: { t: 'from', p: 'custom' } }), false)],
            [Markup.button.callback('Custom To', JSON.stringify({ a: 'videoFilters', p: { t: 'to', p: 'custom' } }), false)],
        ],
    );
}
