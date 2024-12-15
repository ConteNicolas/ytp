import { useEffect } from "react";


const Setting = () => {

    useEffect(() => {
        const store = window.api.getStorage();
        store.openInEditor
    }, []);

    return (
        <div className="w-full h-full">
            Setting            
        </div>
    )
}


export default Setting;