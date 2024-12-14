import YoutubeSearcher from "./components/YoutubeSearcher";
import { useState } from "react";
import { YoutubeVideo } from "@renderer/models/youtube";
import YoutubeItem from "./components/YoutubeItem";
import { TriangleAlertIcon } from "lucide-react";

const Home = () => {
    const [videos, setVideos] = useState<YoutubeVideo[]>([]);

    return (
        <div className="w-full h-[95%]">
            <div className="w-full h-[13%]">
                <div className="w-full h-full flex flex-row justify-center items-end">
                    <YoutubeSearcher setVideos={setVideos} />
                </div>
            </div>

            <div className="w-full h-[calc(100%-15%)] p-4 flex flex-col items-center justify-start overflow-y-scroll">
                {videos.length > 0 && videos.map(x =>
                    <YoutubeItem key={x.videoId} item={x} />
                )}
                {!videos.length &&
                    <div className="w-full h-[300px] justify-center items-center flex flex-col">
                        <TriangleAlertIcon className="text-red-900" size={80} /> 
                        <span className="text-xl font-medium mt-3">No hay videos disponibles en este momento</span>
                    </div>

                }
            </div>
        </div>
    );
}

export default Home;