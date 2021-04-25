import { TemplateData } from '@edjopato/telegraf-i18n/dist/source/types';
import { Context, NarrowedContext } from 'telegraf';

import { Channel, Video } from '../../youtube-api';
import { I18nOverride, Language } from '../interfaces';

export type ContextMessageUpdate = {
    i18n: I18nOverride;
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
