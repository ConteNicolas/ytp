import { LoadingSpinner } from "@renderer/components/LoadingSpinner";
import SidebarWrapper, { SidebarWrapperItems } from "@renderer/components/SidebarWrapper";
import { SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar";
import { Toaster } from "@renderer/components/ui/sonner";
import { Cog, HardDriveIcon, History, Home } from "lucide-react";
import { toast } from "sonner";


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
        text: "Historial",
        icon: History,
        href: "/history"
    },
    {
        text: "Ajustes",
        icon: Cog,
        href: "/setting"
    },
    {
        text: "Pendrive",
        icon: HardDriveIcon,
        href: "/pendrive"
    }
]

window.youtube.onDownloadVideoAsMp3Response((response) => {
    if (response.success) {
        toast.success(response.message, { duration: 3000 });
    } else {
        toast.error(response.message);
    }
});

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <SidebarProvider>
            <SidebarWrapper items={items} />
            <main className="w-screen h-screen">
                <SidebarTrigger className="ml-4 mt-1" />
                { children }
            </main>
            <LoadingSpinner />
            <Toaster />
        </SidebarProvider>
    )
}

export default MainLayout;