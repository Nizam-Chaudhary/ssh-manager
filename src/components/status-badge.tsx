import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusVariant = 'connected' | 'disconnected' | 'running' | 'stopped' | 'error';

const variantStyles: Record<StatusVariant, string> = {
    connected: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    running: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    disconnected: 'bg-muted text-muted-foreground border-border',
    stopped: 'bg-muted text-muted-foreground border-border',
    error: 'bg-destructive/15 text-destructive border-destructive/20',
};

interface StatusBadgeProps {
    status: StatusVariant;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <Badge variant='outline' className={cn('capitalize', variantStyles[status], className)}>
            <span
                className={cn('mr-1.5 inline-block size-1.5 rounded-full', {
                    'bg-emerald-500': status === 'connected' || status === 'running',
                    'bg-muted-foreground': status === 'disconnected' || status === 'stopped',
                    'bg-destructive': status === 'error',
                })}
            />
            {status}
        </Badge>
    );
}
