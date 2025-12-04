import { cn } from '@/lib/utils';
import { DocumentPriority } from '@/lib/types';
import { AlertTriangle, ArrowUp, Minus, ArrowDown } from 'lucide-react';

interface PriorityIndicatorProps {
  priority: DocumentPriority;
  showLabel?: boolean;
}

const priorityConfig: Record<DocumentPriority, { 
  label: string; 
  icon: typeof AlertTriangle; 
  className: string;
}> = {
  critical: { label: 'Critical', icon: AlertTriangle, className: 'text-red-600' },
  high: { label: 'High', icon: ArrowUp, className: 'text-orange-500' },
  medium: { label: 'Medium', icon: Minus, className: 'text-blue-500' },
  low: { label: 'Low', icon: ArrowDown, className: 'text-muted-foreground' },
};

export function PriorityIndicator({ priority, showLabel = false }: PriorityIndicatorProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  
  return (
    <div className={cn("flex items-center gap-1.5", config.className)}>
      <Icon className="h-3.5 w-3.5" />
      {showLabel && <span className="text-xs font-medium">{config.label}</span>}
    </div>
  );
}
