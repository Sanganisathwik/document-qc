export type DocumentStatus = 'new' | 'in_review' | 'resolved' | 'escalated';
export type DocumentPriority = 'critical' | 'high' | 'medium' | 'low';

export interface QCDocument {
  id: string;
  name: string;
  customer: string;
  status: DocumentStatus;
  priority: DocumentPriority;
  errorType: string;
  errorCount: number;
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
}

export interface DocumentField {
  id: string;
  label: string;
  extractedValue: string;
  correctedValue?: string;
  confidence: number;
  hasError: boolean;
  suggestedFix?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface FilterState {
  status: DocumentStatus | 'all';
  priority: DocumentPriority | 'all';
  customer: string;
  dateRange: 'today' | 'week' | 'month' | 'all';
  search: string;
}
