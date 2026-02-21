import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import SafetyBadge from '@/components/SafetyBadge';
import { ShieldCheck, ArrowLeft, Clock, Globe, Bell, ChevronRight, AlertTriangle, Activity, Lock } from 'lucide-react';
import { useRequireRole } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

const mockAlerts = [
  { id: '1', time: '2 min ago', child: 'Arjun', url: 'https://secure-banklogin.xyz/verify', risk: 'DANGEROUS' as const, status: 'Blocked' },
  { id: '2', time: '15 min ago', child: 'Arjun', url: 'https://free-prizes.click/winner', risk: 'SUSPICIOUS' as const, status: 'Blocked' },
  { id: '3', time: '1 hour ago', child: 'Priya', url: 'https://en.wikipedia.org/wiki/Space', risk: 'SAFE' as const, status: 'Allowed' },
];

const ParentPage = () => {
  useRequireRole('parent');
  const location = useLocation();

  const patternCards = [
    { title: 'Prize Scam spikes', value: '5', subtitle: 'High‑risk in 24h', tone: 'dangerous' },
    { title: 'Unique phishing domains', value: '3', subtitle: 'This week', tone: 'suspicious' },
    { title: 'OTP keyword matches', value: '12', subtitle: 'Last 7 days', tone: 'warning' },
    { title: 'Urgency patterns', value: '8', subtitle: 'Past 48h', tone: 'warning' },
  ];

  const groupedByDomain = [
    { domain: 'secure-banklogin.xyz', count: 4, risk: 'dangerous' },
    { domain: 'free-prizes.click', count: 3, risk: 'suspicious' },
    { domain: 'short.link', count: 2, risk: 'warning' },
  ];

  const groupedByTags = [
    { tag: 'OTP', count: 7 },
    { tag: 'Prize', count: 5 },
    { tag: 'Urgency', count: 6 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg pb-20">
      <ParticleBackground />
      <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 lg:py-24 relative z-10"
      >
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Sidebar */}
          <motion.aside variants={itemVariants} className="lg:col-span-1">
            <nav className="glass-panel bg-black/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sticky top-28 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col gap-3">
              <div className="text-xs font-black text-white/50 uppercase tracking-widest ml-2 mb-2">Navigation</div>
              {[
                { to: '/parent-dashboard', label: 'Monitor', icon: Activity },
                { to: '/cyber-cell', label: 'Cyber Cell', icon: AlertTriangle },
              ].map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-4 rounded-full px-5 py-4 text-sm font-bold transition-all duration-300 \${active ? 'bg-gradient-to-r from-primary to-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105' : 'text-muted-foreground hover:bg-white/5 hover:text-white hover:scale-105 border border-transparent hover:border-white/10'
              }`}
                  >
              <item.icon className="h-5 w-5" />
              {item.label}
              {active && <ChevronRight className="h-4 w-4 ml-auto opacity-70" />}
            </Link>
            );
              })}
          </nav>
        </motion.aside>

        {/* Main */}
        <section className="lg:col-span-4 space-y-12">

          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end p-8 glass-panel bg-black/20 border border-white/5 rounded-[3rem]">
            <div>
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary to-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                Guardian Dashboard
              </h1>
              <p className="mt-4 max-w-xl text-lg font-medium text-muted-foreground">
                Command center for monitoring family activity, tracking risk patterns, and managing safety controls.
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Total Scans', val: '148', icon: Lock, color: 'text-foreground', bg: 'shadow-white/5' },
              { title: 'Safe Links', val: '132', icon: ShieldCheck, color: 'text-safe', bg: 'shadow-safe/20' },
              { title: 'Threats Blocked', val: '16', icon: AlertTriangle, color: 'text-dangerous', bg: 'shadow-dangerous/20' },
              { title: 'Avg Score', val: '92%', icon: Activity, color: 'text-primary', bg: 'shadow-primary/20' }
            ].map((s, i) => (
              <motion.div variants={itemVariants} whileHover={{ y: -10 }} key={i} className={`glass-panel rounded-[2.5rem] p-8 relative overflow-hidden group transition-all shadow-xl \${s.bg} border border-white/10 bg-black/40`}>
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
              <s.icon className={`w-32 h-32 \${s.color}`} />
            </div>
            <div className="text-xs font-black text-muted-foreground mb-2 uppercase tracking-widest">{s.title}</div>
            <div className={`text-5xl font-black \${s.color} drop-shadow-sm`}>{s.val}</div>
      </motion.div>
              ))}
    </motion.div>

            {/* Recent Alerts Table */ }
  <motion.div variants={itemVariants} className="glass-panel bg-black/40 backdrop-blur-3xl rounded-[3rem] p-8 lg:p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
    <div className="mb-8 flex items-center justify-between">
      <h2 className="flex items-center gap-4 text-3xl font-black text-foreground">
        <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Bell className="h-6 w-6 text-primary animate-pulse" />
        </div>
        Recent Interventions
      </h2>
    </div>
    <div className="overflow-hidden rounded-[2rem] border border-white/5 shadow-inner bg-black/50">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-8 py-5 text-left font-black text-muted-foreground tracking-widest uppercase text-xs">Time</th>
              <th className="px-8 py-5 text-left font-black text-muted-foreground tracking-widest uppercase text-xs">Profile</th>
              <th className="px-8 py-5 text-left font-black text-muted-foreground tracking-widest uppercase text-xs">Target Entity</th>
              <th className="px-8 py-5 text-left font-black text-muted-foreground tracking-widest uppercase text-xs">Risk Assessment</th>
              <th className="px-8 py-5 text-left font-black text-muted-foreground tracking-widest uppercase text-xs">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {mockAlerts.map((a) => (
              <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                <td className="whitespace-nowrap px-8 py-5 font-bold text-muted-foreground group-hover:text-white transition-colors">
                  <Clock className="mr-3 inline h-5 w-5 opacity-70" />{a.time}
                </td>
                <td className="px-8 py-5 font-black text-foreground text-base">{a.child}</td>
                <td className="max-w-[200px] truncate px-8 py-5 font-mono text-sm text-foreground/70">
                  <Globe className="mr-3 inline h-4 w-4 opacity-70" />{a.url}
                </td>
                <td className="px-8 py-5"><SafetyBadge category={a.risk} /></td>
                <td className="px-8 py-5">
                  <span className={`inline-flex items-center rounded-xl px-4 py-2 font-black shadow-sm \${a.status === 'Blocked' ? 'bg-red-500/20 text-red-500 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                  {a.status}
                </span>
              </td>
                        </tr>
                      ))}
        </tbody>
      </table>
    </div>
  </div>
            </motion.div >

  {/* Scaffolded Grids */ }
  < div className = "grid gap-8 lg:grid-cols-2" >

    {/* Scam Pattern Intelligence */ }
    < motion.div variants = { itemVariants } className = "space-y-6 glass-panel rounded-[3rem] p-8 bg-black/30 border border-white/10" >
                <h3 className="text-2xl font-black text-foreground mb-6">Behavioral Intelligence</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {patternCards.map((c, i) => (
                    <motion.div whileHover={{ scale: 1.05 }} key={i} className="glass-panel bg-black/50 rounded-[2rem] p-6 border border-white/5 shadow-lg group">
                      <div className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">{c.title}</div>
                      <div className="mb-4 text-5xl font-black text-foreground drop-shadow-md">{c.value}</div>
                      <div className={`inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-black shadow-inner \${c.tone === 'dangerous' ? 'bg-red-500/20 text-red-500' :
                          c.tone === 'suspicious' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        {c.subtitle}
                      </div>
                    </motion.div>
                  ))}
                </div >

  {/* Tag Similarity */ }
  < div className = "rounded-[2rem] border border-white/10 bg-white/5 p-6 mt-6" >
                  <div className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Active Threat Vectors</div>
                  <div className="flex flex-wrap gap-3">
                    {groupedByTags.map((t) => (
                      <motion.div whileHover={{ scale: 1.1 }} key={t.tag} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-5 py-2.5 shadow-md">
                        <span className="text-sm font-bold text-white tracking-wide">{t.tag}</span>
                        <span className="flex items-center justify-center rounded-lg bg-primary/20 px-2 py-1 text-xs font-black text-primary border border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">{t.count}</span>
                      </motion.div>
                    ))}
                  </div>
                </div >
              </motion.div >

  <motion.div variants={itemVariants} className="space-y-6 glass-panel rounded-[3rem] p-8 bg-black/30 border border-white/10 flex flex-col">
    <h3 className="text-2xl font-black text-foreground mb-2">Domain Telemetry</h3>
    <p className="text-sm font-medium text-muted-foreground mb-4">Traffic analytics mapped to risk levels.</p>

    {/* Grouped by Domain */}
    <div className="rounded-[2rem] border border-white/10 bg-black/50 p-6 shadow-inner flex-1 overflow-y-auto custom-scrollbar">
      <div className="space-y-8">
        {groupedByDomain.map((d) => (
          <div key={d.domain} className="group">
            <div className="flex items-end justify-between font-bold text-muted-foreground mb-3">
              <span className="text-white text-base tracking-tight font-mono group-hover:text-primary transition-colors">{d.domain}</span>
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg text-xs font-black">{d.count} req</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-black shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `\${Math.min(d.count * 15, 100)}%` }}
              transition={{ duration: 1.5, type: "spring" }}
              className={`h-full rounded-full shadow-lg \${d.risk === 'dangerous' ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : d.risk === 'suspicious' ? 'bg-gradient-to-r from-orange-500 to-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`}
                          />
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>

            </div >

  {/* Footer Action */ }
  < motion.div variants = { itemVariants } className = "pt-8 flex justify-center" >
    <Button asChild className="relative overflow-hidden group gap-3 rounded-full h-16 px-12 font-black shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:scale-105 bg-gradient-to-r from-primary to-[#3b82f6] border-0 text-white text-lg transition-all">
      <Link to="/scanner">
        <div className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out"></div>
        <ArrowLeft className="h-6 w-6" /> Back to Core Scanner
      </Link>
    </Button>
            </motion.div >

          </section >
        </div >
      </motion.div >
    </div >
  );
};

export default ParentPage;
