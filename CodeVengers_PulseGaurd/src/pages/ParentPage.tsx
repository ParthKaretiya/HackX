import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import SafetyBadge from '@/components/SafetyBadge';
import { ShieldCheck, Globe, Bell, AlertTriangle, Activity, Users, Lock, TrendingUp, Eye, Clock, ArrowRight } from 'lucide-react';
import { useRequireRole, useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getParentScans, getChildren } from '@/services/api';

const MOCK_ALERTS = [
  { id: '1', time: '2 min ago', child: 'Priya', url: 'phishing-bank.xyz/login', risk: 'DANGEROUS', status: 'Blocked' },
  { id: '2', time: '15 min ago', child: 'Rohan', url: 'win-prize.click/claim', risk: 'SUSPICIOUS', status: 'Flagged' },
  { id: '3', time: '1 hr ago', child: 'Priya', url: 'youtube.com/watch', risk: 'SAFE', status: 'Allowed' },
];

const ParentPage = () => {
  useRequireRole('parent');
  const { user } = useAuth();

  const { data: scansData, isLoading: scansLoading } = useQuery({
    queryKey: ['parentScans'],
    queryFn: getParentScans,
  });

  const { data: childrenData } = useQuery({
    queryKey: ['children'],
    queryFn: getChildren,
  });

  const scans = scansData?.scans || [];
  const children = childrenData?.children || [];
  const alerts = scans.length > 0
    ? scans.slice(0, 5).map((s: any) => ({
        id: s.id,
        time: new Date(s.createdAt).toLocaleTimeString(),
        child: s.userName || 'Child',
        url: s.input,
        risk: s.riskCategory,
        status: s.riskCategory === 'SAFE' ? 'Allowed' : 'Blocked',
      }))
    : MOCK_ALERTS;

  const stats = [
    { label: 'Protected Members', value: children.length || 2, icon: Users, color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/15' },
    { label: 'Threats Blocked', value: scans.filter((s: any) => s.riskCategory === 'DANGEROUS').length || 8, icon: ShieldCheck, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/15' },
    { label: 'Alerts Today', value: scans.filter((s: any) => s.riskCategory !== 'SAFE').length || 3, icon: Bell, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/15' },
    { label: 'Total Scans', value: scans.length || 24, icon: Activity, color: 'text-violet-400', bg: 'from-violet-500/10 to-violet-600/5', border: 'border-violet-500/15' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-semibold text-primary mb-4">
            <Shield className="h-4 w-4" />
            Guardian Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-2">
            Welcome, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Guardian'}</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Your family's digital safety at a glance. All threats monitored in real time.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-5 border ${stat.border} bg-gradient-to-br ${stat.bg} card-hover`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-4xl font-display font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-amber-400" />
                </div>
                <h2 className="text-base font-display font-bold text-foreground">Recent Alerts</h2>
              </div>
              <Link to="/history" className="text-xs font-bold text-primary flex items-center gap-1 hover:text-primary/80 transition-colors">
                All logs <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {(scansLoading ? MOCK_ALERTS : alerts).map((alert: any, i: number) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className={`h-2 w-2 rounded-full shrink-0 ${alert.risk === 'SAFE' ? 'bg-emerald-400' : alert.risk === 'SUSPICIOUS' ? 'bg-amber-400' : 'bg-red-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-foreground">{alert.child}</span>
                      <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground truncate">{alert.url}</p>
                  </div>
                  <SafetyBadge category={alert.risk} size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div className="glass-card rounded-2xl border border-white/5 p-5">
              <h3 className="text-sm font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'View Family Setup', icon: Users, path: '/family', color: 'text-blue-400' },
                  { label: 'Scan a Link', icon: Globe, path: '/scanner', color: 'text-violet-400' },
                  { label: 'Scan History', icon: Activity, path: '/history', color: 'text-emerald-400' },
                  { label: 'Report Cybercrime', icon: AlertTriangle, path: '/cyber-cell', color: 'text-amber-400' },
                ].map(({ label, icon: Icon, path, color }) => (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group"
                  >
                    <Icon className={`h-4 w-4 ${color} shrink-0`} />
                    <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">{label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Safety score */}
            <div className="glass-card rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold text-foreground">Family Safety Score</span>
              </div>
              <div className="text-5xl font-display font-bold text-emerald-400 mb-2">94%</div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '94%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                />
              </div>
              <p className="text-xs text-emerald-400/70 font-medium mt-2">Excellent protection coverage</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// inline Shield import fix
import { Shield } from 'lucide-react';

export default ParentPage;
