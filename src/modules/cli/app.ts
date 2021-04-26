import * as fs from 'fs';
import { Container, inject, injectable } from 'inversify';
import { filter } from 'rxjs/internal/operators';

import { FetchAction, FetchActionType, YoutubeService, youtubeService } from '../youtube-api';
import { AppTypes } from './app-types';


const [, , userChannelName] = process.argv;

@injectable()
class App {
    @inject(AppTypes.YoutubeService) private youtubeService: YoutubeService;

    async start(channelName: string) {
        this.youtubeService.updateChannelVideosList(channelName)
            .pipe(filter((action) => action.type === FetchActionType.FETCH_END))
            .subscribe((action: FetchAction<FetchActionType.FETCH_END>) => {
                const { videos, channel } = action.payload;

                fs.writeFileSync(`./videos/videos.${channel.title}.${Date.now()}.json`, JSON.stringify(videos, null, '  '));
            });
    }
}

const appContainer = new Container();

appContainer.bind<App>(AppTypes.App).to(App);
appContainer.bind<YoutubeService>(AppTypes.YoutubeService).toConstantValue(youtubeService);

const app: App = appContainer.get(AppTypes.App);
app.start(userChannelName);
