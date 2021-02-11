import { YoutubeService, youtubeService } from '../youtube-api';
import * as fs from 'fs';


const [node, file, channelName] = process.argv;

class App {
    constructor(private youtubeService: YoutubeService) {
    }

    async start(channelName) {
        const { videos, channel } = await this.youtubeService.fetchVideosFromChannel(channelName);
        fs.writeFileSync(`./videos/videos.${channel.title}.${Date.now()}.json`, JSON.stringify(videos, null, '  '));
    }
}

new App(youtubeService).start(channelName);
