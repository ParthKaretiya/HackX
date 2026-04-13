import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import HistoryList from '@/components/HistoryList';
import { ScanResultData } from '@/types/scan';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, User, ShieldCheck, Clock, CheckCircle, Baby, TrendingUp, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getParentScans } from '@/services/api';

export default function ProfilePage() {
  const { user } = useAuth();

  const { data: scansData, isLoading } = useQuery({
    queryKey: ['myScans', user?.uid],
    queryFn: getParentScans,
    enabled: !!user?.uid,
  });

  const scans = scansData?.scans || [];

  const safetyScore = useMemo(() => {
    if (scans.length === 0) return 100;
    const totalScore = scans.reduce((acc: number, s: any) => acc + (100 - s.riskScore), 0);
    return Math.round(totalScore / scans.length);
  }, [scans]);

  const roleLabel = useMemo(() => {
    if (!user) return '';
    return user.role === 'normal' ? 'Standard User' : user.role === 'parent' ? 'Parent / Guardian' : 'Child Account';
  }, [user]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg">
      <Navbar />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-3 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#3b82f6]">
            Secure Profile
          </h1>
          <p className="text-lg text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Manage your account details and review your activity
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:shadow-primary/10 transition-shadow">
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                <Shield className="w-48 h-48" />
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-[#3b82f6] shadow-lg shadow-primary/30 flex items-center justify-center border-2 border-white/20">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {user?.name || 'Guest User'}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mt-2">
                      {roleLabel}
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-border/50 w-full" />

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground group/item hover:text-foreground transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider opacity-70">Email Address</p>
                      <p className="font-medium">{user?.email || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground group/item hover:text-foreground transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider opacity-70">User Since</p>
                      <p className="font-medium">
                        {user?.createdAt ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(user.createdAt)) : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Current Safety Score</span>
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-foreground">{safetyScore}%</span>
                    <span className="text-sm font-bold text-emerald-500 mb-1.5 uppercase">Elite Protection</span>
                  </div>
                  <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${safetyScore}%` }}
                      transition={{ duration: 1, type: "spring" }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  </div>
                  <p className="mt-4 text-xs font-medium text-muted-foreground">
                    Based on your last {scans.length} safety scans and detected risk factors.
                  </p>
                </div>

                <div className="h-[1px] bg-border/50 w-full mt-2" />

                <div className="flex gap-4 mt-2">
                  <Button asChild className="rounded-xl flex-1 bg-gradient-to-r from-primary to-[#3b82f6] font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 border-0">
                    <Link to="/scanner">Launch Scanner</Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-xl flex-1 border-white/10 hover:bg-secondary/80 font-bold backdrop-blur-md">
                    <Link to="/history">Full History</Link>
                  </Button>
                </div>

                <div className="h-[1px] bg-border/50 w-full mt-2" />

                {/* Family Connection Section */}
                <div className="p-5 rounded-2xl bg-secondary/30 border border-white/10 flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Family Connection
                  </h3>

                  {user?.role === 'child' && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">Share this unique code with your parent to link your account to their dashboard.</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 block p-3 rounded-xl bg-background border border-border text-center font-mono font-bold text-primary tracking-widest text-lg">
                          {user.uid.split('-')[0].toUpperCase()}
                        </code>
                        <Button
                          variant="outline"
                          className="h-full px-4 rounded-xl font-bold bg-background hover:bg-secondary transition-colors"
                          onClick={() => {
                            navigator.clipboard.writeText(user.uid.split('-')[0].toUpperCase());
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                      {user.parentUid ? (
                        <div className="mt-2 text-xs font-bold text-safe flex items-center gap-1.5 bg-safe/10 p-2 rounded-lg">
                          <CheckCircle className="h-4 w-4" /> Connected to Guardian
                        </div>
                      ) : (
                        <div className="mt-2 text-xs font-bold text-warning-foreground flex items-center gap-1.5 bg-warning/10 p-2 rounded-lg">
                          Waiting for connection...
                        </div>
                      )}
                    </div>
                  )}

                  {user?.role === 'parent' && (
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">Enter your child's unique code to link their account and monitor their safety.</p>
                      <form
                        className="flex gap-2"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const input = (e.currentTarget.elements.namedItem('childCode') as HTMLInputElement).value;
                          if (input) {
                            await linkChildAccount(input);
                            (e.currentTarget.elements.namedItem('childCode') as HTMLInputElement).value = '';
                          }
                        }}
                      >
                        <input
                          name="childCode"
                          placeholder="Enter child code..."
                          className="flex-1 rounded-xl bg-background border border-border px-3 text-sm font-mono tracking-widest focus:ring-2 focus:ring-primary focus:outline-none"
                          required
                        />
                        <Button type="submit" className="rounded-xl font-bold shadow-md shadow-primary/20 bg-primary text-white">
                          Link Child
                        </Button>
                      </form>
                      {user.linkedChildren && user.linkedChildren.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Connected Children</p>
                          <div className="flex flex-col gap-2">
                            {user.linkedChildren.map(childId => (
                              <div key={childId} className="flex items-center justify-between bg-background p-2 px-3 rounded-lg border border-border">
                                <span className="text-sm font-semibold flex items-center gap-2">
                                  <Baby className="h-4 w-4 text-[#3b82f6]" />
                                  Linked Account
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
                    <div className="text-center py-2">
                      <p className="text-sm text-muted-foreground mb-3">Upgrade to a family role to connect accounts.</p>
                      <Button asChild variant="outline" size="sm" className="rounded-lg w-full">
                        <Link to="/family">Configure Family Setup</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel rounded-3xl p-8 h-full flex flex-col items-stretch">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Recent Activity</h3>
                  <p className="text-sm text-muted-foreground">Your last reviewed and scanned URLs.</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>

              {scans.length > 0 ? (
                <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
                  <HistoryList scans={scans} compact />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-secondary/30 rounded-2xl border border-dashed border-border/50">
                  <div className="h-16 w-16 mb-4 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">No Recent Scans</h4>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    You haven't scanned anything yet. Secure your browsing by analyzing links.
                  </p>
                  <Button asChild className="rounded-xl font-bold">
                    <Link to="/scanner">Scan Your First URL</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
