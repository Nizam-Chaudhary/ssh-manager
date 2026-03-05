import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

function RootLayout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
            <TanStackRouterDevtools />
        </>
    );
}

export const Route = createRootRoute({ component: RootLayout });
