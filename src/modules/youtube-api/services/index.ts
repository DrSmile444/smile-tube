import { YoutubeApiService } from './youtube-api.service';
import { YoutubeCoreService } from './youtube-core.service';
import { YoutubeFormatterService } from './youtube-formatter.service';
import { YoutubeService } from './youtube.service';

const youtubeCoreService = new YoutubeCoreService();
const youtubeFormatterService = new YoutubeFormatterService();
const youtubeApiService = new YoutubeApiService(youtubeCoreService, youtubeFormatterService);

export const youtubeService = new YoutubeService(youtubeApiService);

export * from './youtube.service';
