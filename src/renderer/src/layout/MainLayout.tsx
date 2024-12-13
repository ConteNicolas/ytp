import SidebarWrapper, { SidebarWrapperItems } from "@renderer/components/SidebarWrapper";
import { SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar";
import { Cog, DownloadCloud, History, Home } from "lucide-react";


interface MainLayoutProps {
    children: React.ReactNode;
}

const items: SidebarWrapperItems[] = [
    {
        text: "Principal",
        icon: Home,
        href: "/"
    },
    {
        text: "Descargas",
        icon: DownloadCloud,
        href: "/downloads"
    },
    {
        text: "Historial",
        icon: History,
        href: "/history"
    },
    {
        text: "Ajustes",
        icon: Cog,
        href: "/settings"
    }
]

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <SidebarProvider>
            <SidebarWrapper items={items} />
            <main className="w-screen h-screen">
                <SidebarTrigger className="ml-4 mt-1" />
                { children }
            </main>
        </SidebarProvider>
    )
}

export default MainLayout;