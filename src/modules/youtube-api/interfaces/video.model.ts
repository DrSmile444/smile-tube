import { ImageColors } from '../../image-colors/interfaces';

export interface Video {
    title: string;
    duration: string;
    publishedTime: Date;
    viewCountText: string;
    thumbnail: string;
    videoId: string;
}

export interface Channel {
    title: string;
    description: string;
    videoCount: number;
    channelId: string;
    url: string;
    thumbnail: string;
    thumbnailData: ImageColors;
    channelUrl: string;
}
