export type AuthType = 'key' | 'password';

export interface Host {
    id: string;
    name: string;
    hostname: string;
    port: number;
    username: string;
    authType: AuthType;
    identityFile?: string;
    compression: boolean;
    connectTimeout: number;
    keepAlive: boolean;
    status: 'connected' | 'disconnected' | 'error';
}

export type ForwardType = 'local' | 'remote' | 'dynamic';
export type ForwardStatus = 'running' | 'stopped' | 'error';

export interface PortForward {
    id: string;
    name: string;
    description?: string;
    hostId: string;
    type: ForwardType;
    localPort: number;
    remoteHost?: string;
    remotePort?: number;
    localHost?: string;
    status: ForwardStatus;
}

export interface AppSettings {
    sshBinaryPath: string;
    configStoragePath: string;
    autoStartTunnels: boolean;
    restartOnDisconnect: boolean;
}

export interface ForwardPreset {
    name: string;
    localPort: number;
    remoteHost: string;
    remotePort: number;
}
