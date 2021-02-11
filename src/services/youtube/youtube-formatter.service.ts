import { ChannelVideosResponse, FetchVideosResponse, SearchResultResponse, Video } from '../../interfaces';


export class YoutubeFormatterService {
    formatSearchResponse(response: SearchResultResponse.RootObject) {
        return response.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    }

    formatChannel(channel: SearchResultResponse.ChannelRenderer) {
        return {
            title: channel.title.simpleText,
            description: channel.descriptionSnippet && channel.descriptionSnippet.runs.map((item) => item.text).join(''),
            videoCount: +channel.videoCountText.runs[0].text.replace(/,/g, ''),
            channelId: channel.channelId,
            url: channel.navigationEndpoint.commandMetadata.webCommandMetadata.url,
            thumbnail: 'https:' + channel.thumbnail.thumbnails[0].url,
            // maybe remove, can bebuild from scratch
            channelUrl: `https://www.youtube.com${channel.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        };
    }

    formatChannelVideoResponse(response: ChannelVideosResponse.RootObject) {
        return response.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
    }

    formatFetchVideoResponse(response: FetchVideosResponse.RootObject) {
        return response[1].response.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
    }
    
    formatPageVideo(video: ChannelVideosResponse.GridVideoRenderer): Video {
        return {
            title: video.title.runs[0].text,
            duration: video.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText,
            publishedTimeText: video.publishedTimeText.simpleText,
            viewCountText: video.viewCountText.simpleText,
            thumbnail: video.thumbnail.thumbnails[0].url,
            videoId: video.videoId,
            // maybe remove, can bebuild from scratch
            watchUrl: `https://www.youtube.com${video.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        }
    }

    formatContinuation(continuation: ChannelVideosResponse.ContinuationItemRenderer) {
        return continuation.continuationEndpoint.continuationCommand.token;
    }
}
