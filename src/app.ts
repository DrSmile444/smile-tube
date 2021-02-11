import { YoutubeService, youtubeService } from './services';
import * as fs from 'fs';

const channelName = '';

console.log(process.cwd())

class App {
    constructor(private youtubeService: YoutubeService) {
    }

    async start(channelName) {
        const { videos, channel } = await this.youtubeService.fetchVideosFromChannel(channelName);
        fs.writeFileSync(`./videos/videos.${channel.title}.${Date.now()}.json`, JSON.stringify(videos, null, '  '));
    }
}

new App(youtubeService).start(channelName);
