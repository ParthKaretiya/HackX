import { Shield, History, Menu, X, ScanSearch, Users, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLink = (path: string, label: string, Icon?: typeof Shield) => {
    const active = location.pathname === path;
    return (
      <Link
        to={path}
        className={`relative flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-primary ${active ? 'text-primary' : 'text-muted-foreground'
          }`}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {label}
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-[21px] left-0 h-1 w-full rounded-t-full bg-primary"
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[hsl(220,80%,50%)] shadow-lg shadow-primary/20"
          >
            <BrandLogo className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
            PulseGuard
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLink('/', 'Home')}
          {navLink('/scanner', 'Scanner', ScanSearch)}
          {navLink('/history', 'History', History)}
          {navLink('/family', 'Family Setup', Users)}
          {navLink('/cyber-cell', 'Cyber Cell', Shield)}
        </div>

        {/* User / Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 group">
                <div className="h-9 w-9 rounded-full bg-secondary border-2 border-primary/20 flex items-center justify-center transition-all group-hover:border-primary">
                  <User className="h-4 w-4 text-foreground group-hover:text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground leading-none">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground capitalize leading-relaxed w-full text-right">{user.role}</span>
                </div>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="rounded-xl font-semibold">
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild className="rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all">
                <Link to="/auth?mode=register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {!user && (
            <Button size="sm" asChild className="rounded-xl shadow-md h-8 text-xs">
              <Link to="/auth?mode=register">Get Started</Link>
            </Button>
          )}
          <button
            className="text-foreground p-2 rounded-lg bg-secondary/50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {[
                { path: '/', label: 'Home', icon: Shield },
                { path: '/scanner', label: 'Scanner', icon: ScanSearch },
                { path: '/history', label: 'History', icon: History },
                { path: '/family', label: 'Family Setup', icon: Users },
                { path: '/cyber-cell', label: 'Cyber Cell', icon: Shield }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'
                    }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}

              <div className="h-[1px] bg-border my-2 w-full" />

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold hover:bg-secondary text-foreground flex items-center gap-3"
                  >
                    <User className="h-5 w-5 text-primary" />
                    Profile ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 w-full rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 text-left flex items-center gap-3"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button variant="outline" asChild className="rounded-xl w-full" onClick={() => setMobileOpen(false)}>
                    <Link to="/auth">Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
