import * as fs from 'fs';
import { injectable } from 'inversify';

import { Video } from '../../youtube-api';

@injectable()
export class StorageService {
    async getChannelVideos(channelName: string): Promise<Video[] | null> {
        const files = fs.readdirSync('./videos/');
        const channelFileName = files.reverse().find((fileName) => fileName.includes(channelName));

        if (!channelFileName) {
            return null;
        }

        return await import('../../../../videos/' + channelFileName) as Video[];
    }

    checkFetchedVideos(fetchedVideos: Video[], newVideos: Video[]) {
        const areAllFetched = newVideos.some((video) => {
            return fetchedVideos.some((fetchedVideo) => {
                return fetchedVideo.videoId === video.videoId;
            });
        });

        return { actual: areAllFetched };
    }

    updateFetchedVideos(channelName: string, fetchedVideos: Video[], newVideos: Video[] = []): Video[] {
        const filteredNewVideos = newVideos.filter((video) => fetchedVideos.some((fetchedVideo) => fetchedVideo.videoId !== video.videoId));
        const filePath = `./videos/videos.${channelName}.${Date.now()}.json`;
        const updatedVideos = [...filteredNewVideos, ...fetchedVideos];

        fs.writeFileSync(filePath, JSON.stringify(updatedVideos, null, '  '));

        return updatedVideos;
    }
}
