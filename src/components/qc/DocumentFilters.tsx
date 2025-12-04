import { useQCStore } from '@/stores/qc-store';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { DocumentStatus, DocumentPriority } from '@/lib/types';

const statusOptions: { value: DocumentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In Review' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'escalated', label: 'Escalated' },
];

const priorityOptions: { value: DocumentPriority | 'all'; label: string }[] = [
  { value: 'all', label: 'All priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const dateRangeOptions = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
];

export function DocumentFilters() {
  const { filters, setFilter, resetFilters } = useQCStore();

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    filters.dateRange !== 'all';

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select 
        value={filters.status} 
        onValueChange={(value) => setFilter('status', value as DocumentStatus | 'all')}
      >
        <SelectTrigger className="w-[140px] h-9 bg-surface">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={filters.priority} 
        onValueChange={(value) => setFilter('priority', value as DocumentPriority | 'all')}
      >
        <SelectTrigger className="w-[140px] h-9 bg-surface">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {priorityOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={filters.dateRange} 
        onValueChange={(value) => setFilter('dateRange', value as 'today' | 'week' | 'month' | 'all')}
      >
        <SelectTrigger className="w-[130px] h-9 bg-surface">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          {dateRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="h-9 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
