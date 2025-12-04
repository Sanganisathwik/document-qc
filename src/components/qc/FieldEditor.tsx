import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DocumentField } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface FieldEditorProps {
  fields: DocumentField[];
  onFieldUpdate: (fieldId: string, value: string) => void;
}

export function FieldEditor({ fields, onFieldUpdate }: FieldEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleApplySuggestion = (field: DocumentField) => {
    if (field.suggestedFix) {
      onFieldUpdate(field.id, field.suggestedFix);
      toast.success(`Applied suggestion for ${field.label}`);
    }
  };

  return (
    <div className="space-y-1">
      {fields.map((field) => (
        <div 
          key={field.id}
          className={cn(
            "group rounded-lg border p-3 transition-all",
            field.hasError 
              ? "border-red-200 bg-red-50/50" 
              : "border-border bg-surface hover:border-border/80"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                {field.hasError ? (
                  <AlertCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                )}
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded",
                  field.confidence >= 0.9 ? "bg-emerald-100 text-emerald-700" :
                  field.confidence >= 0.7 ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {Math.round(field.confidence * 100)}%
                </span>
              </div>
              
              {editingField === field.id ? (
                <Input
                  defaultValue={field.correctedValue || field.extractedValue}
                  onBlur={(e) => {
                    onFieldUpdate(field.id, e.target.value);
                    setEditingField(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onFieldUpdate(field.id, e.currentTarget.value);
                      setEditingField(null);
                    }
                    if (e.key === 'Escape') {
                      setEditingField(null);
                    }
                  }}
                  className="h-8 font-mono text-sm"
                  autoFocus
                />
              ) : (
                <div 
                  className={cn(
                    "font-mono text-sm cursor-text px-2 py-1 rounded hover:bg-muted/50 transition-colors",
                    field.hasError && "text-red-700",
                    !field.extractedValue && "text-muted-foreground italic"
                  )}
                  onClick={() => setEditingField(field.id)}
                >
                  {field.correctedValue || field.extractedValue || 'Empty'}
                </div>
              )}

              {field.hasError && field.suggestedFix && (
                <div className="mt-2 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    Suggestion: <span className="font-mono text-foreground">{field.suggestedFix}</span>
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs text-primary hover:text-primary"
                    onClick={() => handleApplySuggestion(field)}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
