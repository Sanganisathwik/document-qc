import { QCDocument, DocumentField, Comment, DocumentStatus, DocumentPriority } from './types';

const customers = ['Acme Corp', 'TechFlow Inc', 'Global Logistics', 'DataSync Ltd', 'CloudBase'];
const errorTypes = ['Missing field', 'Invalid format', 'OCR failure', 'Template mismatch', 'Duplicate entry'];
const assignees = ['Samantha K.', 'Marcus T.', 'Elena R.', 'Unassigned'];

function randomDate(daysBack: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return date;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockDocuments(count: number): QCDocument[] {
  const statuses: DocumentStatus[] = ['new', 'in_review', 'resolved', 'escalated'];
  const priorities: DocumentPriority[] = ['critical', 'high', 'medium', 'low'];

  return Array.from({ length: count }, (_, i) => ({
    id: `DOC-${String(i + 1).padStart(5, '0')}`,
    name: `Invoice_${randomItem(['2024', '2023'])}_${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}.pdf`,
    customer: randomItem(customers),
    status: randomItem(statuses),
    priority: randomItem(priorities),
    errorType: randomItem(errorTypes),
    errorCount: Math.floor(Math.random() * 5) + 1,
    createdAt: randomDate(30),
    updatedAt: randomDate(7),
    assignee: randomItem(assignees),
  }));
}

export const mockDocuments = generateMockDocuments(50);

export const mockDocumentFields: DocumentField[] = [
  { id: '1', label: 'Invoice Number', extractedValue: 'INV-2024-001', confidence: 0.98, hasError: false },
  { id: '2', label: 'Invoice Date', extractedValue: '2024/13/01', correctedValue: '', confidence: 0.45, hasError: true, suggestedFix: '2024-01-13' },
  { id: '3', label: 'Vendor Name', extractedValue: 'Acme Corporation', confidence: 0.95, hasError: false },
  { id: '4', label: 'Total Amount', extractedValue: '$1,234.5O', correctedValue: '', confidence: 0.72, hasError: true, suggestedFix: '$1,234.50' },
  { id: '5', label: 'Tax ID', extractedValue: '12-345678', confidence: 0.88, hasError: false },
  { id: '6', label: 'Due Date', extractedValue: '', correctedValue: '', confidence: 0, hasError: true, suggestedFix: 'Manual entry required' },
  { id: '7', label: 'Line Items', extractedValue: '3 items detected', confidence: 0.91, hasError: false },
  { id: '8', label: 'Payment Terms', extractedValue: 'Net 30', confidence: 0.94, hasError: false },
];

export const mockComments: Comment[] = [
  { id: '1', author: 'Samantha K.', content: 'Date format seems off, checking with customer.', createdAt: new Date('2024-01-15T10:30:00'), isInternal: true },
  { id: '2', author: 'Marcus T.', content: 'Customer confirmed the correct date is January 13th.', createdAt: new Date('2024-01-15T14:15:00'), isInternal: true },
];

export function getDocumentById(id: string): QCDocument | undefined {
  return mockDocuments.find(doc => doc.id === id);
}
