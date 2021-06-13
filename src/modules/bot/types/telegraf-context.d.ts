import { Context, NarrowedContext } from 'telegraf';
import { SceneSessionData } from 'telegraf/src/scenes/context';
import { SceneContextScene } from 'telegraf/typings/scenes';

import { KeyboardMenu } from '../../bot-menu';
import { Channel, Video } from '../../youtube-api';
import { I18nOverride, Language, SearchType, VideoFilters } from '../interfaces';

export interface SceneState {
    type?: SearchType;
}

export type ContextMessageUpdate = {
    i18n: I18nOverride;
    scene: Omit<SceneContextScene<ContextMessageUpdate>, 'enter' | 'state'> & {
        state: {
            type: SearchType;
            keyboardMenu: KeyboardMenu<ContextMessageUpdate>;
        };
        enter(sceneId: string, initialState?: SceneState, silent?: boolean): Promise<unknown>,
    };
    session: {
        callbackData?: any;
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
        videoFilters: VideoFilters;
    };
    state: {
        editMessageId?: number;
        filtersMenu?: KeyboardMenu<ContextMessageUpdate>;
    }
    webhookReply: boolean;
    callbackQuery: {
        dataParsed: number;
    }
    // @ts-ignore
} & NarrowedContext<Context<any> & { match: RegExpExecArray; }, any>;
