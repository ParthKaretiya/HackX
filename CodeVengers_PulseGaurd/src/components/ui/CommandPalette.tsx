import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ScanSearch, History, Users, Shield, LogIn, Home, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const go = useCallback((path: string) => {
    navigate(path);
    onClose();
  }, [navigate, onClose]);

  const commands: Command[] = [
    { id: 'home', label: 'Go Home', description: 'Landing page', icon: Home, action: () => go('/'), category: 'Navigation' },
    { id: 'scanner', label: 'Open Scanner', description: 'Scan URLs, messages, QR codes', icon: ScanSearch, action: () => go('/scanner'), category: 'Navigation' },
    { id: 'history', label: 'View History', description: 'All past scan results', icon: History, action: () => go('/history'), category: 'Navigation' },
    { id: 'family', label: 'Family Setup', description: 'Configure parent/child accounts', icon: Users, action: () => go('/family'), category: 'Navigation' },
    { id: 'cybercell', label: 'Cyber Cell', description: 'Report cybercrime', icon: Shield, action: () => go('/cyber-cell'), category: 'Navigation' },
    ...(user ? [
      { id: 'profile', label: 'My Profile', description: `Signed in as ${user.name}`, icon: LogIn, action: () => go('/profile'), category: 'Account' },
      { id: 'logout', label: 'Sign Out', description: 'Log out of your account', icon: LogIn, action: async () => { await logout(); navigate('/'); onClose(); }, category: 'Account' },
    ] : [
      { id: 'login', label: 'Sign In', description: 'Access your account', icon: LogIn, action: () => go('/auth'), category: 'Account' },
    ]),
  ];

  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) { setQuery(''); setSelectedIndex(0); }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[selectedIndex]) { filtered[selectedIndex].action(); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selectedIndex, onClose]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[9999] w-full max-w-lg"
          >
            <div className="glass-card rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-medium"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-muted-foreground bg-white/5 rounded-md border border-white/10">ESC</kbd>
              </div>

              {/* Commands */}
              <div className="max-h-72 overflow-y-auto p-2">
                {Object.keys(grouped).length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">No commands found</div>
                ) : (
                  Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{category}</div>
                      {cmds.map(cmd => {
                        const idx = flatIndex++;
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${isSelected ? 'bg-primary/15 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                              <cmd.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate">{cmd.label}</div>
                              {cmd.description && <div className="text-xs text-muted-foreground truncate">{cmd.description}</div>}
                            </div>
                            {isSelected && <ArrowRight className="h-4 w-4 text-primary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/5 text-[10px] text-muted-foreground font-medium">
                <span><kbd className="font-bold">↑↓</kbd> navigate</span>
                <span><kbd className="font-bold">↵</kbd> open</span>
                <span><kbd className="font-bold">esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
