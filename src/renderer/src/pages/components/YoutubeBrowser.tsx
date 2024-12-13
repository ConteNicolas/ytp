import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { Search } from "lucide-react";
import React from "react";


const yts = require('yt-search');

const YoutubeBrowser = () => {

    const [search, setSearch] = React.useState("");

    const handleSearch = async () => {
        if (!search || !search.length) return;

        await window.api.ytSearch(search).then((data: any) => {
            console.log(data);
        });
    }

    return (
        <React.Fragment>
            <Input onChange={(e: any) => setSearch(e.target.value)} className="w-[75%] rounded-l-full border-slate-800 focus:border-slate-800" placeholder="Buscar video" />
            <Button className="w-[60px] rounded-r-full" onClick={handleSearch} ><Search /></Button>
        </React.Fragment>
    )
}

export default YoutubeBrowser;