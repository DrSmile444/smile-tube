export enum SearchType {
    RANDOM = 'random',
    LATEST = 'latest',
}

export interface VideoFilters {
    from: string;
    to: string;
}

export enum VideoFilterType {
    FROM = 'from',
    TO = 'to',
}
