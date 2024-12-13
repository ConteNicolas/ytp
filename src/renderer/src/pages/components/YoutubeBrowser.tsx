import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { Search } from "lucide-react";
import React from "react";



const YoutubeBrowser = () => {
    return (
        <React.Fragment>
            <Input className="w-[75%] rounded-l-full border-slate-800 focus:border-slate-800" placeholder="Buscar video" />
            <Button className="w-[60px] rounded-r-full"><Search /></Button>
        </React.Fragment>
    )
}

export default YoutubeBrowser;