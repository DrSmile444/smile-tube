import { VideoFilter } from '../const/video-filters.const';

export enum SearchType {
    RANDOM = 'random',
    LATEST = 'latest',
}

export interface VideoFilters {
    from: VideoFilter;
    to: VideoFilter;
}

export enum VideoFilterType {
    FROM = 'from',
    TO = 'to',
}
