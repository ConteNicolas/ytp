import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { HardDriveIcon, HistoryIcon, SaveIcon, TrashIcon, YoutubeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Setting = () => {

    const [videoLimit, setVideoLimit] = useState(1);
    const [pendrivePath, setPendrivePath] = useState("");
    
    useEffect(() => {
        const getSettings = async () => {
            const limit = await window.setting.getSettingValue('yt_limit');
            const path = await window.setting.getSettingValue('pendrive_path');

            setVideoLimit(Number(limit));
            setPendrivePath(path);
        }

        getSettings();

    }, []);

    const handleChangePendrivePath = async () => {
        const path = await window.pendrive.selectPendrivePath();

        if (path) {
            setPendrivePath(path);
            toast.success("Ruta cambiada");
        } else {
            toast.warning("Ruta invalida");
        }
    }

    const handleSavePath = async () => {
        const pathSaved = await window.setting.getSettingValue('pendrive_path');

        if (!pendrivePath || pendrivePath === pathSaved) {
            toast.warning("Ruta invalida");
            return;
        }

        await window.setting.setSetting('pendrive_path', pendrivePath);

        toast.success("Cambios guardados");
    }

    const handleSaveYoutubeLimit = async () => {
        const limitSaved = await window.setting.getSettingValue('yt_limit');

        if (!videoLimit || videoLimit === limitSaved) {
            toast.warning("Limite invalido");
            return;
        }

        await window.setting.setSetting('yt_limit', videoLimit);

        toast.success("Cambios guardados");
    }

    const handleClearHistory = async () => {
        await window.userHistory.clearHistory();

        const result = await window.userHistory.getHistory();

        if (!result.length) {
            toast.success("Historial borrado");
        } else {
            toast.error("Hubo un error al borrar el historial");
        }
    }

    return (
        <div className="w-full h-[95%] flex flex-col items-start justify-start p-5">

            <div className="w-full h-[120px] flex flex-col items-start justify-center mt-8">
                <h2 className="font-bold text-xl flex flex-row">Ajustes de pendrive <HardDriveIcon className="ml-2 mt-1" /> </h2>

                <div className="w-full h-auto flex flex-col items-start justify-start mt-4">
                    <span className="text-sm font-medium ml-1">Modificar ruta del pendrive</span>
                    <div className="w-full flex flex-row items-start justify-start">
                        <Input className="w-[40%] mt-2 border-slate-700 rounded-l-full" placeholder="Ruta del pendrive" value={pendrivePath} onChange={(e) => setPendrivePath(e.target.value)} />
                        <Button className="size-sm bg-ytred rounded-r-full mt-2" onClick={handleChangePendrivePath}>
                            Seleccionar ruta
                        </Button>
                    </div>

                    <div className="w-full mt-2 flex flex-row items-start justify-start">
                        <Button className="bg-ytred mt-2 text-sm rounded-full" size="sm" onClick={handleSavePath}>
                            <SaveIcon /> Guardar cambios
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full h-[120px] flex flex-col items-start justify-center mt-24">
                <hr className="w-full border-slate-700" />
                <h2 className="font-bold text-xl flex flex-row mt-2">Ajustes de Youtube <YoutubeIcon className="ml-2 mt-1" /> </h2>

                <div className="w-full h-auto flex flex-col items-start justify-start mt-4">
                    <span className="text-sm font-medium ml-1">Modificar limite de videos</span>
                    <div className="w-full flex flex-col items-start justify-start">
                        <Input type="number" min="1" max="100" className="w-[40%] mt-2 border-slate-700 rounded-full" placeholder="Limite de videos" value={videoLimit} onChange={(e) => setVideoLimit(Number(e.target.value))} />
                        <span className="text-slate-500 ml-2 mt-1 font-normal text-sm">Nota: El limite de videos puede afectar al rendimiento de la aplicación</span>
                    </div>
                    <div className="w-full mt-2 flex flex-row items-start justify-start">
                        <Button className="bg-ytred mt-2 text-sm rounded-full" size="sm" onClick={handleSaveYoutubeLimit}>
                            <SaveIcon />Guardar cambios
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full h-[120px] flex flex-col items-start justify-center mt-14">
                <hr className="w-full border-slate-700" />
                <h2 className="font-bold text-xl flex flex-row mt-2">Ajustes de historial <HistoryIcon className="ml-2 mt-1" /> </h2>

                <div className="w-full h-auto flex flex-col items-start justify-start mt-1">
                    <Button className="bg-ytred mt-2 text-sm rounded-full" size="sm" onClick={handleClearHistory}>
                        <TrashIcon /> Limpiar historial
                    </Button>
                </div>
            </div>

        </div>
    )
}


export default Setting;