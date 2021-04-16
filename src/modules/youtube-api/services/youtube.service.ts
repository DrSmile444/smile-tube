import { inject, injectable } from 'inversify';

import { storageService } from '../../storage';
import { Video } from '../interfaces';
import { YoutubeTypes } from '../youtube-types';
import { YoutubeApiService } from './youtube-api.service';


@injectable()
export class YoutubeService {
    @inject(YoutubeTypes.YoutubeApiService) private youtubeApiService: YoutubeApiService;

    private readonly DEFAULT_VIDEOS_COUNT = 300;

    async updateChannelVideosList(channelName: string) {
        console.log('updateChannelVideosList start with:', channelName);
        const channel = await this.youtubeApiService.searchChannel(channelName);
        console.log('! Got channel ' + channel.title + ',', channel.videoCount, 'videos');

        const fetchedVideos = await storageService.getChannelVideos(channel.title);

        if (!fetchedVideos) {
            console.log('! Channel not fetched yet! Fetching a new channel');
            return this.fetchVideos(channel, this.DEFAULT_VIDEOS_COUNT);
        }

        const videos: Video[] = [];

        const pagesCount = Math.ceil(channel.videoCount / 30);
        const channelVideos = await this.youtubeApiService.fetchChannelVideos(channel.channelId);
        let nextContinuation = channelVideos.nextContinuation;

        videos.push(...channelVideos.videos);
        let isAllUpdated = storageService.checkFetchedVideos(fetchedVideos, channelVideos.videos);

        for (let page = 2; nextContinuation; page++) {
            if (isAllUpdated) {
                console.log('! All new videos fetched!');
                return {
                    channel,
                    videos: storageService.updateFetchedVideos(channel.title, fetchedVideos, videos),
                };
            }

            const continuationItems = await this.youtubeApiService.fetchContinuation(nextContinuation);
            videos.push(...continuationItems.videos);
            nextContinuation = continuationItems.nextContinuation;
            isAllUpdated = storageService.checkFetchedVideos(fetchedVideos, continuationItems.videos);

            console.log('* Got page', page, '/', pagesCount, 'with', continuationItems.videos.length, 'videos');
        }
    }

    private async fetchVideos(channel, videosCount?: number) {
        const videos: Video[] = [];

        const pagesCount = Math.ceil(channel.videoCount / 30);
        const channelVideos = await this.youtubeApiService.fetchChannelVideos(channel.channelId);
        let nextContinuation = channelVideos.nextContinuation;

        console.log('* Found channel page and', channelVideos.videos.length, 'videos');

        videos.push(...channelVideos.videos);

        if (videosCount) {
            console.log('! Fetching videos with limit:', videosCount);
        }

        for (let page = 2; nextContinuation; page++) {
            if (videosCount && videosCount <= videos.length) {
                break;
            }

            const continuationItems = await this.youtubeApiService.fetchContinuation(nextContinuation);
            videos.push(...continuationItems.videos);
            nextContinuation = continuationItems.nextContinuation;

            console.log('* Got page', page, '/', pagesCount, 'with', continuationItems.videos.length,
                'videos. Total videos', videos.length);
        }

        storageService.updateFetchedVideos(channel.title, videos);

        return { channel, videos };
    }
}
