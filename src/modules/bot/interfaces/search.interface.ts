export enum SearchType {
    RANDOM = 'random',
    LATEST = 'latest',
}

export interface VideoFilters {
    from: number;
    to: number;
}

export enum VideoFilterType {
    FROM = 'from',
    TO = 'to',
}
