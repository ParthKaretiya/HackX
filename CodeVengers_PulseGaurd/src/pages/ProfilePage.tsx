import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import HistoryList from '@/components/HistoryList';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, User, ShieldCheck, Clock, CheckCircle2, Baby, TrendingUp, AlertTriangle, ArrowRight, Copy } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getParentScans } from '@/services/api';

export default function ProfilePage() {
  const { user, linkChildAccount } = useAuth();
  const [childCodeInput, setChildCodeInput] = useState('');
  const [linking, setLinking] = useState(false);

  const { data: scansData, isLoading } = useQuery({
    queryKey: ['myScans', user?.uid],
    queryFn: getParentScans,
    enabled: !!user?.uid,
  });

  const scans = scansData?.scans || [];

  const safetyScore = useMemo(() => {
    if (scans.length === 0) return 100;
    const totalScore = scans.reduce((acc: number, s: any) => acc + (s.riskCategory === 'SAFE' ? 100 : s.riskCategory === 'SUSPICIOUS' ? 50 : 0), 0);
    return Math.round(totalScore / scans.length);
  }, [scans]);

  const roleLabel = useMemo(() => {
    if (!user) return '';
    return user.role === 'normal' ? 'Individual Account' : user.role === 'parent' ? 'Guardian Account' : 'Protected Child';
  }, [user]);

  const handleLinkChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childCodeInput.trim() || !linkChildAccount) return;
    setLinking(true);
    try {
      await linkChildAccount(childCodeInput.trim());
      setChildCodeInput('');
    } finally {
      setLinking(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-semibold text-primary mb-4">
            <User className="h-4 w-4" />
            Account Overview
          </div>
          <h1 className="mb-3 text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            Secure <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-lg">
            Manage your digital identity, review protection status, and configure family connections.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Identity Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Shield className="w-32 h-32" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-[0_0_30px_hsl(210_100%_56%/0.3)]">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground mb-1">
                      {user?.name || 'Guest User'}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-[11px] font-bold text-primary uppercase tracking-wider">
                      {roleLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">Email Address</p>
                      <p className="text-sm font-semibold text-foreground">{user?.email || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Score */}
            <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-emerald-400">Protection Score</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-5xl font-display font-bold text-emerald-400 mb-3">{safetyScore}%</div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${safetyScore}%` }}
                  transition={{ duration: 1, delay: 0.2, type: "spring" }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-emerald-400/70">
                Based on your {scans.length} recent threat scans.
              </p>
            </div>

            {/* Family Setup */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Family Connection
              </h3>

              {user?.role === 'child' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Share this connection code with your guardian to link your protection status.</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 block p-3 rounded-xl bg-black/40 border border-white/10 text-center font-mono font-bold text-primary tracking-widest text-lg">
                      {user.uid.split('-')[0].toUpperCase()}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(user.uid.split('-')[0].toUpperCase())}
                      className="h-full px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  {user.parentEmail ? (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Linked to {user.parentEmail}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/15 border border-amber-500/20 text-xs font-bold text-amber-400">
                      Waiting for guardian...
                    </div>
                  )}
                </div>
              )}

              {user?.role === 'parent' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Enter a child's connection code to add them to your guardian dashboard.</p>
                  <form onSubmit={handleLinkChild} className="flex gap-2">
                    <input
                      placeholder="Enter connection code..."
                      value={childCodeInput}
                      onChange={e => setChildCodeInput(e.target.value)}
                      className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 text-sm font-mono tracking-widest focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:font-sans placeholder:tracking-normal"
                      required
                    />
                    <button
                      type="submit"
                      disabled={linking || !childCodeInput.trim()}
                      className="px-4 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white transition-colors disabled:opacity-50 text-sm"
                    >
                      Link
                    </button>
                  </form>
                  {user.linkedChildren && user.linkedChildren.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Connected Accounts</p>
                      <div className="space-y-2">
                        {user.linkedChildren.map(childId => (
                          <div key={childId} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-sm font-semibold flex items-center gap-2">
                              <Baby className="h-4 w-4 text-primary" />
                              Protected Member
                            </span>
                            <span className="text-xs font-mono text-muted-foreground">{childId}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {user?.role === 'normal' && (
                <div className="text-center py-2 space-y-4">
                  <p className="text-sm text-muted-foreground">Upgrade to a Family mode to monitor children or join a guardian's dashboard.</p>
                  <Link
                    to="/family"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors text-sm font-bold text-foreground"
                  >
                    Configure Family Setup <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl border border-white/5 p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">Recent Scan Activity</h3>
                  <p className="text-sm text-muted-foreground mt-1">Your latest verified threats and safe links.</p>
                </div>
                <Link
                  to="/scanner"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors"
                >
                  New Scan
                </Link>
              </div>

              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              ) : scans.length > 0 ? (
                <div className="flex-1">
                  <HistoryList scans={scans.slice(0, 8)} compact />
                  {scans.length > 8 && (
                    <div className="mt-4 text-center">
                      <Link to="/history" className="text-sm font-bold text-primary hover:underline">
                        View all history →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-white/2 rounded-xl border border-dashed border-white/10">
                  <div className="h-14 w-14 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-2">No Scans Yet</h4>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    Start protecting your digital life by analyzing suspicious links and messages.
                  </p>
                  <Link
                    to="/scanner"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white btn-primary btn-shine"
                  >
                    Launch Scanner
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
