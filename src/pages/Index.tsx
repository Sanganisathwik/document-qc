import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentTable } from '@/components/qc/DocumentTable';
import { DocumentFilters } from '@/components/qc/DocumentFilters';
import { BulkActions } from '@/components/qc/BulkActions';
import { mockDocuments } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const unresolvedCount = mockDocuments.filter(d => d.status !== 'resolved').length;

  const handleExport = () => {
    toast.success('Exporting documents to CSV...');
  };

  const handleRefresh = () => {
    toast.success('Documents refreshed');
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">QC Inbox</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {unresolvedCount} documents need attention
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <DocumentFilters />

        {/* Document table */}
        <DocumentTable documents={mockDocuments} />

        {/* Bulk actions */}
        <BulkActions />
      </div>
    </AppLayout>
  );
};

export default Index;
