import axios from 'axios';
import { injectable } from 'inversify';

import { FetchVideosResponse } from '../interfaces';


@injectable()
export class YoutubeCoreService {
    private readonly PAGE_RESPONSE_REGEXP = /<script>var ytInitialData = ({.*});<\/script>/;

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
            .then((html) => this.parseData<T>(html));
    }

    fetchContinuation(continuation: string): Promise<FetchVideosResponse.RootObject> {
        const url = `https://www.youtube.com/browse_ajax?ctoken=4qmFsgJwEhhVQ3E3Slo4QVRnUVdldTZzRE0xY3pqaGcaNkVnWjJhV1JsYjNNWUF5QUFNQUU0QWVvREUwTm5RVk5EWjJsS2J6UlhVM2RoVUhwZmJVRSUzRJICGxoXaHR0cHM6Ly93d3cueW91dHViZS5jb20iAA%253D%253D&continuation=${continuation}&itct=CCYQybcCIhMIrIDjroe67gIVBiyyCh0XUwZm`;
        const options = {
            url,
            headers: {
                accept: '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:42.0) Gecko/20100101 Firefox/42.0',
                'x-youtube-client-name': '1',
                'x-youtube-client-version': '2.20210120.08.00',
            },
        };

        return axios.get(url, options).then((response) => response.data);
    }

    private parseData<T>(html: string): T {
        const youtubeResponse = html.match(this.PAGE_RESPONSE_REGEXP)[1];

        return JSON.parse(youtubeResponse) as T;
    }
}
