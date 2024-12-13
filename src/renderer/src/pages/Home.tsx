import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { Search } from "lucide-react";
import YoutubeItem from "./components/YoutubeItem";
import YoutubeBrowser from "./components/YoutubeBrowser";


const mockItems = [
    {
        title: "Video 1",
        thumbnail: "https://yt3.ggpht.com/ytc/AAUvwni2w5i2bM8c0_7r5-6Kzs8e-t6_H8-3C4c6x6E=s88-c-k-c0x00ffffff-no-rj",
        duration: "1:00:00",
        views: "100.000.000 visualizaciones",
        likes: "100.000 likes",
        description: "Este es un video de ejemplo",
        channel: {
            name: "Nombre del canal",
            thumbnail: "https://yt3.ggpht.com/ytc/AAUvwni2w5i2bM8c0_7r5-6Kzs8e-t6_H8-3C4c6x6E=s88-c-k-c0x00ffffff-no-rj"
        }
    },
    {
        title: "Video 2",
        thumbnail: "https://yt3.ggpht.com/ytc/AAUvwni2w5i2bM8c0_7r5-6Kzs8e-t6_H8-3C4c6x6E=s88-c-k-c0x00ffffff-no-rj",
        duration: "1:00:00",
        views: "100.000.000 visualizaciones",
        likes: "100.000 likes",
        description: "Este es un video de ejemplo",
        channel: {
            name: "Nombre del canal",
            thumbnail: "https://yt3.ggpht.com/ytc/AAUvwni2w5i2bM8c0_7r5-6Kzs8e-t6_H8-3C4c6x6E=s88-c-k-c0x00ffffff-no-rj"
        }
    },
    {
        title: "Video 3",
        thumbnail: "https://yt3.ggpht.com/ytc/AAUvwni2w5i2bM8c0_7r5-6Kzs8e-t6_H8-3C4c6x6E=s88-c-k-c0x00ffffff-no-rj",
        duration: "1:00:00",
        views: "100.000.000 visualizaciones",
        likes: "100.000 likes",
        description: "Este es un video de ejemplo",
        channel: {
            name: "Nombre del canal",
            thumbnail: "https://yt3.ggpht.com/ytc/AAUvwni2w5i2bM8c0_7r5-6Kzs8e-t6_H8-3C4c6x6E=s88-c-k-c0x00ffffff-no-rj"
        }
    },
]

const Home = () => {
    return (
        <div className="w-full h-[95%]">
            <div className="w-full h-1/6">
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <YoutubeBrowser />
                </div>
            </div>
            <div>
                {mockItems.length && mockItems.map(x => 
                    <YoutubeItem key={x.title} {...x} />
                )}
            </div>
        </div>
    )
}

export default Home;