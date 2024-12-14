import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@renderer/components/ui/alert-dialog";
import { MonitorCheckIcon, XIcon } from "lucide-react";
import ReactPlayer from "react-player";


interface YoutubePlayerProps {
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

const YoutubePlayer = ({ url, isOpen, onClose }: YoutubePlayerProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => {
            if (!open) onClose();
        }}>
            <AlertDialogContent className="w-[80%] max-w-4xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-ytred flex flex-row font-medium">  <MonitorCheckIcon className="mt-1 mr-3"/> Vista previa del video </AlertDialogTitle>
                    <AlertDialogDescription>
                        <ReactPlayer
                            url={url}
                            playing={true}
                            controls={true}
                            width="100%"
                            height="350px"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-ytred rounded-xl" onClick={onClose}>Cerrar <XIcon /></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default YoutubePlayer;