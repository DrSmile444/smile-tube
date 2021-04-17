export interface Video {
    title: string;
    duration: string;
    publishedTimeText: string;
    publishedTime: Date;
    viewCountText: string;
    thumbnail: string;
    videoId: string;
    watchUrl: string;
}

export interface Channel {
    title: string;
    description: string;
    videoCount: number;
    channelId: string;
    url: string;
    thumbnail: string;
    channelUrl: string;
}
