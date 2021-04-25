import { I18n } from '@edjopato/telegraf-i18n';
import { Context, NarrowedContext } from 'telegraf';

import { Channel, Video } from '../../youtube-api';
import { Language } from '../interfaces';

export type ContextMessageUpdate = {
    i18n: I18n;
    scene: any;
    session: {
        channel?: Channel;
        videos?: Video[];
        settingsScene: {
            messagesToDelete: any[];
        };
        language: Language;
    };
    webhookReply: boolean;
    // @ts-ignore
} & NarrowedContext<Context<any> & { match: RegExpExecArray; }, any>;
