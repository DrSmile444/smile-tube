import { Context, NarrowedContext } from 'telegraf';
import { SceneSessionData } from 'telegraf/src/scenes/context';
import { SceneContextScene } from 'telegraf/typings/scenes';

import { Channel, Video } from '../../youtube-api';
import { I18nOverride, Language, SearchType } from '../interfaces';

export interface SceneState {
    type?: SearchType;
}

export type ContextMessageUpdate = {
    i18n: I18nOverride;
    scene: Omit<SceneContextScene<ContextMessageUpdate>, 'enter'> & {
        enter(sceneId: string, initialState?: SceneState, silent?: boolean): Promise<unknown>,
    };
    session: {
        searchedChannels?: Channel[];
        channel?: Channel;
        videos?: Video[];
        settingsScene: {
            messagesToDelete: any[];
        };
        language: Language;
        __language_code: Language;
        __scenes: SceneSessionData & {
            state: SceneSessionData['state'] & SceneState;
        };
        videoOffset?: number; // used for latest videos
    };
    state: {
        editMessageId?: number;
    }
    webhookReply: boolean;
    // @ts-ignore
} & NarrowedContext<Context<any> & { match: RegExpExecArray; }, any>;
