import { Context } from 'telegraf';
import { ContextMessageUpdate } from 'telegraf-context';
import * as tg from 'telegraf/src/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';
import { BaseScene } from 'telegraf/typings/scenes';

import { asyncMap } from '../../../../utils';
import { FetchAction, FetchActionPayload, FetchActionType, Video, youtubeService } from '../../../youtube-api';
import { SearchType } from '../../interfaces';
import { getProgressBar, getRandomItemsFromArray } from '../../utils';
import { addFetchedChannel, delayMessage, getCtxInfo, getMediaGroup, moreButton, validateVideo } from './search-random.helper';


export class SearchRandomService {
    scene: BaseScene<Context<any>>;

    constructor(scene: BaseScene<Context<any>>) {
        this.scene = scene;
    }

    getSceneType(ctx: ContextMessageUpdate): SearchType {
        return ctx.session.__scenes.state && ctx.session.__scenes.state.type || SearchType.RANDOM;
    }

    onText(ctx: ContextMessageUpdate, message = ctx.message.text) {
        const { chatId, username } = getCtxInfo(ctx);
        const { telegram } = ctx;

        ctx.reply(ctx.i18n.t('scenes.searchRandom.searchChannel', { username, message }), { parse_mode: 'Markdown' })
            .then(() => telegram.sendChatAction(chatId, 'typing'));

        try {
            youtubeService.updateChannelVideosList(message)
                .subscribe((action: FetchAction) => {
                    switch (action.type) {
                        case FetchActionType.FOUND_CHANNEL:
                            this.onFoundChannel(ctx, action as any);
                            break;

                        case FetchActionType.VIDEOS_FETCHED:
                            this.onVideosFetched(ctx, action as any);
                            break;

                        case FetchActionType.FETCH_END:
                            this.onFetchEnd(ctx, action as any);
                            break;

                        case FetchActionType.ERROR:
                            this.onError(ctx, action as any);
                            break;
                    }
                });
        } catch (e) {
            console.error(e);
            ctx.reply(ctx.i18n.t('scenes.errors.notFound', { message }));
            ctx.reply(e);
        }
    }

    onNextButtonClick() {
        this.scene.action('random_more', async (ctx: ContextMessageUpdate) => {
            const chatId = ctx.callbackQuery.from.id;

            if (!ctx.session.videos) {
                return ctx.reply(ctx.i18n.t('scenes.errors.botReset'));
            }

            const { videos } = ctx.session;
            const { telegram } = ctx;
            const sceneType = await this.getSceneType(ctx);

            ctx.session.videoOffset += 10;

            const videosGroup: Video[] = await this.getMediaGroup(ctx, videos);
            const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = getMediaGroup(ctx, videosGroup);

            ctx.session.videos = videos;

            if (sceneType === SearchType.RANDOM) {
                await telegram.sendDice(chatId);
                await telegram.sendChatAction(chatId, 'upload_photo');
                await delayMessage(2000)();
            } else {
                await telegram.sendChatAction(chatId, 'upload_photo');
            }

            await ctx.replyWithMediaGroup(mediaGroup);
            await moreButton(ctx)();
        });
    }

    async onFoundChannel(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.FOUND_CHANNEL>) {
        const { channel } = action.payload;
        const { telegram } = ctx;
        const { chatId } = getCtxInfo(ctx);

        ctx.session.channel = channel;
        addFetchedChannel(ctx, channel);

        const { title, videoCount } = channel;

        const channelData = {
            thumbnail: channel.thumbnail,
            options: {
                parse_mode: 'Markdown',
                caption: ctx.i18n.t('scenes.shared.foundChannel', { title, videoCount }),
            } as tt.ExtraPhoto,
        };

        await telegram.sendPhoto(chatId, channelData.thumbnail, channelData.options);
        const someTextMessage = await ctx.reply(ctx.i18n.t(
            'scenes.shared.fetchVideoProgress',
            {
                fetchedCount: 0,
                videoCount: channel.videoCount,
                progressBar: getProgressBar(0, Math.min(channel.videoCount, youtubeService.DEFAULT_VIDEOS_COUNT)) + '.',
            },
        ));
        ctx.state.editMessageId = someTextMessage.message_id;
    }

    onVideosFetched(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.VIDEOS_FETCHED>) {
        const { channel } = ctx.session;
        const { videos } = action.payload;
        const { chatId } = getCtxInfo(ctx);

        const progressBar = getProgressBar(videos.length, Math.min(channel.videoCount, youtubeService.DEFAULT_VIDEOS_COUNT));

        ctx.telegram.editMessageText(
            chatId,
            ctx.state.editMessageId,
            null,
            ctx.i18n.t(
            'scenes.shared.fetchVideoProgress',
            { fetchedCount: videos.length, videoCount: channel.videoCount, progressBar },
            ),
        );
    }

    async onFetchEnd(ctx: ContextMessageUpdate, action: FetchAction<FetchActionType.VIDEOS_FETCHED>) {
        const { telegram } = ctx;
        const { chatId } = getCtxInfo(ctx);
        const sceneType = await this.getSceneType(ctx);

        const { videos } = action.payload;

        ctx.session.videoOffset = 0;
        ctx.session.videos = videos;

        const videosGroup: Video[] = await this.getMediaGroup(ctx, videos);
        const mediaGroup: ReadonlyArray<tg.InputMediaPhoto> = getMediaGroup(ctx, videosGroup);

        await telegram.editMessageText(
            chatId,
            ctx.state.editMessageId,
            null,
            ctx.i18n.t(
                'scenes.shared.fetchedAllVideos',
                { videoCount: videos.length },
            ),
        );

        if (sceneType === SearchType.RANDOM) {
            await delayMessage(2000)();
            await telegram.sendDice(chatId);
        }

        await telegram.sendChatAction(chatId, 'upload_photo');
        await delayMessage(2000)();
        await ctx.replyWithMediaGroup(mediaGroup);
        await moreButton(ctx)();
    }

    onError(ctx: ContextMessageUpdate, action: FetchActionPayload<FetchActionType.ERROR>) {
        const { message } = getCtxInfo(ctx);
        const { error } = action;
        ctx.reply(ctx.i18n.t('scenes.errors.notFound', { message })).then(() => ctx.reply(error && error.message || String(error)));
    }

    private async getMediaGroup(ctx: ContextMessageUpdate, videos: Video[]): Promise<Video[]> {
        const sceneType = this.getSceneType(ctx);

        switch (sceneType) {
            case SearchType.RANDOM:
                return await asyncMap(getRandomItemsFromArray(videos, 10), validateVideo);

            case SearchType.LATEST:
                const from = Math.min(videos.length - 10, ctx.session.videoOffset);
                const to = Math.min(videos.length, ctx.session.videoOffset + 10);

                return await asyncMap(videos.slice(from, to), validateVideo);
        }
    }
}
