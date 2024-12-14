
export interface YoutubeVideo {
    title: string;
    thumbnail: string;
    duration: string;
    channel: string;
    url: string;
    videoId: string;
}



// Youtube Response

interface Filter {
    name: string;
    active: boolean;
    url: string | null;
    description: string;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

interface Author {
    name: string;
    channelID: string;
    url: string;
    bestAvatar: Thumbnail;
    avatars: Thumbnail[];
    ownerBadges: string[];
    verified: boolean;
}

interface VideoItem {
    type: "video";
    title: string;
    id: string;
    url: string;
    bestThumbnail: Thumbnail;
    thumbnails: Thumbnail[];
    isUpcoming: boolean;
    upcoming: string | null;
    isLive: boolean;
    badges: string[];
    author: Author;
    description: string | null;
    views: number;
    duration: string;
    uploadedAt: string | null;
}

interface ChannelItem {
    type: "channel";
    name: string;
    channelID: string;
    url: string;
    bestAvatar: Thumbnail;
    avatars: Thumbnail[];
    verified: boolean;
    subscribers: string;
    descriptionShort: string;
    videos: number;
}

type Item = VideoItem | ChannelItem;

export interface YoutubeSearchResponse {
    originalQuery: string;
    correctedQuery: string;
    results: number;
    activeFilters: Filter[];
    refinements: any[]; // Specify type if details are known
    items: Item[];
}