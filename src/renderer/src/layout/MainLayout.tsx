import { LoadingSpinner } from "@renderer/components/LoadingSpinner";
import SidebarWrapper, { SidebarWrapperItems } from "@renderer/components/SidebarWrapper";
import { SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar";
import { Cog, DownloadCloud, HardDriveIcon, History, Home } from "lucide-react";


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
    },
    {
        text: "Pendrive",
        icon: HardDriveIcon,
        href: "/pendrive"
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
            <LoadingSpinner />
        </SidebarProvider>
    )
}

export default MainLayout;