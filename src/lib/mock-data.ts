import type { AppSettings, ForwardPreset, Host, PortForward } from './types';

export const initialHosts: Host[] = [
    {
        id: '1',
        name: 'prod',
        hostname: '10.0.0.5',
        port: 22,
        username: 'ubuntu',
        authType: 'key',
        identityFile: '~/.ssh/id_rsa',
        compression: false,
        connectTimeout: 30,
        keepAlive: true,
        status: 'connected',
    },
    {
        id: '2',
        name: 'staging',
        hostname: '10.0.0.6',
        port: 22,
        username: 'ubuntu',
        authType: 'key',
        identityFile: '~/.ssh/id_rsa',
        compression: false,
        connectTimeout: 30,
        keepAlive: true,
        status: 'disconnected',
    },
    {
        id: '3',
        name: 'dev',
        hostname: '192.168.1.100',
        port: 2222,
        username: 'dev',
        authType: 'password',
        compression: true,
        connectTimeout: 15,
        keepAlive: false,
        status: 'disconnected',
    },
];

export const initialForwards: PortForward[] = [
    {
        id: '1',
        name: 'postgres-prod',
        description: 'Production PostgreSQL',
        hostId: '1',
        type: 'local',
        localPort: 5432,
        remoteHost: 'localhost',
        remotePort: 5432,
        status: 'running',
    },
    {
        id: '2',
        name: 'redis-prod',
        description: 'Production Redis',
        hostId: '1',
        type: 'local',
        localPort: 6379,
        remoteHost: 'localhost',
        remotePort: 6379,
        status: 'running',
    },
    {
        id: '3',
        name: 'vite-dev',
        description: 'Vite dev server',
        hostId: '3',
        type: 'local',
        localPort: 5173,
        remoteHost: 'localhost',
        remotePort: 5173,
        status: 'stopped',
    },
];

export const initialSettings: AppSettings = {
    sshBinaryPath: '/usr/bin/ssh',
    configStoragePath: '~/.config/port-bridge',
    autoStartTunnels: false,
    restartOnDisconnect: true,
};

export const forwardPresets: ForwardPreset[] = [
    { name: 'PostgreSQL', localPort: 5432, remoteHost: 'localhost', remotePort: 5432 },
    { name: 'Redis', localPort: 6379, remoteHost: 'localhost', remotePort: 6379 },
    { name: 'MySQL', localPort: 3306, remoteHost: 'localhost', remotePort: 3306 },
    { name: 'Kafka', localPort: 9092, remoteHost: 'localhost', remotePort: 9092 },
    { name: 'Vite', localPort: 5173, remoteHost: 'localhost', remotePort: 5173 },
    { name: 'Grafana', localPort: 3000, remoteHost: 'localhost', remotePort: 3000 },
];
