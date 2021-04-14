import axios from 'axios';
import { injectable } from 'inversify';

import { FetchVideosResponse } from '../interfaces';


@injectable()
export class YoutubeCoreService {
    private readonly PAGE_RESPONSE_REGEXP = /<script.*var ytInitialData = ({.*});<\/script>/;
    private readonly INNERTUBE_API_KEY_REGEXP = /"INNERTUBE_API_KEY":"(.+?)"/;
    private readonly INNERTUBE_CLIENT_VERSION_REGEXP = /"INNERTUBE_CLIENT_VERSION":"(.+?)",/;

    private innertubeCreds = {
        key: '',
        version: '',
    };

    /**
     * Returns fetched youtube page HTML
     * */
    fetchPage<T>(url: string): Promise<T> {
        const options = {
            url,
            headers: {
                Host: 'www.youtube.com',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:42.0) Gecko/20100101 Firefox/42.0',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US',
                Connection: 'keep-alive',
                'Cache-Control': 'max-age=0',
            },
        };

        return axios.get<string>(url, options)
            .then((response) => response.data)
            .then((html) => this.processData<T>(html));
    }

    fetchContinuation(continuation: string): Promise<FetchVideosResponse.RootObject['response']> {
        const { key, version } = this.innertubeCreds;

        const url = `https://www.youtube.com/youtubei/v1/browse?key=${key}`;
        const body = {
            context: {
                client: {
                    clientName: 'WEB',
                    clientVersion: version, // 2.20210413.07.00
                },
            },
            continuation,
        };

        return axios.post(url, body).then((response) => response.data).catch((err) => console.error(JSON.stringify(err)));
    }

    private processData<T>(html: string): T {
        const youtubeResponse = html.match(this.PAGE_RESPONSE_REGEXP)[1];
        const innertubeKey = html.match(this.INNERTUBE_API_KEY_REGEXP)[1];
        const innertubeVersion = html.match(this.INNERTUBE_CLIENT_VERSION_REGEXP)[1];

        this.innertubeCreds = {
            key: innertubeKey,
            version: innertubeVersion,
        };

        return JSON.parse(youtubeResponse) as T;
    }
}
