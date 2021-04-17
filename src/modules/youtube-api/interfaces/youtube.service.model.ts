import { Channel, Video } from './video.model';

export enum FetchActionType {
    FOUND_CHANNEL = 'found_channel',
    VIDEOS_FETCHED = 'videos_fetched',
    FETCH_END = 'fetch_end',
    ERROR = 'error',
}

export type FetchActionPayload<T> =
    T extends FetchActionType.FOUND_CHANNEL ? { channel: Channel } :
    T extends FetchActionType.VIDEOS_FETCHED ? { videos: Video[] } :
    T extends FetchActionType.FETCH_END ? { channel: Channel, videos: Video[] } :
    T extends FetchActionType.ERROR ? { error: Error } :
    never;

export interface FetchAction<T extends FetchActionType = FetchActionType> {
    type: T;
    payload: FetchActionPayload<T>;
}
