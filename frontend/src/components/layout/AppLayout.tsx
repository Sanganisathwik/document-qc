import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  LayoutDashboard, 
  Settings, 
  Search,
  Bell,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useQCStore } from '@/stores/qc-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'QC Inbox', href: '/', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: LayoutDashboard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, filters, setFilter } = useQCStore();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--primary)/0.15),transparent),radial-gradient(800px_400px_at_10%_20%,hsl(var(--accent)/0.12),transparent),radial-gradient(800px_400px_at_90%_80%,hsl(var(--chart-3)/0.12),transparent)]" />
      </div>
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-surface border-r border-border transition-all duration-200",
          sidebarOpen ? "w-56" : "w-14"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <span className="font-semibold text-foreground tracking-tight">DocQC</span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="p-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded-lg bg-accent/50 p-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">12</span> documents need attention
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-200",
        sidebarOpen ? "ml-56" : "ml-14"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-14 border-b border-border bg-surface/70 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search documents..." 
                  className="pl-9 bg-background border-border h-9"
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">SK</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
