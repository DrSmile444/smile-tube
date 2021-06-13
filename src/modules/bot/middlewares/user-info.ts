
import * as moment from 'moment';
import { ContextMessageUpdate } from 'telegraf-context';

import { Language } from '../interfaces';

/**
 * Modifies context and add some information about the user
 * @param {ContextMessageUpdate} ctx - telegram context
 * @param {Function} next - next function
 */
export const getUserInfo = async (ctx: ContextMessageUpdate, next: Function) => {
    if (!ctx.session.language) {
        const messageLang = ctx.message &&
            ctx.message.from &&
            ctx.message.from.language_code;

        const user = {
            language: messageLang || ctx.update.callback_query.from.language_code as Language,
        };

        if (user) {
            ctx.session.language = user.language;
            // @ts-ignore
            ctx.i18n.locale(user.language);
        }
    }

    moment.locale(ctx.session.__language_code);

    if (!ctx.session.videoFilters) {
        ctx.session.videoFilters = {
            from: null,
            to: null,
        };
    }

    return next();
};
