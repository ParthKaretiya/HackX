import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Role } from '@/context/AuthContext';

type Mode = 'login' | 'register';

const ROLES: { value: Role; label: string; desc: string; color: string }[] = [
  { value: 'normal', label: 'Individual', desc: 'Personal protection for yourself', color: 'border-blue-500/30 hover:border-blue-500/60' },
  { value: 'parent', label: 'Guardian', desc: 'Monitor and protect your family', color: 'border-violet-500/30 hover:border-violet-500/60' },
  { value: 'child', label: 'Protected', desc: 'Stay safe under parental guidance', color: 'border-emerald-500/30 hover:border-emerald-500/60' },
];

const passwordStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', 'bg-red-500', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400'];

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>(searchParams.get('mode') === 'register' || searchParams.get('mode') === 'family' ? 'register' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('normal');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate(
      user.role === 'parent' ? '/parent-dashboard' : user.role === 'child' ? '/child-dashboard' : '/scanner'
    );
  }, [user, loading, navigate]);

  const pwScore = passwordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all required fields.'); return; }
    if (mode === 'register' && !name) { setError('Please enter your name.'); return; }

    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, role);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-16 px-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <Link to="/" className="flex items-center gap-2.5 mb-8 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-[0_0_30px_hsl(210_100%_56%/0.4)] group-hover:shadow-[0_0_40px_hsl(210_100%_56%/0.6)] transition-shadow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">PulseGuard</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === 'login' ? 'Sign in to your account to continue' : 'Start protecting yourself and your family'}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl border border-white/8 p-8"
        >
          {/* Mode toggle */}
          <div className="flex glass rounded-xl p-1 mb-8">
            {(['login', 'register'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="auth-name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="auth-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength (register only) */}
              <AnimatePresence>
                {mode === 'register' && password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= pwScore ? strengthColor[pwScore] : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Strength: <span className={`font-bold ${pwScore <= 1 ? 'text-red-400' : pwScore === 2 ? 'text-amber-400' : pwScore === 3 ? 'text-blue-400' : 'text-emerald-400'}`}>{strengthLabel[pwScore]}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Role selector (register only) */}
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-foreground mb-3">I am a...</label>
                  <div className="grid grid-cols-3 gap-3">
                    {ROLES.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`relative p-3 rounded-xl border text-left transition-all ${
                          role === r.value
                            ? 'bg-primary/10 border-primary/50 text-foreground'
                            : `bg-white/3 ${r.color} text-muted-foreground`
                        }`}
                      >
                        {role === r.value && (
                          <CheckCircle2 className="absolute top-2 right-2 h-3.5 w-3.5 text-primary" />
                        )}
                        <div className="text-xs font-bold mb-0.5">{r.label}</div>
                        <div className="text-[10px] leading-tight opacity-70">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              id="auth-submit"
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl font-bold text-white btn-primary btn-shine flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-primary font-semibold hover:underline"
            >
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </motion.div>

        {/* Back to home */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-foreground transition-colors">← Back to homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
