import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppStoreProvider } from '@/lib/store';

function RootLayout() {
    return (
        <AppStoreProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
            <TanStackRouterDevtools />
        </AppStoreProvider>
    );
}

export const Route = createRootRoute({ component: RootLayout });
