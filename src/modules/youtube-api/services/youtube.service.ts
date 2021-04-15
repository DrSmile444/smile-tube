import { inject, injectable } from 'inversify';

import { Video } from '../interfaces';
import { YoutubeTypes } from '../youtube-types';
import { YoutubeApiService } from './youtube-api.service';


@injectable()
export class YoutubeService {
    @inject(YoutubeTypes.YoutubeApiService) private youtubeApiService: YoutubeApiService;

    async fetchVideosFromChannel(channelName: string, videosCount?: number) {
        const channel = await this.youtubeApiService.searchChannel(channelName);
        const videos: Video[] = [];

        console.log('Got channel ' + channel.title + ',', channel.videoCount, 'videos');

        const pagesCount = Math.ceil(channel.videoCount / 30);
        const channelVideos = await this.youtubeApiService.fetchChannelVideos(channel.channelId);
        let nextContinuation = channelVideos.nextContinuation;

        console.log('* Found channel page and', channelVideos.videos.length, 'videos');

        videos.push(...channelVideos.videos);

        for (let page = 2; nextContinuation; page++) {
            if (videosCount && videosCount <= videos.length) {
                break;
            }

            const continuationItems = await this.youtubeApiService.fetchContinuation(nextContinuation);
            videos.push(...continuationItems.videos);
            nextContinuation = continuationItems.nextContinuation;

            console.log('* Got page', page, '/', pagesCount, 'with', continuationItems.videos.length, 'videos');
        }

        return { channel, videos };
    }
}
