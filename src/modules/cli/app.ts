import * as fs from 'fs';

import { YoutubeService, youtubeService } from '../youtube-api';


const [node, file, userChannelName] = process.argv;

class App {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(private youtubeService: YoutubeService) {
    }

    async start(channelName: string) {
        const { videos, channel } = await this.youtubeService.fetchVideosFromChannel(channelName);
        fs.writeFileSync(`./videos/videos.${channel.title}.${Date.now()}.json`, JSON.stringify(videos, null, '  '));
    }
}

new App(youtubeService).start(userChannelName);
