import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatusBadge } from '@/components/qc/StatusBadge';
import { PriorityIndicator } from '@/components/qc/PriorityIndicator';
import { FieldEditor } from '@/components/qc/FieldEditor';
import { CommentSection } from '@/components/qc/CommentSection';
import { getDocumentById, mockDocumentFields, mockComments } from '@/lib/mock-data';
import { DocumentField, Comment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const document = getDocumentById(id || '');
  
  const [fields, setFields] = useState<DocumentField[]>(mockDocumentFields);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  if (!document) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-lg font-medium">Document not found</h2>
          <p className="text-muted-foreground text-sm mt-1">The document you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/">Back to Inbox</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleFieldUpdate = (fieldId: string, value: string) => {
    setFields(prev => prev.map(f => 
      f.id === fieldId 
        ? { ...f, correctedValue: value, hasError: false } 
        : f
    ));
  };

  const handleAddComment = (content: string, isInternal: boolean) => {
    const newComment: Comment = {
      id: String(Date.now()),
      author: 'Samantha K.',
      content,
      createdAt: new Date(),
      isInternal,
    };
    setComments(prev => [...prev, newComment]);
  };

  const handleRetry = () => {
    toast.success('Document queued for reprocessing');
  };

  const handleResolve = () => {
    toast.success('Document marked as resolved');
  };

  const handleEscalate = () => {
    toast.success('Document escalated to engineering');
  };

  const errorCount = fields.filter(f => f.hasError).length;

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">{document.name}</h1>
                <StatusBadge status={document.status} />
                <PriorityIndicator priority={document.priority} showLabel />
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="font-mono">{document.id}</span>
                <span>•</span>
                <span>{document.customer}</span>
                <span>•</span>
                <span>{format(new Date(document.createdAt), 'MMM d, yyyy h:mm a')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document viewer */}
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            {/* Viewer toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2">
                  {currentPage} / {totalPages}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm w-12 text-center">{zoom}%</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="ml-2 h-8">
                  <Download className="h-4 w-4 mr-1.5" />
                  Download
                </Button>
              </div>
            </div>
            
            {/* Document preview */}
            <div className="h-[600px] flex items-center justify-center bg-muted/20 p-8 overflow-auto">
              <div 
                className="bg-surface shadow-lg rounded border border-border p-8 max-w-md"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <div className="space-y-4">
                  <div className="h-8 w-32 bg-muted rounded" />
                  <div className="h-4 w-48 bg-muted rounded" />
                  <div className="h-px bg-border my-4" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-4/5 bg-muted rounded" />
                    <div className="h-3 w-3/4 bg-muted rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="h-2 w-16 bg-muted rounded mb-1" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                    <div>
                      <div className="h-2 w-16 bg-muted rounded mb-1" />
                      <div className="h-4 w-20 bg-red-200 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-5/6 bg-muted rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Field editor panel */}
          <div className="space-y-6">
            {/* Fields section */}
            <div className="bg-surface rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-medium">Extracted Fields</h2>
                  <p className="text-sm text-muted-foreground">
                    {errorCount > 0 ? (
                      <span className="text-red-600">{errorCount} field(s) need correction</span>
                    ) : (
                      <span className="text-emerald-600">All fields validated</span>
                    )}
                  </p>
                </div>
              </div>
              
              <FieldEditor fields={fields} onFieldUpdate={handleFieldUpdate} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleRetry}>
                <RotateCcw className="h-4 w-4 mr-1.5" />
                Retry Processing
              </Button>
              <Button variant="outline" onClick={handleResolve}>
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Mark as Correct
              </Button>
              <Button variant="outline" onClick={handleEscalate}>
                <AlertCircle className="h-4 w-4 mr-1.5" />
                Escalate
              </Button>
            </div>

            {/* Comments */}
            <div className="bg-surface rounded-lg border border-border p-4">
              <CommentSection comments={comments} onAddComment={handleAddComment} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DocumentDetail;
