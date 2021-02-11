import { Video } from '../../interfaces';
import { YoutubeApiService } from './youtube-api.service';


export class YoutubeService {
    constructor(private youtubeApiService: YoutubeApiService) {}

    async fetchVideosFromChannel(channelName: string) {
        const channel = await this.youtubeApiService.searchChannel(channelName);
        const videos: Video[] = [];

        console.log('Got channel ' + channel.title + ',', channel.videoCount, 'videos');

        const pagesCount = Math.ceil(channel.videoCount / 30)
        const channelVideos = await this.youtubeApiService.fetchChannelVideos(channel.channelId);
        let nextContinuation = channelVideos.nextContinuation;

        console.log('* Found channel page and', channelVideos.videos.length, 'videos');

        videos.push(...channelVideos.videos);

        for (let page = 2; nextContinuation; page++) {
            const continuationItems = await this.youtubeApiService.fetchContinuation(nextContinuation);
            videos.push(...continuationItems.videos);
            nextContinuation = continuationItems.nextContinuation;

            console.log('* Got page', page, '/', pagesCount, 'with', continuationItems.videos.length, 'videos');
        }

        return { channel, videos };
    }
}
