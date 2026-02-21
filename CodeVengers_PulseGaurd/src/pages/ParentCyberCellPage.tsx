import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, Activity, Network, Tags, Clock, FileText, Mail, Download, Ban, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

const ParentCyberCellPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const threatLevel: 'normal' | 'elevated' | 'critical' = 'critical';

  const metrics = useMemo(
    () => ({
      repeatedRiskCount: 7,
      repeatedRiskDelta: 18,
      domainClusters: [{ domain: 'secure-banklogin.xyz', count: 4 }, { domain: 'free-prizes.click', count: 3 }],
      tagClusters: [{ tag: 'Prize Scam', count: 5 }, { tag: 'OTP', count: 3 }, { tag: 'Urgency', count: 4 }],
      spikeDetectionScore: 82,
    }),
    [],
  );

  const decision = useMemo(() => {
    const manyHighRisk = metrics.repeatedRiskCount > 5;
    const sameDomain = metrics.domainClusters.some((d) => d.count >= 3);
    const repeatedTag = metrics.tagClusters.some((t) => t.count >= 3);
    const shouldEscalate = manyHighRisk && (sameDomain || repeatedTag);
    return {
      shouldEscalate,
      reason: shouldEscalate
        ? 'Multiple high‑risk attempts with repeated domains/tags in 24h window.'
        : 'Monitoring shows no escalation thresholds met at this time.',
    };
  }, [metrics]);

  const banner = {
    normal: {
      className: 'border-safe/40 bg-safe/10 text-safe shadow-[0_0_30px_rgba(34,197,94,0.2)]',
      text: 'Environment normal',
      detail: 'No unusual patterns detected.',
    },
    elevated: {
      className: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.2)]',
      text: 'Elevated activity detected',
      detail: 'Increase in suspicious patterns observed.',
    },
    critical: {
      className: 'border-red-500/50 bg-red-500/20 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]',
      text: 'Critical threat level',
      detail: 'Repeated High‑Risk Prize Scam Links Detected in Last 24 Hours',
    },
  }[threatLevel];

  const [reportOpen, setReportOpen] = useState(false);

  const backLink = useMemo(() => {
    if (!user) return '/';
    if (user.role === 'parent') return '/parent-dashboard';
    if (user.role === 'child') return '/child-dashboard';
    return '/profile';
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg pb-20">
      <ParticleBackground />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

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
              <Link
                to={backLink}
                className="flex items-center gap-4 rounded-full px-5 py-4 text-sm font-bold transition-all duration-300 text-muted-foreground hover:bg-white/5 hover:text-white hover:scale-105 border border-transparent hover:border-white/10"
              >
                <ArrowLeft className="h-5 w-5" /> Back
              </Link>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center gap-4 rounded-full px-5 py-4 text-sm font-bold transition-all duration-300 bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105">
                <AlertTriangle className="h-5 w-5" /> Cyber Cell
              </div>
            </nav>
          </motion.aside>

          {/* Main Area */}
          <main className="lg:col-span-4 space-y-12">
            <motion.header variants={itemVariants} className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end p-8 glass-panel bg-black/20 border border-white/5 rounded-[3rem]">
              <div>
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-red-500 to-orange-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                  Cyber Intelligence Node
                </h1>
                <p className="mt-4 text-lg font-medium text-muted-foreground max-w-2xl">
                  Advanced behavioral analysis engine actively tracing coordinated threat patterns and malicious network structures.
                </p>
              </div>
            </motion.header>

            {/* Banner */}
            <motion.div variants={itemVariants}>
              <div className={`rounded-[2rem] p-8 glass-panel transition-all overflow-hidden relative \${banner.className}`}>
              <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-red-500/20 blur-2xl top-0 right-0 w-full h-full pointer-events-none" />
              <div className="flex items-center gap-6 relative z-10">
                <div className={`p-5 rounded-2xl \${threatLevel === 'critical' ? 'bg-red-500/20 animate-pulse border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-white/10'}`}>
                <AlertTriangle className={`h-10 w-10 \${threatLevel === 'critical' ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : ''}`} />
              </div>
              <div>
                <div className="text-3xl font-black">{banner.text}</div>
                <div className="text-lg font-bold opacity-90 mt-1 uppercase tracking-widest">{banner.detail}</div>
              </div>
            </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Activity className="h-6 w-6 text-red-500 animate-pulse" />
          </div>
          Behavioral Analysis Vectors
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div whileHover={{ y: -10, scale: 1.02 }} className="glass-panel border-white/5 bg-black/40 rounded-[2.5rem] p-8 transition-all shadow-xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#3b82f6]">
              <Activity className="h-5 w-5 text-[#3b82f6]" /> Repeated Risk
            </div>
            <div className="text-5xl font-black text-white mb-4 drop-shadow-md">{metrics.repeatedRiskCount}</div>
            <div className="flex items-center justify-between text-xs font-black">
              <span className="rounded-xl bg-red-500/20 border border-red-500/30 shadow-inner px-3 py-1.5 text-red-400">+{metrics.repeatedRiskDelta}%</span>
              <span className="text-muted-foreground uppercase tracking-widest">24h trend</span>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -10, scale: 1.02 }} className="glass-panel border-white/5 bg-black/40 rounded-[2.5rem] p-8 transition-all shadow-xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#3b82f6]">
              <Network className="h-5 w-5 text-[#3b82f6]" /> Domain Cluster
            </div>
            <div className="text-5xl font-black text-white mb-4 drop-shadow-md">{metrics.domainClusters.length}</div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-black shadow-inner">
              <div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all" style={{ width: `\${Math.min(metrics.domainClusters.length * 20, 100)}%` }} />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -10, scale: 1.02 }} className="glass-panel border-white/5 bg-black/40 rounded-[2.5rem] p-8 transition-all shadow-xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#3b82f6]">
              <Tags className="h-5 w-5 text-[#3b82f6]" /> Tag Closeness
            </div>
            <div className="text-5xl font-black text-white mb-4 drop-shadow-md">{metrics.tagClusters.length}</div>
            <div className="flex items-center justify-between text-xs font-black">
              <span className="rounded-xl bg-white/10 border border-white/10 shadow-inner px-3 py-1.5 text-white">+12% Match</span>
              <span className="text-muted-foreground uppercase tracking-widest">7d Check</span>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -10, scale: 1.02 }} className="glass-panel border-white/5 bg-black/40 rounded-[2.5rem] p-8 transition-all shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertTriangle className="w-24 h-24 text-red-500" />
            </div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#3b82f6] relative z-10">
              <Clock className="h-5 w-5 text-[#3b82f6]" /> Spike Risk
            </div>
            <div className="text-5xl font-black text-white mb-4 drop-shadow-md relative z-10">{metrics.spikeDetectionScore} <span className="text-2xl text-muted-foreground">/100</span></div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-black shadow-inner relative z-10">
              <div className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-all" style={{ width: `\${metrics.spikeDetectionScore}%` }} />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pattern Intelligence Engine Visualization */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-black text-foreground">Pattern Intelligence Matrix</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { tag: 'Prize Scam', count: 5, riskLevel: 'High' as const, domainSimilarity: 80 },
            { tag: 'OTP Request', count: 3, timeWindow: 'Under 2h', riskLevel: 'Suspicious' },
            { tag: 'Urgency Language', count: 4, riskLevel: 'Medium' as const, domainSimilarity: 45 },
            { tag: 'Fake Free Gift', count: 2, timeWindow: 'Active', riskLevel: 'Low' },
          ].map((c, i) => {
            const high = c.riskLevel === 'High';
            return (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={i}
                className={`relative overflow-hidden rounded-[2.5rem] p-8 shadow-xl \${high ? 'border border-red-500/40 bg-red-500/10 backdrop-blur-3xl' : 'glass-panel border-white/10 bg-black/40'}`}
                    >
          {high && <div className="absolute top-0 left-0 w-2 h-full bg-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,1)]" />}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className={`text-2xl font-black flex items-center gap-3 \${high ? 'text-red-500 drop-shadow-md' : 'text-white'}`}>
              {high && <AlertTriangle className="h-6 w-6 text-red-500" />}
              {c.tag}
            </div>
            {c.riskLevel && (
              <div className={`mt-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest \${high ? 'text-red-400' : 'text-orange-400'}`}><div className={`w-2 h-2 rounded-full \${high ? 'bg-red-500 animate-ping' : 'bg-orange-500'}`}/> Threat: {c.riskLevel}</div>
                          )}
          {'timeWindow' in c && c.timeWindow && (
            <div className="mt-2 text-xs font-black text-white/50 uppercase tracking-widest">Window: {c.timeWindow}</div>
          )}
        </div>
        <div className="rounded-2xl bg-black shadow-inner border border-white/10 px-6 py-4 font-black text-3xl text-white">{c.count}</div>
    </div>

                      {
    'domainSimilarity' in c && c.domainSimilarity !== undefined && (
      <div>
        <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground">
          <span>Threat Cluster Similarity</span>
          <span className={high ? 'text-red-400' : 'text-orange-400'}>{c.domainSimilarity}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-black shadow-inner border border-white/5">
          <div
            className={`h-full rounded-full \${high ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-orange-500'}`}
          style={{ width: `\${c.domainSimilarity}%` }}
                            />
        </div>
      </div>
    )
  }
                    </motion.div >
                  );
                })}
              </div >
            </motion.section >

  {/* Escalation Actions */ }
  < motion.section variants = { itemVariants } className = "bg-black/40 backdrop-blur-3xl glass-panel rounded-[3rem] p-10 lg:p-14 relative overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]" >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none transform -translate-y-1/4 translate-x-1/4">
                <ShieldCheck className="w-96 h-96" />
              </div>

              <div className="mb-8 text-2xl font-black text-white">Suggested Resolution Protocol</div>
{
  decision.shouldEscalate ? (
    <div className="rounded-[2.5rem] border border-red-500/30 bg-red-500/10 p-8 shadow-inner relative z-10">
      <div className="text-red-500 text-2xl font-black tracking-tight mb-4 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
        <Ban className="h-8 w-8" /> Critical Action: Manual Escalation Review Required
      </div>
      <p className="text-lg font-bold text-white/80 leading-relaxed mb-8 max-w-3xl">{decision.reason}</p>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-2xl h-16 px-10 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)] bg-gradient-to-r from-red-600 to-red-500 text-white hover:scale-105 transition-all outline-none border-0 text-lg group overflow-hidden relative">
            <div className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out"></div>
            <FileText className="mr-3 h-6 w-6" /> Generate Official Incident Report
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl bg-black/80 backdrop-blur-3xl border-white/10 rounded-[3rem] p-0 overflow-hidden shadow-[0_30px_100px_rgba(239,68,68,0.3)]">
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 text-white text-center shadow-[0_10px_30px_rgba(239,68,68,0.5)]">
            <DialogTitle className="text-3xl font-black drop-shadow-md">Official Incident Report</DialogTitle>
            <p className="opacity-80 mt-2 font-bold tracking-widest uppercase text-xs">Ref IR-{Math.floor(Math.random() * 10000)} • System Generated</p>
          </div>
          <div className="p-8 space-y-8 text-sm">
            <div className="glass-panel border-white/5 bg-white/5 rounded-[2rem] p-6 shadow-inner">
              <div className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Incident Summary</div>
              <p className="font-bold text-white leading-relaxed text-base">Recurring high‑risk "Prize Scam" pattern with clustered domains detected in the last 24 hours.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel border-white/5 bg-white/5 rounded-[2rem] p-6 shadow-inner">
                <div className="text-xs font-black uppercase tracking-widest text-[#3b82f6] mb-4">Primary Risk Clusters</div>
                <ul className="space-y-3 font-bold text-white">
                  <li className="flex justify-between border-b pb-3 border-white/10"><span>Prize Scam</span> <span className="text-red-500 font-black">5 cases</span></li>
                  <li className="flex justify-between pt-1"><span>OTP Request</span> <span className="text-orange-500 font-black">3 cases</span></li>
                </ul>
              </div>
              <div className="glass-panel border-white/5 bg-white/5 rounded-[2rem] p-6 shadow-inner">
                <div className="text-xs font-black uppercase tracking-widest text-orange-500 mb-4">Domains Flagged</div>
                <p className="font-black font-mono text-sm break-all text-red-400">secure-banklogin.xyz</p>
                <p className="font-black font-mono text-sm break-all text-red-400 mt-2">free-prizes.click</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
              <Button variant="outline" className="rounded-2xl h-14 font-black bg-white/5 border-white/10 hover:bg-white/10 text-white"><Mail className="mr-3 h-5 w-5 text-[#3b82f6]" /> Notify</Button>
              <Button variant="outline" className="rounded-2xl h-14 font-black bg-white/5 border-white/10 hover:bg-white/10 text-white"><Download className="mr-3 h-5 w-5 text-orange-500" /> PDF</Button>
              <Button variant="outline" className="rounded-2xl h-14 font-black bg-white/5 border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/30 text-white hover:text-emerald-400 transition-colors"><Ban className="mr-3 h-5 w-5 text-emerald-400" /> Ignore</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ) : (
  <div className="rounded-[2.5rem] border border-emerald-500/30 bg-emerald-500/10 p-8 shadow-inner relative z-10">
    <div className="text-emerald-400 text-2xl font-black tracking-tight mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">Monitoring Status Active – No Action Required</div>
    <p className="text-lg font-bold text-white/80 leading-relaxed max-w-3xl">{decision.reason}</p>
  </div>
)
}
            </motion.section >

  {/* Disclaimer */ }
  < motion.section variants = { itemVariants } className = "rounded-2xl border border-white/5 bg-black/50 p-6 text-xs font-bold text-white/40 text-center tracking-widest uppercase shadow-inner" >
    PulseGuard analysis relies on behavioral trends; no network information is automatically forwarded to law enforcement or government cyber cells without explicit administrative approval.
            </motion.section >
          </main >
        </div >
      </motion.div >
    </div >
  );
};

export default ParentCyberCellPage;
