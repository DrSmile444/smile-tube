import { Video } from '../../youtube-api';
import { storageService } from './index';

const fetchedVideos: Partial<Video>[] = [
    {
        videoId: 'test',
    },
    {
        videoId: 'test1',
    },
    {
        videoId: 'test2',
    },
];

describe('storageService', () => {
    describe('checkFetchedVideos method', () => {
        it('should return { actual: false } for not complete array', () => {
            const newVideos: Partial<Video>[] = [
                {
                    videoId: 'a new video',
                },
                {
                    videoId: 'a new video2',
                },
            ];

            expect(storageService.checkFetchedVideos(fetchedVideos as Video[], newVideos as Video[]))
                .toEqual({ actual: false });
        });

        it('should return { actual: true } for complete array', () => {
            const newVideos: Partial<Video>[] = [
                {
                    videoId: 'a new video',
                },
                {
                    videoId: 'test2',
                },
            ];

            expect(storageService.checkFetchedVideos(fetchedVideos as Video[], newVideos as Video[]))
                .toEqual({ actual: true });
        });
    });
});

