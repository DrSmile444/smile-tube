import { Context, NarrowedContext } from 'telegraf';
import { SceneSessionData } from 'telegraf/src/scenes/context';
import { SceneContextScene } from 'telegraf/typings/scenes';

import { Channel, Video } from '../../youtube-api';
import { I18nOverride, Language } from '../interfaces';

export type ContextMessageUpdate = {
    i18n: I18nOverride;
    scene: SceneContextScene<ContextMessageUpdate>;
    session: {
        searchedChannels?: Channel[];
        channel?: Channel;
        videos?: Video[];
        settingsScene: {
            messagesToDelete: any[];
        };
        language: Language;
        __language_code: Language;
        __scenes: SceneSessionData;
    };
    state: {
        editMessageId?: number;
    }
    webhookReply: boolean;
    // @ts-ignore
} & NarrowedContext<Context<any> & { match: RegExpExecArray; }, any>;
