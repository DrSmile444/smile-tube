import { ChannelVideosResponse, SearchResultResponse } from '../interfaces';
import { YoutubeCoreService } from './youtube-core.service';
import { YoutubeFormatterService } from './youtube-formatter.service';


export class YoutubeApiService {
    constructor(
        private youtubeCoreService: YoutubeCoreService,
        private youtubeFormatterService: YoutubeFormatterService,
    ) {}

    /**
     * Searches for channel on youtube and returns the first one
     *
     * @example link:
     * https://www.youtube.com/results?search_query=stopgame
     * */
    async searchChannel(channelName: string) {
        const channelRowFilter = (row: SearchResultResponse.Content2) => row.channelRenderer;
        const youtubeRows = await this.search(channelName);
        const channels = youtubeRows.filter(channelRowFilter).map(channelRowFilter);

        return this.youtubeFormatterService.formatChannel(channels[0]);
    }

    async fetchChannelVideos(channelId: string) {
        const videoRowFilter = (row: ChannelVideosResponse.Item) => row.gridVideoRenderer;
        const continuationRowFilter = (row: ChannelVideosResponse.Item) => row.continuationItemRenderer;
        const youtubeRows = await this.youtubeCoreService
            .fetchPage<ChannelVideosResponse.RootObject>(`https://www.youtube.com/channel/${channelId}/videos`)
            .then((data) => this.youtubeFormatterService.formatChannelVideoResponse(data));

        const videos = youtubeRows
            .filter(videoRowFilter)
            .map(videoRowFilter)
            .map(this.youtubeFormatterService.formatPageVideo);

        const nextContinuation = youtubeRows
            .filter(continuationRowFilter)
            .map(continuationRowFilter)
            .map(this.youtubeFormatterService.formatContinuation)[0];

        return { videos, nextContinuation };
    }

    async fetchContinuation(continuation: string) {
        const videoRowFilter = (row: ChannelVideosResponse.Item) => row.gridVideoRenderer;
        const continuationRowFilter = (row: ChannelVideosResponse.Item) => row.continuationItemRenderer;
        const youtubeRows = await this.youtubeCoreService
            .fetchContinuation(continuation)
            .then((data) => this.youtubeFormatterService.formatFetchVideoResponse(data));

        const videos = youtubeRows
            .filter(videoRowFilter)
            .map(videoRowFilter)
            .map(this.youtubeFormatterService.formatPageVideo);

        const nextContinuation = youtubeRows
            .filter(continuationRowFilter)
            .map(continuationRowFilter)
            .map(this.youtubeFormatterService.formatContinuation)[0];

        return { videos, nextContinuation };
    }

    /**
     * Searches for any query on youtube and returns all result
     *
     * @example link:
     * https://www.youtube.com/results?search_query=stopgame
     * https://www.youtube.com/results?search_query=outer+wilds+review
     * */
    private search(query: string) {
        return this.youtubeCoreService
            .fetchPage<SearchResultResponse.RootObject>('https://www.youtube.com/results?search_query=' + encodeURIComponent(query))
            .then(this.youtubeFormatterService.formatSearchResponse);
    }
}
