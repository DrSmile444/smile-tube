import { inject, injectable } from 'inversify';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

import { storageService } from '../../storage';
import { FetchAction, FetchActionType, Video } from '../interfaces';
import { YoutubeTypes } from '../youtube-types';
import { YoutubeApiService } from './youtube-api.service';


@injectable()
export class YoutubeService {
    @inject(YoutubeTypes.YoutubeApiService) private youtubeApiService: YoutubeApiService;

    private readonly DEFAULT_VIDEOS_COUNT = 300;

    updateChannelVideosList(channelName: string) {
        const stream$: BehaviorSubject<FetchAction> = new BehaviorSubject<FetchAction>(null);

        (async () => {
            console.log('updateChannelVideosList start with:', channelName);
            const channel = await this.youtubeApiService.searchChannel(channelName);
            console.log('! Got channel ' + channel.title + ',', channel.videoCount, 'videos');
            stream$.next({
                type: FetchActionType.FOUND_CHANNEL,
                payload: {channel},
            });

            const fetchedVideos = await storageService.getChannelVideos(channel.title);

            if (!fetchedVideos) {
                console.log('! Channel not fetched yet! Fetching a new channel');
                return this.fetchVideos(channel, stream$, this.DEFAULT_VIDEOS_COUNT);
            }

            const videos: Video[] = [];

            const pagesCount = Math.ceil(channel.videoCount / 30);
            const channelVideos = await this.youtubeApiService.fetchChannelVideos(channel.channelId);
            let nextContinuation = channelVideos.nextContinuation;

            const addedVideos = channelVideos.videos
                .filter((video) => !fetchedVideos.some((fetchedVideo) => fetchedVideo.videoId === video.videoId));

            videos.unshift(...addedVideos);
            let isAllUpdated = channelVideos.videos.length < 30 || storageService.checkFetchedVideos(fetchedVideos, channelVideos.videos);

            for (let page = 2; nextContinuation || isAllUpdated; page++) {
                if (isAllUpdated || addedVideos.length < channelVideos.videos.length) {
                    console.log('! All new videos fetched!');
                    stream$.next({
                        type: FetchActionType.FETCH_END,
                        payload: {
                            channel,
                            videos: storageService.updateFetchedVideos(channel.title, fetchedVideos, videos),
                        },
                    });
                    stream$.complete();
                    return;
                }

                const continuationItems = await this.youtubeApiService.fetchContinuation(nextContinuation);
                videos.push(...continuationItems.videos);
                nextContinuation = continuationItems.nextContinuation;
                isAllUpdated = storageService.checkFetchedVideos(fetchedVideos, continuationItems.videos);

                if (page % 3 === 0) {
                    stream$.next({
                        type: FetchActionType.VIDEOS_FETCHED,
                        payload: { videos },
                    });
                }

                console.log('* Got page', page, '/', pagesCount, 'with', continuationItems.videos.length, 'videos');
            }
        })().then().catch((error) => {
            console.log('!!! Caught error');
            stream$.next({ type: FetchActionType.ERROR, payload: { error } } as FetchAction);
            stream$.complete();
        });

        return stream$.pipe(skip(1));
    }

    private async fetchVideos(channel, stream$: BehaviorSubject<FetchAction>, videosCount?: number) {
        const videos: Video[] = [];

        const pagesCount = Math.ceil(channel.videoCount / 30);
        const channelVideos = await this.youtubeApiService.fetchChannelVideos(channel.channelId);
        let nextContinuation = channelVideos.nextContinuation;

        console.log('* Found channel page and', channelVideos.videos.length, 'videos');

        videos.push(...channelVideos.videos);

        if (videosCount) {
            console.log('! Fetching videos with limit:', videosCount);
        }

        const isAllFetched = channel.videoCount <= 30;

        for (let page = 2; nextContinuation || isAllFetched; page++) {
            if (isAllFetched || videosCount && videosCount <= videos.length) {
                stream$.next({
                    type: FetchActionType.FETCH_END,
                    payload: {
                        channel,
                        videos: storageService.updateFetchedVideos(channel.title, videos),
                    },
                });
                stream$.complete();
                break;
            }

            const continuationItems = await this.youtubeApiService.fetchContinuation(nextContinuation);
            videos.push(...continuationItems.videos);
            nextContinuation = continuationItems.nextContinuation;

            if (!nextContinuation) {
                stream$.next({
                    type: FetchActionType.FETCH_END,
                    payload: {
                        channel,
                        videos: storageService.updateFetchedVideos(channel.title, videos),
                    },
                });
                stream$.complete();
                break;
            }

            if (page % 3 === 0) {
                stream$.next({
                    type: FetchActionType.VIDEOS_FETCHED,
                    payload: { videos },
                });
            }

            console.log('* Got page', page, '/', pagesCount, 'with', continuationItems.videos.length,
                'videos. Total videos', videos.length);
        }

        return stream$.pipe(skip(1));
    }
}
