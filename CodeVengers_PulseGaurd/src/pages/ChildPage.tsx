import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Shield, Star, Trophy, Zap, ScanSearch, Clock, CheckCircle2, Lock, Target, ArrowRight } from 'lucide-react';
import { useRequireRole, useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  { icon: Shield, label: 'First Scan', desc: 'Completed your first threat scan', earned: true, color: 'text-blue-400', bg: 'from-blue-500/15 to-blue-600/5' },
  { icon: Star, label: 'Safety Star', desc: 'Identified 5 dangerous links', earned: true, color: 'text-amber-400', bg: 'from-amber-500/15 to-amber-600/5' },
  { icon: Zap, label: 'Quick Scan', desc: 'Scanned 10 items in a day', earned: false, color: 'text-violet-400', bg: 'from-violet-500/15 to-violet-600/5' },
  { icon: Trophy, label: 'Guardian', desc: 'Scan streak of 7 days', earned: false, color: 'text-emerald-400', bg: 'from-emerald-500/15 to-emerald-600/5' },
];

const SAFETY_TIPS = [
  'Never click links from unknown senders.',
  'Check URLs before logging in to any website.',
  'Tell an adult if you receive suspicious messages.',
  'QR codes can also lead to dangerous sites — scan first!',
];

const ChildPage = () => {
  useRequireRole('child');
  const { user } = useAuth();
  const safetyScore = 87;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          {/* Safety score ring */}
          <div className="mx-auto mb-8 relative inline-flex items-center justify-center">
            <svg className="w-36 h-36" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - safetyScore / 100) }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(210 100% 56%)" />
                  <stop offset="100%" stopColor="hsl(160 84% 39%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-foreground">{safetyScore}</span>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Safety</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3">
            Hey, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Explorer'}!</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-md mx-auto">
            You're doing great! Keep scanning suspicious links before clicking. Your guardian is watching over you.
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/20 text-sm font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Protected Mode Active
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm font-semibold text-blue-400">
              <Lock className="h-4 w-4" />
              {user?.parentEmail ? 'Linked to Guardian' : 'No Guardian Yet'}
            </div>
          </div>
        </motion.div>

        {/* Quick scan CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 to-accent/5 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <ScanSearch className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-1">Got a suspicious link?</h3>
            <p className="text-sm text-muted-foreground">Always scan before you click. It takes only 2 seconds!</p>
          </div>
          <Link
            to="/scanner"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white btn-primary btn-shine text-sm"
          >
            Scan Now <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2.5">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-display font-bold text-foreground">Achievements</h3>
            </div>
            <div className="p-4 space-y-3">
              {ACHIEVEMENTS.map((ach, i) => (
                <motion.div
                  key={ach.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    ach.earned
                      ? `bg-gradient-to-r ${ach.bg} border-white/10`
                      : 'bg-white/3 border-white/5 opacity-50'
                  }`}
                >
                  <div className={`h-9 w-9 rounded-xl ${ach.earned ? 'bg-white/10' : 'bg-white/5'} flex items-center justify-center shrink-0`}>
                    <ach.icon className={`h-5 w-5 ${ach.earned ? ach.color : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground">{ach.label}</div>
                    <div className="text-[11px] text-muted-foreground">{ach.desc}</div>
                  </div>
                  {ach.earned && <CheckCircle2 className={`h-4 w-4 ${ach.color} shrink-0`} />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Safety tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2.5">
              <Target className="h-5 w-5 text-blue-400" />
              <h3 className="text-base font-display font-bold text-foreground">Safety Tips</h3>
            </div>
            <div className="p-4 space-y-3">
              {SAFETY_TIPS.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10"
                >
                  <span className="h-6 w-6 rounded-full bg-blue-500/15 flex items-center justify-center text-[11px] font-bold text-blue-400 shrink-0">{i + 1}</span>
                  <p className="text-sm text-foreground/80 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>

            <div className="px-4 pb-4">
              <Link
                to="/history"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/8 transition-colors text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                <Clock className="h-4 w-4" />
                View My Scan History
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChildPage;
