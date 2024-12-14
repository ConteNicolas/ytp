import { LucideIcon, Youtube } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";


export interface SidebarWrapperItems {
    text: string;
    icon: LucideIcon,
    href?: string
}

interface SidebarWrapperProps {
    items: SidebarWrapperItems[];
}

const SidebarWrapper = ({ items }: SidebarWrapperProps) => {
    return (
        <Sidebar className="border-r-slate-300">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-ytred"> <Youtube className="mr-1" /> Youtube to Pendrive </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-3">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.text}>
                                    <SidebarMenuButton asChild className="rounded-sm hover:bg-ytred hover:text-white">
                                        <a href={item.href}>
                                            <item.icon size={20} />
                                            <span className="font-medium">{item.text}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex items-center justify-center">
                <span className="text-sm">V.0.0.1</span>
            </SidebarFooter>
        </Sidebar>
    )
}

export default SidebarWrapper;