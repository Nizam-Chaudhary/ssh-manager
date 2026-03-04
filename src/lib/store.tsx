import { createContext, useCallback, useContext, useState } from 'react';

import type { AppSettings, Host, PortForward } from './types';

import { initialForwards, initialHosts, initialSettings } from './mock-data';

interface AppStore {
    hosts: Host[];
    addHost: (host: Omit<Host, 'id' | 'status'>) => void;
    updateHost: (id: string, host: Partial<Host>) => void;
    deleteHost: (id: string) => void;
    duplicateHost: (id: string) => void;

    forwards: PortForward[];
    addForward: (forward: Omit<PortForward, 'id' | 'status'>) => void;
    updateForward: (id: string, forward: Partial<PortForward>) => void;
    deleteForward: (id: string) => void;
    toggleForward: (id: string) => void;

    settings: AppSettings;
    updateSettings: (settings: Partial<AppSettings>) => void;
}

const AppStoreContext = createContext<AppStore | null>(null);

let nextId = 100;

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
    const [hosts, setHosts] = useState<Host[]>(initialHosts);
    const [forwards, setForwards] = useState<PortForward[]>(initialForwards);
    const [settings, setSettings] = useState<AppSettings>(initialSettings);

    const addHost = useCallback((host: Omit<Host, 'id' | 'status'>) => {
        setHosts((prev) => [...prev, { ...host, id: String(++nextId), status: 'disconnected' }]);
    }, []);

    const updateHost = useCallback((id: string, updates: Partial<Host>) => {
        setHosts((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
    }, []);

    const deleteHost = useCallback((id: string) => {
        setHosts((prev) => prev.filter((h) => h.id !== id));
        setForwards((prev) => prev.filter((f) => f.hostId !== id));
    }, []);

    const duplicateHost = useCallback((id: string) => {
        setHosts((prev) => {
            const host = prev.find((h) => h.id === id);
            if (!host) return prev;
            return [
                ...prev,
                {
                    ...host,
                    id: String(++nextId),
                    name: `${host.name}-copy`,
                    status: 'disconnected' as const,
                },
            ];
        });
    }, []);

    const addForward = useCallback((forward: Omit<PortForward, 'id' | 'status'>) => {
        setForwards((prev) => [...prev, { ...forward, id: String(++nextId), status: 'stopped' }]);
    }, []);

    const updateForward = useCallback((id: string, updates: Partial<PortForward>) => {
        setForwards((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    }, []);

    const deleteForward = useCallback((id: string) => {
        setForwards((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const toggleForward = useCallback((id: string) => {
        setForwards((prev) =>
            prev.map((f) => {
                if (f.id !== id) return f;
                return {
                    ...f,
                    status: f.status === 'running' ? 'stopped' : 'running',
                } as PortForward;
            }),
        );
    }, []);

    const updateSettings = useCallback((updates: Partial<AppSettings>) => {
        setSettings((prev) => ({ ...prev, ...updates }));
    }, []);

    return (
        <AppStoreContext.Provider
            value={{
                hosts,
                addHost,
                updateHost,
                deleteHost,
                duplicateHost,
                forwards,
                addForward,
                updateForward,
                deleteForward,
                toggleForward,
                settings,
                updateSettings,
            }}>
            {children}
        </AppStoreContext.Provider>
    );
}

export function useAppStore() {
    const context = useContext(AppStoreContext);
    if (!context) {
        throw new Error('useAppStore must be used within AppStoreProvider');
    }
    return context;
}
