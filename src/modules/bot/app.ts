import { I18n, match } from '@edjopato/telegraf-i18n';
import * as path from 'path';
import { Scenes, Telegraf } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import { GenericMenu } from 'telegraf-menu';
import * as LocalSession from 'telegraf-session-local';

import { searchRandomController, settingsController, startController } from './controllers';
import { SearchType } from './interfaces';
import { initVideoFiltersMenu } from './menus';
import { initLanguageMenu } from './menus/language.menu';
import { getUserInfo } from './middlewares';
import { errorHandler } from './utils';
require('dotenv').config();

const { Stage } = Scenes;

export class BotApp {
    private bot: Telegraf;

    constructor() {
        this.bot = new Telegraf(process.env.BOT_TOKEN);

        // @ts-ignore
        const i18n = new I18n({
            defaultLanguage: 'en',
            directory: path.resolve(__dirname, 'locales'),
            useSession: true,
            sessionName: 'session',
        });

        const session = new LocalSession({ database: 'local.db.json' });

        const stage = new Scenes.Stage([
            startController,
            searchRandomController,
            settingsController,
        ] as any);

        // this.bot.use(Telegraf.log());
        this.bot.use(session.middleware());
        this.bot.use(i18n.middleware());
        this.bot.use(stage.middleware());
        this.bot.use(getUserInfo);

        this.bot.use(GenericMenu.middleware());
        this.bot.command('video_filters', initVideoFiltersMenu);
        this.bot.action(/videoFilters/, GenericMenu.onAction(
            (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
            initVideoFiltersMenu,
        ));
        this.bot.command('language', initLanguageMenu);
        this.bot.action(/language/, GenericMenu.onAction(
            (ctx: ContextMessageUpdate) => ctx.scene.state.keyboardMenu,
            initLanguageMenu,
        ));

        this.bot.start(errorHandler(async (ctx: ContextMessageUpdate) => ctx.scene.enter('start')));
        this.bot.hears(
            match('keyboards.mainKeyboard.searchRandom'),
            errorHandler(async (ctx: ContextMessageUpdate) => {
                await ctx.scene.enter('search-random', { type: SearchType.RANDOM });
            }),
        );
        this.bot.hears(
            match('keyboards.mainKeyboard.searchLatest'),
            errorHandler(async (ctx: ContextMessageUpdate) => {
                await ctx.scene.enter('search-random', { type: SearchType.LATEST });
            }),
        );
        this.bot.hears(
            match('keyboards.mainKeyboard.settings'),
            errorHandler(async (ctx: ContextMessageUpdate) => {
                await ctx.scene.enter('settings');
            }),
        );
        this.bot.hears(match('keyboards.backKeyboard.back'), Stage.leave<any>());
    }

    start() {
        this.bot.launch().then(() => console.log('*** Bot has been started ***'));
    }

    stop(reason: string) {
        this.bot.stop(reason);
    }
}

const botApp = new BotApp();
botApp.start();

// Enable graceful stop
process.once('SIGINT', () => botApp.stop('SIGINT'));
process.once('SIGTERM', () => botApp.stop('SIGTERM'));
