/**
 * Returns on the channel videos page
 * Autogenerated with http://json2ts.com/
 *
 * @example link:
 * https://www.youtube.com/c/StopGameRuGames/videos
 *
 * @example path to results:
 * json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
 * */
export declare module ChannelVideosResponse {

    export interface Param {
        key: string;
        value: string;
    }

    export interface ServiceTrackingParam {
        service: string;
        params: Param[];
    }

    export interface MainAppWebResponseContext {
        loggedOut: boolean;
    }

    export interface YtConfigData {
        visitorData: string;
        rootVisualElementType: number;
    }

    export interface WebResponseContextExtensionData {
        ytConfigData: YtConfigData;
        hasDecorated: boolean;
    }

    export interface ResponseContext {
        serviceTrackingParams: ServiceTrackingParam[];
        maxAgeSeconds: number;
        mainAppWebResponseContext: MainAppWebResponseContext;
        webResponseContextExtensionData: WebResponseContextExtensionData;
    }

    export interface WebCommandMetadata {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata {
        webCommandMetadata: WebCommandMetadata;
    }

    export interface BrowseEndpoint {
        browseId: string;
        params: string;
        canonicalBaseUrl: string;
    }

    export interface Endpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata;
        browseEndpoint: BrowseEndpoint;
    }

    export interface Thumbnail2 {
        url: string;
        width: number;
        height: number;
    }

    export interface Thumbnail {
        thumbnails: Thumbnail2[];
    }

    export interface Run {
        text: string;
    }

    export interface AccessibilityData {
        label: string;
    }

    export interface Accessibility {
        accessibilityData: AccessibilityData;
    }

    export interface Title {
        runs: Run[];
        accessibility: Accessibility;
    }

    export interface PublishedTimeText {
        simpleText: string;
    }

    export interface ViewCountText {
        simpleText: string;
    }

    export interface WebCommandMetadata2 {
        url: string;
        webPageType: string;
        rootVe: number;
    }

    export interface CommandMetadata2 {
        webCommandMetadata: WebCommandMetadata2;
    }

    export interface WatchEndpoint {
        videoId: string;
    }

    export interface NavigationEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata2;
        watchEndpoint: WatchEndpoint;
    }

    export interface Icon {
        iconType: string;
    }

    export interface MetadataBadgeRenderer {
        icon: Icon;
        style: string;
        tooltip: string;
        trackingParams: string;
    }

    export interface OwnerBadge {
        metadataBadgeRenderer: MetadataBadgeRenderer;
    }

    export interface ShortViewCountText {
        simpleText: string;
    }

    export interface Run2 {
        text: string;
    }

    export interface Text {
        runs: Run2[];
    }

    export interface Icon2 {
        iconType: string;
    }

    export interface WebCommandMetadata3 {
        sendPost: boolean;
    }

    export interface CommandMetadata3 {
        webCommandMetadata: WebCommandMetadata3;
    }

    export interface WebCommandMetadata4 {
        sendPost: boolean;
        apiUrl: string;
    }

    export interface CommandMetadata4 {
        webCommandMetadata: WebCommandMetadata4;
    }

    export interface CreatePlaylistServiceEndpoint {
        videoIds: string[];
        params: string;
    }

    export interface OnCreateListCommand {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata4;
        createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
    }

    export interface AddToPlaylistCommand {
        openMiniplayer: boolean;
        videoId: string;
        listType: string;
        onCreateListCommand: OnCreateListCommand;
        videoIds: string[];
    }

    export interface Action {
        clickTrackingParams: string;
        addToPlaylistCommand: AddToPlaylistCommand;
    }

    export interface SignalServiceEndpoint {
        signal: string;
        actions: Action[];
    }

    export interface ServiceEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata3;
        signalServiceEndpoint: SignalServiceEndpoint;
    }

    export interface MenuServiceItemRenderer {
        text: Text;
        icon: Icon2;
        serviceEndpoint: ServiceEndpoint;
        trackingParams: string;
    }

    export interface Item2 {
        menuServiceItemRenderer: MenuServiceItemRenderer;
    }

    export interface AccessibilityData2 {
        label: string;
    }

    export interface Accessibility2 {
        accessibilityData: AccessibilityData2;
    }

    export interface MenuRenderer {
        items: Item2[];
        trackingParams: string;
        accessibility: Accessibility2;
    }

    export interface Menu {
        menuRenderer: MenuRenderer;
    }

    export interface AccessibilityData3 {
        label: string;
    }

    export interface Accessibility3 {
        accessibilityData: AccessibilityData3;
    }

    export interface Text2 {
        accessibility: Accessibility3;
        simpleText: string;
    }

    export interface ThumbnailOverlayTimeStatusRenderer {
        text: Text2;
        style: string;
    }

    export interface UntoggledIcon {
        iconType: string;
    }

    export interface ToggledIcon {
        iconType: string;
    }

    export interface WebCommandMetadata5 {
        sendPost: boolean;
        apiUrl: string;
    }

    export interface CommandMetadata5 {
        webCommandMetadata: WebCommandMetadata5;
    }

    export interface Action2 {
        addedVideoId: string;
        action: string;
    }

    export interface PlaylistEditEndpoint {
        playlistId: string;
        actions: Action2[];
    }

    export interface WebCommandMetadata6 {
        sendPost: boolean;
        apiUrl: string;
    }

    export interface CommandMetadata6 {
        webCommandMetadata: WebCommandMetadata6;
    }

    export interface CreatePlaylistServiceEndpoint2 {
        videoIds: string[];
        params: string;
    }

    export interface OnCreateListCommand2 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata6;
        createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint2;
    }

    export interface AddToPlaylistCommand2 {
        openMiniplayer: boolean;
        videoId: string;
        listType: string;
        onCreateListCommand: OnCreateListCommand2;
        videoIds: string[];
    }

    export interface Action3 {
        clickTrackingParams: string;
        addToPlaylistCommand: AddToPlaylistCommand2;
    }

    export interface SignalServiceEndpoint2 {
        signal: string;
        actions: Action3[];
    }

    export interface UntoggledServiceEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata5;
        playlistEditEndpoint: PlaylistEditEndpoint;
        signalServiceEndpoint: SignalServiceEndpoint2;
    }

    export interface WebCommandMetadata7 {
        sendPost: boolean;
        apiUrl: string;
    }

    export interface CommandMetadata7 {
        webCommandMetadata: WebCommandMetadata7;
    }

    export interface Action4 {
        action: string;
        removedVideoId: string;
    }

    export interface PlaylistEditEndpoint2 {
        playlistId: string;
        actions: Action4[];
    }

    export interface ToggledServiceEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata7;
        playlistEditEndpoint: PlaylistEditEndpoint2;
    }

    export interface AccessibilityData4 {
        label: string;
    }

    export interface UntoggledAccessibility {
        accessibilityData: AccessibilityData4;
    }

    export interface AccessibilityData5 {
        label: string;
    }

    export interface ToggledAccessibility {
        accessibilityData: AccessibilityData5;
    }

    export interface ThumbnailOverlayToggleButtonRenderer {
        isToggled: boolean;
        untoggledIcon: UntoggledIcon;
        toggledIcon: ToggledIcon;
        untoggledTooltip: string;
        toggledTooltip: string;
        untoggledServiceEndpoint: UntoggledServiceEndpoint;
        toggledServiceEndpoint: ToggledServiceEndpoint;
        untoggledAccessibility: UntoggledAccessibility;
        toggledAccessibility: ToggledAccessibility;
        trackingParams: string;
    }

    export interface Run3 {
        text: string;
    }

    export interface Text3 {
        runs: Run3[];
    }

    export interface ThumbnailOverlayNowPlayingRenderer {
        text: Text3;
    }

    export interface ThumbnailOverlay {
        thumbnailOverlayTimeStatusRenderer: ThumbnailOverlayTimeStatusRenderer;
        thumbnailOverlayToggleButtonRenderer: ThumbnailOverlayToggleButtonRenderer;
        thumbnailOverlayNowPlayingRenderer: ThumbnailOverlayNowPlayingRenderer;
    }

    export interface GridVideoRenderer {
        videoId: string;
        thumbnail: Thumbnail;
        title: Title;
        publishedTimeText?: PublishedTimeText;
        viewCountText: ViewCountText;
        navigationEndpoint: NavigationEndpoint;
        ownerBadges: OwnerBadge[];
        trackingParams: string;
        shortViewCountText: ShortViewCountText;
        menu: Menu;
        thumbnailOverlays: ThumbnailOverlay[];
        upcomingEventData?: {
            startTime: string,
            isReminderSet: boolean,
            upcomingEventText: {
                runs: {
                    text: string;
                }[];
            },
        };
    }

    export interface WebCommandMetadata8 {
        sendPost: boolean;
        apiUrl: string;
    }

    export interface CommandMetadata8 {
        webCommandMetadata: WebCommandMetadata8;
    }

    export interface ContinuationCommand {
        token: string;
        request: string;
    }

    export interface ContinuationEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata8;
        continuationCommand: ContinuationCommand;
    }

    export interface ContinuationItemRenderer {
        trigger: string;
        continuationEndpoint: ContinuationEndpoint;
    }

    export interface Item {
        gridVideoRenderer: GridVideoRenderer;
        continuationItemRenderer: ContinuationItemRenderer;
    }

    export interface GridRenderer {
        items: Item[];
        trackingParams: string;
        targetId: string;
    }

    export interface Content3 {
        gridRenderer: GridRenderer;
    }

    export interface ItemSectionRenderer {
        contents: Content3[];
        trackingParams: string;
    }

    export interface Content2 {
        itemSectionRenderer: ItemSectionRenderer;
    }

    export interface WebCommandMetadata9 {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata9 {
        webCommandMetadata: WebCommandMetadata9;
    }

    export interface BrowseEndpoint2 {
        browseId: string;
        params: string;
        canonicalBaseUrl: string;
    }

    export interface Endpoint2 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata9;
        browseEndpoint: BrowseEndpoint2;
    }

    export interface ContentTypeSubMenuItem {
        endpoint: Endpoint2;
        title: string;
        selected: boolean;
    }

    export interface Run4 {
        text: string;
    }

    export interface Text4 {
        runs: Run4[];
    }

    export interface WebCommandMetadata10 {
        url: string;
        webPageType: string;
        rootVe: number;
    }

    export interface CommandMetadata10 {
        webCommandMetadata: WebCommandMetadata10;
    }

    export interface WatchPlaylistEndpoint {
        playlistId: string;
    }

    export interface NavigationEndpoint2 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata10;
        watchPlaylistEndpoint: WatchPlaylistEndpoint;
    }

    export interface ButtonRenderer {
        style: string;
        size: string;
        isDisabled: boolean;
        text: Text4;
        navigationEndpoint: NavigationEndpoint2;
        trackingParams: string;
    }

    export interface PlayAllButton {
        buttonRenderer: ButtonRenderer;
    }

    export interface WebCommandMetadata11 {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata11 {
        webCommandMetadata: WebCommandMetadata11;
    }

    export interface BrowseEndpoint3 {
        browseId: string;
        params: string;
        canonicalBaseUrl: string;
    }

    export interface NavigationEndpoint3 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata11;
        browseEndpoint: BrowseEndpoint3;
    }

    export interface SubMenuItem {
        title: string;
        selected: boolean;
        navigationEndpoint: NavigationEndpoint3;
    }

    export interface Icon3 {
        iconType: string;
    }

    export interface AccessibilityData6 {
        label: string;
    }

    export interface Accessibility4 {
        accessibilityData: AccessibilityData6;
    }

    export interface SortFilterSubMenuRenderer {
        subMenuItems: SubMenuItem[];
        title: string;
        icon: Icon3;
        accessibility: Accessibility4;
        trackingParams: string;
    }

    export interface SortSetting {
        sortFilterSubMenuRenderer: SortFilterSubMenuRenderer;
    }

    export interface ChannelSubMenuRenderer {
        contentTypeSubMenuItems: ContentTypeSubMenuItem[];
        playAllButton: PlayAllButton;
        sortSetting: SortSetting;
    }

    export interface SubMenu {
        channelSubMenuRenderer: ChannelSubMenuRenderer;
    }

    export interface SectionListRenderer {
        contents: Content2[];
        trackingParams: string;
        subMenu: SubMenu;
        targetId: string;
    }

    export interface Content {
        sectionListRenderer: SectionListRenderer;
    }

    export interface TabRenderer {
        endpoint: Endpoint;
        title: string;
        selected: boolean;
        trackingParams: string;
        content: Content;
    }

    export interface WebCommandMetadata12 {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata12 {
        webCommandMetadata: WebCommandMetadata12;
    }

    export interface BrowseEndpoint4 {
        browseId: string;
        params: string;
        canonicalBaseUrl: string;
    }

    export interface Endpoint3 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata12;
        browseEndpoint: BrowseEndpoint4;
    }

    export interface ExpandableTabRenderer {
        endpoint: Endpoint3;
        title: string;
        selected: boolean;
    }

    export interface Tab {
        tabRenderer: TabRenderer;
        expandableTabRenderer: ExpandableTabRenderer;
    }

    export interface TwoColumnBrowseResultsRenderer {
        tabs: Tab[];
    }

    export interface Contents {
        twoColumnBrowseResultsRenderer: TwoColumnBrowseResultsRenderer;
    }

    export interface WebCommandMetadata13 {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata13 {
        webCommandMetadata: WebCommandMetadata13;
    }

    export interface BrowseEndpoint5 {
        browseId: string;
        canonicalBaseUrl: string;
    }

    export interface NavigationEndpoint4 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata13;
        browseEndpoint: BrowseEndpoint5;
    }

    export interface Thumbnail3 {
        url: string;
        width: number;
        height: number;
    }

    export interface Avatar {
        thumbnails: Thumbnail3[];
    }

    export interface Thumbnail4 {
        url: string;
        width: number;
        height: number;
    }

    export interface Banner {
        thumbnails: Thumbnail4[];
    }

    export interface Icon4 {
        iconType: string;
    }

    export interface MetadataBadgeRenderer2 {
        icon: Icon4;
        style: string;
        tooltip: string;
        trackingParams: string;
    }

    export interface Badge {
        metadataBadgeRenderer: MetadataBadgeRenderer2;
    }

    export interface Run5 {
        text: string;
    }

    export interface Text5 {
        runs: Run5[];
    }

    export interface WebCommandMetadata14 {
        ignoreNavigation: boolean;
    }

    export interface CommandMetadata14 {
        webCommandMetadata: WebCommandMetadata14;
    }

    export interface Title2 {
        simpleText: string;
    }

    export interface Content4 {
        simpleText: string;
    }

    export interface Text6 {
        simpleText: string;
    }

    export interface WebCommandMetadata15 {
        url: string;
        webPageType: string;
        rootVe: number;
    }

    export interface CommandMetadata15 {
        webCommandMetadata: WebCommandMetadata15;
    }

    export interface WebCommandMetadata16 {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata16 {
        webCommandMetadata: WebCommandMetadata16;
    }

    export interface BrowseEndpoint6 {
        browseId: string;
        params: string;
        canonicalBaseUrl: string;
    }

    export interface NextEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata16;
        browseEndpoint: BrowseEndpoint6;
    }

    export interface SignInEndpoint {
        nextEndpoint: NextEndpoint;
        continueAction: string;
        idamTag: string;
    }

    export interface NavigationEndpoint6 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata15;
        signInEndpoint: SignInEndpoint;
    }

    export interface ButtonRenderer3 {
        style: string;
        size: string;
        isDisabled: boolean;
        text: Text6;
        navigationEndpoint: NavigationEndpoint6;
        trackingParams: string;
    }

    export interface Button {
        buttonRenderer: ButtonRenderer3;
    }

    export interface ModalWithTitleAndButtonRenderer {
        title: Title2;
        content: Content4;
        button: Button;
    }

    export interface Modal {
        modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer;
    }

    export interface ModalEndpoint {
        modal: Modal;
    }

    export interface NavigationEndpoint5 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata14;
        modalEndpoint: ModalEndpoint;
    }

    export interface ButtonRenderer2 {
        style: string;
        size: string;
        isDisabled: boolean;
        text: Text5;
        navigationEndpoint: NavigationEndpoint5;
        trackingParams: string;
    }

    export interface SubscribeButton {
        buttonRenderer: ButtonRenderer2;
    }

    export interface SubscriberCountText {
        simpleText: string;
    }

    export interface Thumbnail5 {
        url: string;
        width: number;
        height: number;
    }

    export interface TvBanner {
        thumbnails: Thumbnail5[];
    }

    export interface Thumbnail6 {
        url: string;
        width: number;
        height: number;
    }

    export interface MobileBanner {
        thumbnails: Thumbnail6[];
    }

    export interface C4TabbedHeaderRenderer {
        channelId: string;
        title: string;
        navigationEndpoint: NavigationEndpoint4;
        avatar: Avatar;
        banner: Banner;
        badges: Badge[];
        subscribeButton: SubscribeButton;
        subscriberCountText: SubscriberCountText;
        tvBanner: TvBanner;
        mobileBanner: MobileBanner;
        trackingParams: string;
    }

    export interface Header {
        c4TabbedHeaderRenderer: C4TabbedHeaderRenderer;
    }

    export interface Thumbnail7 {
        url: string;
        width: number;
        height: number;
    }

    export interface Avatar2 {
        thumbnails: Thumbnail7[];
    }

    export interface ChannelMetadataRenderer {
        title: string;
        description: string;
        rssUrl: string;
        externalId: string;
        keywords: string;
        ownerUrls: string[];
        avatar: Avatar2;
        channelUrl: string;
        isFamilySafe: boolean;
        availableCountryCodes: string[];
        androidDeepLink: string;
        androidAppindexingLink: string;
        iosAppindexingLink: string;
        tabPath: string;
        vanityChannelUrl: string;
    }

    export interface Metadata {
        channelMetadataRenderer: ChannelMetadataRenderer;
    }

    export interface IconImage {
        iconType: string;
    }

    export interface Run6 {
        text: string;
    }

    export interface TooltipText {
        runs: Run6[];
    }

    export interface WebCommandMetadata17 {
        url: string;
        webPageType: string;
        rootVe: number;
        apiUrl: string;
    }

    export interface CommandMetadata17 {
        webCommandMetadata: WebCommandMetadata17;
    }

    export interface BrowseEndpoint7 {
        browseId: string;
    }

    export interface Endpoint4 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata17;
        browseEndpoint: BrowseEndpoint7;
    }

    export interface TopbarLogoRenderer {
        iconImage: IconImage;
        tooltipText: TooltipText;
        endpoint: Endpoint4;
        trackingParams: string;
    }

    export interface Logo {
        topbarLogoRenderer: TopbarLogoRenderer;
    }

    export interface Icon5 {
        iconType: string;
    }

    export interface Run7 {
        text: string;
    }

    export interface PlaceholderText {
        runs: Run7[];
    }

    export interface WebSearchboxConfig {
        requestLanguage: string;
        requestDomain: string;
        hasOnscreenKeyboard: boolean;
        focusSearchbox: boolean;
    }

    export interface Config {
        webSearchboxConfig: WebSearchboxConfig;
    }

    export interface WebCommandMetadata18 {
        url: string;
        webPageType: string;
        rootVe: number;
    }

    export interface CommandMetadata18 {
        webCommandMetadata: WebCommandMetadata18;
    }

    export interface SearchEndpoint2 {
        query: string;
    }

    export interface SearchEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata18;
        searchEndpoint: SearchEndpoint2;
    }

    export interface FusionSearchboxRenderer {
        icon: Icon5;
        placeholderText: PlaceholderText;
        config: Config;
        trackingParams: string;
        searchEndpoint: SearchEndpoint;
    }

    export interface Searchbox {
        fusionSearchboxRenderer: FusionSearchboxRenderer;
    }

    export interface Icon6 {
        iconType: string;
    }

    export interface Icon7 {
        iconType: string;
    }

    export interface Run8 {
        text: string;
    }

    export interface Title3 {
        runs: Run8[];
    }

    export interface WebCommandMetadata19 {
        url: string;
        webPageType: string;
        rootVe: number;
    }

    export interface CommandMetadata19 {
        webCommandMetadata: WebCommandMetadata19;
    }

    export interface UrlEndpoint {
        url: string;
        target: string;
    }

    export interface NavigationEndpoint7 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata19;
        urlEndpoint: UrlEndpoint;
    }

    export interface CompactLinkRenderer {
        icon: Icon7;
        title: Title3;
        navigationEndpoint: NavigationEndpoint7;
        trackingParams: string;
    }

    export interface Item3 {
        compactLinkRenderer: CompactLinkRenderer;
    }

    export interface MultiPageMenuSectionRenderer {
        items: Item3[];
        trackingParams: string;
    }

    export interface Section {
        multiPageMenuSectionRenderer: MultiPageMenuSectionRenderer;
    }

    export interface MultiPageMenuRenderer {
        sections: Section[];
        trackingParams: string;
    }

    export interface MenuRenderer2 {
        multiPageMenuRenderer: MultiPageMenuRenderer;
    }

    export interface AccessibilityData7 {
        label: string;
    }

    export interface Accessibility5 {
        accessibilityData: AccessibilityData7;
    }

    export interface WebCommandMetadata20 {
        sendPost: boolean;
        apiUrl: string;
    }

    export interface CommandMetadata20 {
        webCommandMetadata: WebCommandMetadata20;
    }

    export interface MultiPageMenuRenderer2 {
        trackingParams: string;
        style: string;
        showLoadingSpinner: boolean;
    }

    export interface Popup {
        multiPageMenuRenderer: MultiPageMenuRenderer2;
    }

    export interface OpenPopupAction {
        popup: Popup;
        popupType: string;
        beReused: boolean;
    }

    export interface Action5 {
        clickTrackingParams: string;
        openPopupAction: OpenPopupAction;
    }

    export interface SignalServiceEndpoint3 {
        signal: string;
        actions: Action5[];
    }

    export interface MenuRequest {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata20;
        signalServiceEndpoint: SignalServiceEndpoint3;
    }

    export interface TopbarMenuButtonRenderer {
        icon: Icon6;
        menuRenderer: MenuRenderer2;
        trackingParams: string;
        accessibility: Accessibility5;
        tooltip: string;
        style: string;
        targetId: string;
        menuRequest: MenuRequest;
    }

    export interface Run9 {
        text: string;
    }

    export interface Text7 {
        runs: Run9[];
    }

    export interface Icon8 {
        iconType: string;
    }

    export interface WebCommandMetadata21 {
        url: string;
        webPageType: string;
        rootVe: number;
    }

    export interface CommandMetadata21 {
        webCommandMetadata: WebCommandMetadata21;
    }

    export interface SignInEndpoint2 {
        idamTag: string;
    }

    export interface NavigationEndpoint8 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata21;
        signInEndpoint: SignInEndpoint2;
    }

    export interface ButtonRenderer4 {
        style: string;
        size: string;
        text: Text7;
        icon: Icon8;
        navigationEndpoint: NavigationEndpoint8;
        trackingParams: string;
        targetId: string;
    }

    export interface TopbarButton {
        topbarMenuButtonRenderer: TopbarMenuButtonRenderer;
        buttonRenderer: ButtonRenderer4;
    }

    export interface Run10 {
        text: string;
    }

    export interface Title4 {
        runs: Run10[];
    }

    export interface Run11 {
        text: string;
    }

    export interface Title5 {
        runs: Run11[];
    }

    export interface Run12 {
        text: string;
    }

    export interface Label {
        runs: Run12[];
    }

    export interface AccessibilityData8 {
        label: string;
    }

    export interface HotkeyAccessibilityLabel {
        accessibilityData: AccessibilityData8;
    }

    export interface HotkeyDialogSectionOptionRenderer {
        label: Label;
        hotkey: string;
        hotkeyAccessibilityLabel: HotkeyAccessibilityLabel;
    }

    export interface Option {
        hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer;
    }

    export interface HotkeyDialogSectionRenderer {
        title: Title5;
        options: Option[];
    }

    export interface Section2 {
        hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer;
    }

    export interface Run13 {
        text: string;
    }

    export interface Text8 {
        runs: Run13[];
    }

    export interface ButtonRenderer5 {
        style: string;
        size: string;
        isDisabled: boolean;
        text: Text8;
        trackingParams: string;
    }

    export interface DismissButton {
        buttonRenderer: ButtonRenderer5;
    }

    export interface HotkeyDialogRenderer {
        title: Title4;
        sections: Section2[];
        dismissButton: DismissButton;
        trackingParams: string;
    }

    export interface HotkeyDialog {
        hotkeyDialogRenderer: HotkeyDialogRenderer;
    }

    export interface WebCommandMetadata22 {
        sendPost: boolean;
    }

    export interface CommandMetadata22 {
        webCommandMetadata: WebCommandMetadata22;
    }

    export interface SignalAction {
        signal: string;
    }

    export interface Action6 {
        clickTrackingParams: string;
        signalAction: SignalAction;
    }

    export interface SignalServiceEndpoint4 {
        signal: string;
        actions: Action6[];
    }

    export interface Command {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata22;
        signalServiceEndpoint: SignalServiceEndpoint4;
    }

    export interface ButtonRenderer6 {
        trackingParams: string;
        command: Command;
    }

    export interface BackButton {
        buttonRenderer: ButtonRenderer6;
    }

    export interface WebCommandMetadata23 {
        sendPost: boolean;
    }

    export interface CommandMetadata23 {
        webCommandMetadata: WebCommandMetadata23;
    }

    export interface SignalAction2 {
        signal: string;
    }

    export interface Action7 {
        clickTrackingParams: string;
        signalAction: SignalAction2;
    }

    export interface SignalServiceEndpoint5 {
        signal: string;
        actions: Action7[];
    }

    export interface Command2 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata23;
        signalServiceEndpoint: SignalServiceEndpoint5;
    }

    export interface ButtonRenderer7 {
        trackingParams: string;
        command: Command2;
    }

    export interface ForwardButton {
        buttonRenderer: ButtonRenderer7;
    }

    export interface Run14 {
        text: string;
    }

    export interface Text9 {
        runs: Run14[];
    }

    export interface WebCommandMetadata24 {
        sendPost: boolean;
    }

    export interface CommandMetadata24 {
        webCommandMetadata: WebCommandMetadata24;
    }

    export interface SignalAction3 {
        signal: string;
    }

    export interface Action8 {
        clickTrackingParams: string;
        signalAction: SignalAction3;
    }

    export interface SignalServiceEndpoint6 {
        signal: string;
        actions: Action8[];
    }

    export interface Command3 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata24;
        signalServiceEndpoint: SignalServiceEndpoint6;
    }

    export interface ButtonRenderer8 {
        style: string;
        size: string;
        isDisabled: boolean;
        text: Text9;
        trackingParams: string;
        command: Command3;
    }

    export interface A11ySkipNavigationButton {
        buttonRenderer: ButtonRenderer8;
    }

    export interface WebCommandMetadata25 {
        sendPost: boolean;
    }

    export interface CommandMetadata25 {
        webCommandMetadata: WebCommandMetadata25;
    }

    export interface Run15 {
        text: string;
    }

    export interface PlaceholderHeader {
        runs: Run15[];
    }

    export interface Run16 {
        text: string;
    }

    export interface PromptHeader {
        runs: Run16[];
    }

    export interface Run17 {
        text: string;
    }

    export interface ExampleQuery1 {
        runs: Run17[];
    }

    export interface Run18 {
        text: string;
    }

    export interface ExampleQuery2 {
        runs: Run18[];
    }

    export interface Run19 {
        text: string;
    }

    export interface PromptMicrophoneLabel {
        runs: Run19[];
    }

    export interface Run20 {
        text: string;
    }

    export interface LoadingHeader {
        runs: Run20[];
    }

    export interface Run21 {
        text: string;
    }

    export interface ConnectionErrorHeader {
        runs: Run21[];
    }

    export interface Run22 {
        text: string;
    }

    export interface ConnectionErrorMicrophoneLabel {
        runs: Run22[];
    }

    export interface Run23 {
        text: string;
    }

    export interface PermissionsHeader {
        runs: Run23[];
    }

    export interface Run24 {
        text: string;
    }

    export interface PermissionsSubtext {
        runs: Run24[];
    }

    export interface Run25 {
        text: string;
    }

    export interface DisabledHeader {
        runs: Run25[];
    }

    export interface Run26 {
        text: string;
    }

    export interface DisabledSubtext {
        runs: Run26[];
    }

    export interface Icon9 {
        iconType: string;
    }

    export interface AccessibilityData10 {
        label: string;
    }

    export interface AccessibilityData9 {
        accessibilityData: AccessibilityData10;
    }

    export interface ButtonRenderer10 {
        style: string;
        size: string;
        isDisabled: boolean;
        icon: Icon9;
        trackingParams: string;
        accessibilityData: AccessibilityData9;
    }

    export interface ExitButton {
        buttonRenderer: ButtonRenderer10;
    }

    export interface Run27 {
        text: string;
    }

    export interface MicrophoneOffPromptHeader {
        runs: Run27[];
    }

    export interface VoiceSearchDialogRenderer {
        placeholderHeader: PlaceholderHeader;
        promptHeader: PromptHeader;
        exampleQuery1: ExampleQuery1;
        exampleQuery2: ExampleQuery2;
        promptMicrophoneLabel: PromptMicrophoneLabel;
        loadingHeader: LoadingHeader;
        connectionErrorHeader: ConnectionErrorHeader;
        connectionErrorMicrophoneLabel: ConnectionErrorMicrophoneLabel;
        permissionsHeader: PermissionsHeader;
        permissionsSubtext: PermissionsSubtext;
        disabledHeader: DisabledHeader;
        disabledSubtext: DisabledSubtext;
        exitButton: ExitButton;
        trackingParams: string;
        microphoneOffPromptHeader: MicrophoneOffPromptHeader;
    }

    export interface Popup2 {
        voiceSearchDialogRenderer: VoiceSearchDialogRenderer;
    }

    export interface OpenPopupAction2 {
        popup: Popup2;
        popupType: string;
    }

    export interface Action9 {
        clickTrackingParams: string;
        openPopupAction: OpenPopupAction2;
    }

    export interface SignalServiceEndpoint7 {
        signal: string;
        actions: Action9[];
    }

    export interface ServiceEndpoint2 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata25;
        signalServiceEndpoint: SignalServiceEndpoint7;
    }

    export interface Icon10 {
        iconType: string;
    }

    export interface AccessibilityData12 {
        label: string;
    }

    export interface AccessibilityData11 {
        accessibilityData: AccessibilityData12;
    }

    export interface ButtonRenderer9 {
        style: string;
        size: string;
        isDisabled: boolean;
        serviceEndpoint: ServiceEndpoint2;
        icon: Icon10;
        tooltip: string;
        trackingParams: string;
        accessibilityData: AccessibilityData11;
    }

    export interface VoiceSearchButton {
        buttonRenderer: ButtonRenderer9;
    }

    export interface DesktopTopbarRenderer {
        logo: Logo;
        searchbox: Searchbox;
        trackingParams: string;
        countryCode: string;
        topbarButtons: TopbarButton[];
        hotkeyDialog: HotkeyDialog;
        backButton: BackButton;
        forwardButton: ForwardButton;
        a11ySkipNavigationButton: A11ySkipNavigationButton;
        voiceSearchButton: VoiceSearchButton;
    }

    export interface Topbar {
        desktopTopbarRenderer: DesktopTopbarRenderer;
    }

    export interface Thumbnail9 {
        url: string;
        width: number;
        height: number;
    }

    export interface Thumbnail8 {
        thumbnails: Thumbnail9[];
    }

    export interface LinkAlternate {
        hrefUrl: string;
    }

    export interface MicroformatDataRenderer {
        urlCanonical: string;
        title: string;
        description: string;
        thumbnail: Thumbnail8;
        siteName: string;
        appName: string;
        androidPackage: string;
        iosAppStoreId: string;
        iosAppArguments: string;
        ogType: string;
        urlApplinksWeb: string;
        urlApplinksIos: string;
        urlApplinksAndroid: string;
        urlTwitterIos: string;
        urlTwitterAndroid: string;
        twitterCardType: string;
        twitterSiteHandle: string;
        schemaDotOrgType: string;
        noindex: boolean;
        unlisted: boolean;
        familySafe: boolean;
        tags: string[];
        availableCountries: string[];
        linkAlternates: LinkAlternate[];
    }

    export interface Microformat {
        microformatDataRenderer: MicroformatDataRenderer;
    }

    export interface RootObject {
        responseContext: ResponseContext;
        contents: Contents;
        header: Header;
        metadata: Metadata;
        trackingParams: string;
        topbar: Topbar;
        microformat: Microformat;
    }

}
