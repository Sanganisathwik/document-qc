import { create } from 'zustand';
import { FilterState, DocumentStatus, DocumentPriority } from '@/lib/types';

interface QCStore {
  // UI State
  sidebarOpen: boolean;
  selectedDocuments: string[];
  
  // Filter State
  filters: FilterState;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  selectDocument: (id: string) => void;
  deselectDocument: (id: string) => void;
  toggleDocumentSelection: (id: string) => void;
  selectAllDocuments: (ids: string[]) => void;
  clearSelection: () => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  status: 'all',
  priority: 'all',
  customer: '',
  dateRange: 'all',
  search: '',
};

export const useQCStore = create<QCStore>((set) => ({
  sidebarOpen: true,
  selectedDocuments: [],
  filters: initialFilters,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  selectDocument: (id) => set((state) => ({
    selectedDocuments: [...state.selectedDocuments, id],
  })),

  deselectDocument: (id) => set((state) => ({
    selectedDocuments: state.selectedDocuments.filter((docId) => docId !== id),
  })),

  toggleDocumentSelection: (id) => set((state) => ({
    selectedDocuments: state.selectedDocuments.includes(id)
      ? state.selectedDocuments.filter((docId) => docId !== id)
      : [...state.selectedDocuments, id],
  })),

  selectAllDocuments: (ids) => set({ selectedDocuments: ids }),

  clearSelection: () => set({ selectedDocuments: [] }),

  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
  })),

  resetFilters: () => set({ filters: initialFilters }),
}));
