import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = document?.documentElement.classList.contains('dark');

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle} className="h-9 w-9">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme (current: {theme})</span>
    </Button>
  );
}
