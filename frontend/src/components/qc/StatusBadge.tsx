import { Badge } from '@/components/ui/badge';
import { DocumentStatus } from '@/lib/types';
import { Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: DocumentStatus;
}

const statusConfig: Record<DocumentStatus, { label: string; variant: 'new' | 'in_review' | 'resolved' | 'escalated' }> = {
  new: { label: 'New', variant: 'new' },
  in_review: { label: 'In Review', variant: 'in_review' },
  resolved: { label: 'Resolved', variant: 'resolved' },
  escalated: { label: 'Escalated', variant: 'escalated' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className="gap-1">
      <Circle className="h-1.5 w-1.5 fill-current" />
      {config.label}
    </Badge>
  );
}
