import { useQCStore } from '@/stores/qc-store';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { toast } from 'sonner';

export function BulkActions() {
  const { selectedDocuments, clearSelection } = useQCStore();

  if (selectedDocuments.length === 0) return null;

  const handleRetry = () => {
    toast.success(`Retrying ${selectedDocuments.length} document(s)`);
    clearSelection();
  };

  const handleResolve = () => {
    toast.success(`Marked ${selectedDocuments.length} document(s) as resolved`);
    clearSelection();
  };

  const handleEscalate = () => {
    toast.success(`Escalated ${selectedDocuments.length} document(s)`);
    clearSelection();
  };

  const handleExport = () => {
    toast.success(`Exporting ${selectedDocuments.length} document(s)`);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-2 bg-foreground text-background rounded-lg px-4 py-2 shadow-lg">
        <span className="text-sm font-medium mr-2">
          {selectedDocuments.length} selected
        </span>
        
        <div className="h-4 w-px bg-background/20" />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-background hover:bg-background/10 hover:text-background"
          onClick={handleRetry}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Retry
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-background hover:bg-background/10 hover:text-background"
          onClick={handleResolve}
        >
          <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
          Resolve
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-background hover:bg-background/10 hover:text-background"
          onClick={handleEscalate}
        >
          <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
          Escalate
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-background hover:bg-background/10 hover:text-background"
          onClick={handleExport}
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export
        </Button>

        <div className="h-4 w-px bg-background/20" />

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-background hover:bg-background/10 hover:text-background"
          onClick={clearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
