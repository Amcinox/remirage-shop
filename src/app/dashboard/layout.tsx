import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider >
            <div className="flex h-screen overflow-hidden bg-blue-300 w-full">
                <DashboardSidebar />
                <SidebarInset className="flex-1 overflow-auto">
                    <main className="flex-1 p-6 sm:p-8 ">{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

