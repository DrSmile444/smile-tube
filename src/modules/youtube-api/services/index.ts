import { Container } from 'inversify';
import 'reflect-metadata';

import { YoutubeTypes } from '../youtube-types';
import { YoutubeApiService } from './youtube-api.service';
import { YoutubeCoreService } from './youtube-core.service';
import { YoutubeFormatterService } from './youtube-formatter.service';
import { YoutubeService } from './youtube.service';

const youtubeApiContainer = new Container();
youtubeApiContainer.bind<YoutubeApiService>(YoutubeTypes.YoutubeApiService).to(YoutubeApiService);
youtubeApiContainer.bind<YoutubeCoreService>(YoutubeTypes.YoutubeCoreService).to(YoutubeCoreService);
youtubeApiContainer.bind<YoutubeFormatterService>(YoutubeTypes.YoutubeFormatterService).to(YoutubeFormatterService);
youtubeApiContainer.bind<YoutubeService>(YoutubeTypes.YoutubeService).to(YoutubeService);

export const youtubeService = youtubeApiContainer.get<YoutubeService>(YoutubeTypes.YoutubeService);

export * from './youtube.service';
