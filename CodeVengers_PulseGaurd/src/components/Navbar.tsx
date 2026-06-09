import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Shield, Menu, X, LogOut, Scan, History, Users, Sun, Moon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isHome = location.pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
              <Shield className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              {t('app_name')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`relative flex items-center gap-2 text-[15px] font-semibold transition-colors py-2 px-1 ${isHome ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}>
              {t('home')}
              {isHome && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </Link>
            <Link to="/scanner" className={`relative flex items-center gap-2 text-[15px] font-semibold transition-colors py-2 px-1 ${location.pathname === '/scanner' ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}>
              <Scan className="h-4 w-4" /> {t('scanner')}
              {location.pathname === '/scanner' && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </Link>
            <Link to="/history" className={`relative flex items-center gap-2 text-[15px] font-semibold transition-colors py-2 px-1 ${location.pathname === '/history' ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}>
              <History className="h-4 w-4" /> {t('history')}
              {location.pathname === '/history' && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </Link>
            <Link to="/family" className={`relative flex items-center gap-2 text-[15px] font-semibold transition-colors py-2 px-1 ${location.pathname.includes('/family') ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}>
              <Users className="h-4 w-4" /> {t('family_setup')}
              {location.pathname.includes('/family') && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </Link>
            <Link to="/cyber-cell" className={`relative flex items-center gap-2 text-[15px] font-semibold transition-colors py-2 px-1 ${location.pathname === '/cyber-cell' ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}>
              <Shield className="h-4 w-4" /> {t('cyber_cell')}
              {location.pathname === '/cyber-cell' && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageToggle />
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-border pl-5">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center border border-border group-hover:border-blue-500 transition-colors">
                    <User className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[13px] font-semibold text-foreground leading-tight group-hover:text-blue-500 transition-colors">{user.name || user.email?.split('@')[0] || 'User'}</span>
                    <span className="text-[10px] text-muted-foreground capitalize leading-tight">{user.role}</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                  title={t('logout') || 'Sign Out'}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-border pl-5">
                <Link
                  to="/auth"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/auth"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:scale-105 transition-transform"
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden h-10 w-10 flex items-center justify-center text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 text-lg font-semibold text-foreground">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-border/50">{t('home')}</Link>
              <Link to="/scanner" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-border/50 flex items-center gap-3">
                <Scan className="h-5 w-5" /> {t('scanner')}
              </Link>
              <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-border/50 flex items-center gap-3">
                <History className="h-5 w-5" /> {t('history')}
              </Link>
              <Link to="/family" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-border/50 flex items-center gap-3">
                <Users className="h-5 w-5" /> {t('family_setup')}
              </Link>
              <Link to="/cyber-cell" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-border/50 flex items-center gap-3">
                <Shield className="h-5 w-5" /> {t('cyber_cell')}
              </Link>

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-border/50 flex items-center gap-3">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="py-2 text-destructive flex items-center gap-3 text-left">
                    <LogOut className="h-5 w-5" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl bg-secondary text-foreground text-center"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl bg-foreground text-background text-center"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
