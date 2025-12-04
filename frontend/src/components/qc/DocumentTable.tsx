import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { QCDocument } from '@/lib/types';
import { useQCStore } from '@/stores/qc-store';
import { StatusBadge } from './StatusBadge';
import { PriorityIndicator } from './PriorityIndicator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, ChevronRight } from 'lucide-react';

interface DocumentTableProps {
  documents: QCDocument[];
}

export function DocumentTable({ documents }: DocumentTableProps) {
  const { selectedDocuments, toggleDocumentSelection, selectAllDocuments, clearSelection, filters } = useQCStore();

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (filters.status !== 'all' && doc.status !== filters.status) return false;
      if (filters.priority !== 'all' && doc.priority !== filters.priority) return false;
      if (filters.search && !doc.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !doc.customer.toLowerCase().includes(filters.search.toLowerCase()) &&
          !doc.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      if (filters.dateRange !== 'all') {
        const now = new Date();
        const docDate = new Date(doc.createdAt);
        switch (filters.dateRange) {
          case 'today':
            if (docDate.toDateString() !== now.toDateString()) return false;
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (docDate < weekAgo) return false;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (docDate < monthAgo) return false;
            break;
        }
      }
      
      return true;
    });
  }, [documents, filters]);

  const allSelected = filteredDocuments.length > 0 && 
    filteredDocuments.every((doc) => selectedDocuments.includes(doc.id));

  const someSelected = filteredDocuments.some((doc) => selectedDocuments.includes(doc.id));

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllDocuments(filteredDocuments.map((doc) => doc.id));
    }
  };

  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-12">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
                className={cn(someSelected && !allSelected && "data-[state=checked]:bg-primary/50")}
              />
            </TableHead>
            <TableHead className="font-medium">Document</TableHead>
            <TableHead className="font-medium">Customer</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium w-12">Priority</TableHead>
            <TableHead className="font-medium">Error</TableHead>
            <TableHead className="font-medium">Created</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            filteredDocuments.map((doc) => (
              <TableRow 
                key={doc.id} 
                className={cn(
                  "group cursor-pointer transition-colors border-border",
                  selectedDocuments.includes(doc.id) && "bg-primary/5"
                )}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedDocuments.includes(doc.id)}
                    onCheckedChange={() => toggleDocumentSelection(doc.id)}
                    aria-label={`Select ${doc.name}`}
                  />
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/document/${doc.id}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{doc.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{doc.id}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-sm">{doc.customer}</TableCell>
                <TableCell>
                  <StatusBadge status={doc.status} />
                </TableCell>
                <TableCell>
                  <PriorityIndicator priority={doc.priority} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{doc.errorType}</span>
                    {doc.errorCount > 1 && (
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium">
                        +{doc.errorCount - 1}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(doc.createdAt), 'MMM d, h:mm a')}
                </TableCell>
                <TableCell>
                  <Link to={`/document/${doc.id}`}>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
