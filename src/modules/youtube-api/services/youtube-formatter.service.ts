import { injectable } from 'inversify';
import * as moment from 'moment';

import { ChannelVideosResponse, FetchVideosResponse, SearchResultResponse, Video } from '../interfaces';


@injectable()
export class YoutubeFormatterService {
    formatSearchResponse(response: SearchResultResponse.RootObject) {
        return response
            .contents
            .twoColumnSearchResultsRenderer
            .primaryContents
            .sectionListRenderer
            .contents[0]
            .itemSectionRenderer
            .contents;
    }

    formatChannel(channel: SearchResultResponse.ChannelRenderer) {
        return {
            title: channel.title.simpleText,
            description: channel.descriptionSnippet && channel.descriptionSnippet.runs.map((item) => item.text).join(''),
            videoCount: +channel.videoCountText.runs[0].text.replace(/,/g, ''),
            channelId: channel.channelId,
            url: channel.navigationEndpoint.commandMetadata.webCommandMetadata.url,
            thumbnail: 'https:' + channel.thumbnail.thumbnails[channel.thumbnail.thumbnails.length - 1].url,
            // maybe remove, can bebuild from scratch
            channelUrl: `https://www.youtube.com${channel.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        };
    }

    formatChannelVideoResponse(response: ChannelVideosResponse.RootObject) {
        return response
            .contents
            .twoColumnBrowseResultsRenderer
            .tabs[1]
            .tabRenderer
            .content
            .sectionListRenderer
            .contents[0]
            .itemSectionRenderer
            .contents[0]
            .gridRenderer
            .items;
    }

    formatFetchVideoResponse(response: FetchVideosResponse.RootObject['response']) {
        return response.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
    }

    formatPageVideo(video: ChannelVideosResponse.GridVideoRenderer): Video {
        // TODO refactor this
        const publishedTimeText = video.publishedTimeText ?
            video.publishedTimeText.simpleText :
            'Premiere';

        const [value, units] = video.publishedTimeText ?
            publishedTimeText
                .replace('ago', '')
                .trim()
                .split(' ') :
            [];

        return {
            title: video.title.runs[0].text,
            duration: video.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText,
            publishedTimeText,
            publishedTime: video.publishedTimeText ?
                moment().subtract(+value, units as any).toDate() :
                new Date(+video.upcomingEventData.startTime * 1000),
            viewCountText: video.viewCountText.simpleText,
            thumbnail: video.thumbnail.thumbnails[video.thumbnail.thumbnails.length - 1].url,
            videoId: video.videoId,
            // maybe remove, can bebuild from scratch
            watchUrl: `https://www.youtube.com${video.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        };
    }

    formatContinuation(continuation: ChannelVideosResponse.ContinuationItemRenderer) {
        return continuation.continuationEndpoint.continuationCommand.token;
    }
}
