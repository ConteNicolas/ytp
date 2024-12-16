
import { Button } from "@renderer/components/ui/button";
import { CheckCircleIcon, ClockIcon, XCircleIcon, XIcon } from "lucide-react";

interface HistoryItemProps {
    item: any;
    onRemove: (id: string) => void;
}

const statusColors = {
    "in-queue": "text-slate-500",
    "downloading": "text-slate-500",
    "downloaded": "text-green-500",
    "error": "text-red-500"
}

const statusIcons = {
    "in-queue": <ClockIcon size={10} />,
    "downloading": <ClockIcon />,
    "downloaded": <CheckCircleIcon size={12} className="ml-1 mt-1" />,
    "error": <XCircleIcon />
}

const statusDescriptions = {
    "in-queue": "En cola",
    "downloading": "Descargando",
    "downloaded": "Descargado",
    "error": "Error"
}

const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return `${interval} años`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} meses`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} días`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} horas`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutos`;
    }
    return `${Math.floor(seconds)} segundos`;
}

const HistoryItem = ({ item, onRemove }: HistoryItemProps) => {

    const handleRemove = async () => {
        await window.userHistory.removeHistoryItem(item.id);
        onRemove(item.id);
    }

    return (
        <div className="w-[100%] h-[160px] bg-slate-100 rounded-xl mt-4 flex-shrink-0 flex flex-row hover:bg-slate-200">
            <div className="w-[30%] h-full p-3">
                <img src={item.thumbnail} className="w-full h-full rounded-xl" />
            </div>
            <div className="w-[65%] h-full flex flex-col justify-start items-start p-2">
                <span className="text-md font-bold mt-1">{item.title}</span>
                <div className={`text-sm font-medium mt-1 flex flex-row`}>
                    Estado:
                    <span className={`${statusColors[item.status]} ml-2 flex flex-row`}>
                        {statusDescriptions[item.status]}
                        {statusIcons[item.status]}
                    </span>
                </div>
                {item.status === "error" && <span className="text-sm font-medium mt-1">Razon: {item.reason}</span>}
                <span className="text-sm font-medium">Descargado hace {getRelativeTime(new Date(item.time))}</span>
                <span className="text-sm font-medium">Ruta de descarga: {item.outputDir}</span>
            </div>
            
            <div className="w-[5%] h-full p-2">
                <Button size="sm" className="relative top-0 right-1 size-6 rounded-full bg-red-800" onClick={handleRemove}><XIcon size={8} /></Button>
            </div>
        </div>
    )
}

export default HistoryItem;