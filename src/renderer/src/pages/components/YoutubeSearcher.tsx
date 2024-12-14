import { LoadingSpinner } from "@renderer/components/LoadingSpinner";
import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { useLoading } from "@renderer/contexts/LoadingContext";
import { YoutubeSearchResponse, YoutubeVideo } from "@renderer/models/youtube";
import { Search } from "lucide-react";
import React, { useState } from "react";

const ytsr = require('ytsr');

interface YoutubeSearcherProps {
    setVideos: (videos: YoutubeVideo[]) => void;
}

const YoutubeSearcher = ( { setVideos }: YoutubeSearcherProps) => {
    const [search, setSearch] = useState("");

    const { startLoading, stopLoading } = useLoading();

    const handleSearch = async () => {
        if (!search || !search.length) return;

        startLoading();

        const response = (await ytsr(search, { limit: 20 })) as YoutubeSearchResponse;

        if (!response || !response.items || !response.items.length) {
            stopLoading();
            return;
        }

        const videosMapped = response.items.filter((x: any) => x.type === "video" && !x.isLive && !x.isUpcoming).map((x: any) => ({
            title: x.title,
            thumbnail: x.bestThumbnail.url,
            duration: x.duration?.replace("PT", ""),
            channel: x.author.name,
            url: x.url,
            videoId: x.id
        }));

        setVideos(videosMapped);

        stopLoading();
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <React.Fragment>
            <Input onChange={(e: any) => setSearch(e.target.value)} onKeyDown={handleKeyDown} className="w-[75%] rounded-l-full border-slate-800 focus:border-slate-800 mb-2" placeholder="Buscar video" />
            <Button className="w-[60px] bg-ytred rounded-r-full mb-2" onClick={handleSearch} title="Buscar video"><Search /></Button>
        </React.Fragment>
    )
}

export default YoutubeSearcher;