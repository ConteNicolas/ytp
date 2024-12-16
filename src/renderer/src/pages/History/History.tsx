import { useEffect, useState } from "react";
import HistoryItem from "./components/HistoryItem";
import { CheckCircleIcon } from "lucide-react";

const History = () => {
    const [userHistory, setUserHistory] = useState<any[]>([]);

    useEffect(() => {
        const getUserHistory = async () => {
            if (!userHistory.length) {
                const history = await window.userHistory.getHistory();
                setUserHistory(history);
            }
        }

        getUserHistory();
              
    }, [history]);

    const handleRemove = (id: string) => {
        const newUserHistory = userHistory.filter(x => x.id !== id);

        setUserHistory(newUserHistory);
    }


    return (
        <div className="w-full h-[95%]">
            <div className="w-full h-[10%]">
                <div className="w-full h-full flex flex-row justify-start items-center">
                    <span className="text-lg flex flex-row text-slate-700 font-bold ml-6 mt-5">Historial de canciones descargadas <CheckCircleIcon size={20} className="ml-2 mt-1" /> </span> 
                </div>
            </div>

            <div className="w-full h-[calc(100%-15%)] p-4 flex flex-col items-center justify-start overflow-y-scroll">
                {userHistory.length > 0 && userHistory.map(x =>
                    <HistoryItem key={x.id} item={x} onRemove={handleRemove} />
                )}

                {!userHistory.length &&
                    <div className="w-full h-[300px] justify-center items-center flex flex-col">
                        <span className="text-xl font-medium mt-3">No hay historial disponible</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default History;