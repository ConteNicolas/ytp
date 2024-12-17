import { LoadingSpinner } from "@renderer/components/LoadingSpinner";
import { Button } from "@renderer/components/ui/button";
import { Progress } from "@renderer/components/ui/progress";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@renderer/components/ui/table";
import { useLoading } from "@renderer/contexts/LoadingContext";
import { HardDriveIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Pendrive = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [pendrivePath, setPendrivePath] = useState<string>("");
    const [usedSpace, setUsedSpace] = useState<number>(0);
    const [totalSpace, setTotalSpace] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [progressColor, setProgressColor] = useState<string>("text-slate-500");

    const { startLoading, stopLoading, isLoading } = useLoading();

    useEffect(() => {
        const getFiles = async () => {
            startLoading();
            if (!files.length) {
                const pendriveInfo = await window.pendrive.getPendriveInformation();
                console.log(pendriveInfo);
                setFiles(pendriveInfo.files);
                const usedSpaceMB = parseFloat(pendriveInfo.usedSpace);
                const totalSpaceMB = parseFloat(pendriveInfo.totalSpace);
                setUsedSpace(usedSpaceMB);
                setTotalSpace(totalSpaceMB);
                setProgress(usedSpaceMB / totalSpaceMB * 100);

                if (usedSpaceMB / totalSpaceMB < 0.5) {
                    setProgressColor("[&>*]:bg-green-700");
                } else if (usedSpaceMB / totalSpaceMB < 0.8) {
                    setProgressColor("[&>*]:bg-orange-700");
                } else {
                    setProgressColor("[&>*]:bg-red-700");
                }
            }
            stopLoading();
        };

        getFiles();

        const getPendrivePath = async () => {
            if (!pendrivePath) {
                const path = await window.setting.getSettingValue("pendrive_path");
                setPendrivePath(path);
            }
        };

        getPendrivePath();

    }, []);

    const handleDelete = async (name: string, extension: string) => {
        startLoading();
        const file = `${name}${extension}`;
        await window.pendrive.deletePendriveItem(file);

        setFiles(files.filter(x => x.name !== name));

        stopLoading();
    }

    const handleClearPendrive = async () => {
        startLoading();
        await window.pendrive.clearPendrive();
        setFiles([]);
        stopLoading();
    }


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full h-[95%]">
            <div className="w-full h-[10%] flex">
                <div className="w-full h-full flex flex-row">
                    <div className="w-[70%] h-full flex flex-col justify-end items-start px-8">
                        <span className="text-sm flex flex-row text-slate-700 font-bold">
                            <HardDriveIcon size={18} className="mr-2" />{pendrivePath} Espacio utilizado {usedSpace} MB de {totalSpace} MB
                        </span>
                        <Progress value={progress} className={`${progressColor} bg-slate-400 w-full mt-1`} />
                    </div>             
                    <div className="w-[30%] h-full flex flex-row justify-start items-end">
                        <Button className="bg-ytred text-white rounded-full" onClick={handleClearPendrive}>
                            <Trash2Icon /> Limpiar pendrive
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[calc(100%-15%)] p-4 flex flex-col items-center justify-start overflow-y-scroll">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Extension</TableHead>
                            <TableHead>Tamaño</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.length > 0 && files.map(x =>
                            <TableRow key={x.name}>
                                <TableCell className="w-[380px] text-ellipsis">{x.name}</TableCell>
                                <TableCell>{x.extension}</TableCell>
                                <TableCell>{x.size}</TableCell>
                                <TableCell className="text-right">
                                    <Button className="bg-ytred text-white rounded-full" onClick={() => handleDelete(x.name, x.extension)}>
                                        <Trash2Icon /> 
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                        {!files.length &&
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <span className="text-xl font-medium mt-3 ml-28">No hay canciones disponibles en el pendrive</span>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Pendrive;
