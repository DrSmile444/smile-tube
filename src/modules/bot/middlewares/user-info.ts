
import { ContextMessageUpdate } from 'telegraf-context';

import { Language } from '../interfaces';

/**
 * Modifies context and add some information about the user
 * @param {ContextMessageUpdate} ctx - telegram context
 * @param {Function} next - next function
 */
export const getUserInfo = async (ctx: ContextMessageUpdate, next: Function) => {
    if (!ctx.session.language) {
        const user = {
            language: ctx.update.callback_query.from.language_code as Language,
        };

        if (user) {
            ctx.session.language = user.language;
            // @ts-ignore
            ctx.i18n.locale(user.language);
        }
    }

    return next();
};
