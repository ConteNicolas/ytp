import YoutubeSearcher from "./components/YoutubeSearcher";
import { useState } from "react";
import { YoutubeVideo } from "@renderer/models/youtube";
import YoutubeItem from "./components/YoutubeItem";
import { YoutubeIcon } from "lucide-react";

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
                <div className="w-full h-auto flex flex-row items-start justify-start">
                    {videos.length > 0 && <span className="text-sm text-slate-700 font-medium ml-4">Resultados encontrados: {videos.length}</span>} 
                </div>

                {videos.length > 0 && videos.map(x =>
                    <YoutubeItem key={x.videoId} item={x} />
                )}
                {!videos.length &&
                    <div className="w-full h-[300px] justify-center items-center flex flex-col">
                        <span className="text-3xl font-bold mt-3 flex flex-row">Bienvenido a YtoP <YoutubeIcon size={40} className="ml-3 text-ytred" /> </span> 
                        <span className="text-md font-normal italic mt-3">Comienza colocando tu cancion favorita en el buscador</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;