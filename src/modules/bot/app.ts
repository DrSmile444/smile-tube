import { I18n, match } from '@edjopato/telegraf-i18n';
import * as path from 'path';
import { Scenes, Telegraf } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import * as LocalSession from 'telegraf-session-local';

import { searchRandomController, startController } from './controllers';
import { getUserInfo } from './middlewares';
import { errorHandler } from './utils';
require('dotenv').config();

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
        ] as any);

        this.bot.use(Telegraf.log());
        this.bot.use(session.middleware());
        this.bot.use(i18n.middleware());
        this.bot.use(stage.middleware());
        this.bot.use(getUserInfo);
        this.bot.start(errorHandler(async (ctx: ContextMessageUpdate) => ctx.scene.enter('start')));
        this.bot.hears(
            match('keyboards.mainKeyboard.searchRandom'),
            errorHandler(async (ctx: ContextMessageUpdate) => await ctx.scene.enter('search-random')),
        );
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
