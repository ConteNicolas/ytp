import { Button } from "@renderer/components/ui/button";
import { YoutubeVideo } from "@renderer/models/youtube";
import { DownloadIcon, EyeIcon, PlayIcon } from "lucide-react";
import YoutubePlayer from "./YoutubePlayer";
import { useState } from "react";

interface YoutubeItemProps {
    item: YoutubeVideo;
}

const YoutubeItem = ({ item }: YoutubeItemProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="w-[100%] h-[160px] bg-slate-100 rounded-xl mt-4 flex-shrink-0 flex flex-row cursor-pointer hover:bg-slate-200">
            <div className="w-[30%] h-full p-3">
                <img src={item.thumbnail} className="w-full h-full rounded-xl" />
            </div>
            <div className="w-[50%] h-full flex flex-col justify-start items-start p-2">
                <span className="text-md font-bold mt-1">{item.title}</span>
                <span className="text-sm font-medium mt-1">Canal: {item.channel}</span>
                <span className="text-sm font-medium">Duracion: {item.duration}</span>
            </div>
            <div className="w-[20%] h-full flex flex-row justify-center items-center">
                <Button className="rounded-sm bg-slate-500" size={"sm"} onClick={handleOpen} title="Reproducir vista previa">
                    <PlayIcon />
                </Button>
                <Button className="ml-3 rounded-sm bg-ytred" size={"sm"} title="Descargar en mp3">
                    <DownloadIcon />
                </Button>
            </div>

            <YoutubePlayer url={item.url} isOpen={open} onClose={handleClose} />
        </div>
    )
}

export default YoutubeItem;
