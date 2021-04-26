import { ContextMessageUpdate } from 'telegraf-context';

/**
 * Wrapper to catch async errors within a stage. Helps to avoid try catch blocks in there
 * @param {function} fn - function to enter a stage
 */
export const errorHandler = (fn: any): (ctx: any, next: Function) => Promise<any> => {
    return async (ctx: ContextMessageUpdate, next: Function) => {
        try {
            return await fn(ctx);
        } catch (error) {
            console.error(error);
            await ctx.reply(ctx.i18n.t('shared.somethingWentWrong'));
            return next();
        }
    };
};
