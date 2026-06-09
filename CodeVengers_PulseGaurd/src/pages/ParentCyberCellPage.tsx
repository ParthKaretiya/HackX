import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, Activity, Network, Tags, Clock, FileText, Mail, Download, Ban, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

const ParentCyberCellPage = () => {
  const { user } = useAuth();
  const threatLevel: 'normal' | 'elevated' | 'critical' = 'critical';

  const metrics = useMemo(() => ({
    repeatedRiskCount: 7,
    repeatedRiskDelta: 18,
    domainClusters: [{ domain: 'secure-banklogin.xyz', count: 4 }, { domain: 'free-prizes.click', count: 3 }],
    tagClusters: [{ tag: 'Prize Scam', count: 5 }, { tag: 'OTP', count: 3 }, { tag: 'Urgency', count: 4 }],
    spikeDetectionScore: 82,
  }), []);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Red alert gradient background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none" />

      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 relative z-10 max-w-7xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <Link
            to={backLink}
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">
                <AlertTriangle className="h-3 w-3" /> Cyber Cell
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
                Intelligence <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">Node</span>
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground font-medium max-w-2xl text-lg">
            Advanced behavioral analysis engine actively tracing coordinated threat patterns and malicious network structures.
          </p>
        </motion.div>

        {/* Banner */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className={`rounded-2xl p-6 md:p-8 border relative overflow-hidden flex items-center gap-6 ${threatLevel === 'critical' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
            {threatLevel === 'critical' && (
              <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-red-500/20 pointer-events-none" />
            )}
            <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${threatLevel === 'critical' ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
              <AlertTriangle className={`h-7 w-7 ${threatLevel === 'critical' ? 'text-red-500' : 'text-emerald-500'}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-display font-bold mb-1 ${threatLevel === 'critical' ? 'text-red-400' : 'text-emerald-400'}`}>
                {threatLevel === 'critical' ? 'Critical Threat Level' : 'Environment Normal'}
              </h2>
              <p className="text-foreground/80 font-medium">
                {threatLevel === 'critical' ? 'Repeated High‑Risk Prize Scam Links Detected in Last 24 Hours' : 'No unusual patterns detected.'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main metrics */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section variants={itemVariants}>
              <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
                <Activity className="h-5 w-5 text-red-500" /> Behavioral Vectors
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <Activity className="h-4 w-4 text-red-400" /> Repeated Risk
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">{metrics.repeatedRiskCount}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-md">+{metrics.repeatedRiskDelta}%</span>
                    <span className="text-[10px] uppercase text-muted-foreground">24h trend</span>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <Network className="h-4 w-4 text-orange-400" /> Domain Cluster
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-4">{metrics.domainClusters.length}</div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: `${Math.min(metrics.domainClusters.length * 20, 100)}%` }} />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <Tags className="h-4 w-4 text-blue-400" /> Tag Closeness
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">{metrics.tagClusters.length}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">+12% Match</span>
                    <span className="text-[10px] uppercase text-muted-foreground">7d Check</span>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-red-500/20 bg-red-500/5 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-4">
                    <Clock className="h-4 w-4" /> Spike Risk Score
                  </div>
                  <div className="text-4xl font-display font-bold text-red-400 mb-4">{metrics.spikeDetectionScore} <span className="text-xl text-red-400/50">/100</span></div>
                  <div className="h-1.5 w-full bg-red-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${metrics.spikeDetectionScore}%` }} />
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
                <Network className="h-5 w-5 text-orange-500" /> Intelligence Matrix
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { tag: 'Prize Scam', count: 5, riskLevel: 'High', domainSimilarity: 80 },
                  { tag: 'OTP Request', count: 3, timeWindow: 'Under 2h', riskLevel: 'Suspicious' },
                  { tag: 'Urgency Language', count: 4, riskLevel: 'Medium', domainSimilarity: 45 },
                  { tag: 'Fake Free Gift', count: 2, timeWindow: 'Active', riskLevel: 'Low' },
                ].map((c, i) => {
                  const high = c.riskLevel === 'High';
                  return (
                    <div key={i} className={`rounded-2xl p-6 border ${high ? 'bg-red-500/10 border-red-500/30' : 'glass-card border-white/5'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className={`text-lg font-bold mb-1 ${high ? 'text-red-400' : 'text-foreground'}`}>
                            {c.tag}
                          </div>
                          <div className={`text-[10px] font-bold uppercase tracking-widest ${high ? 'text-red-400/80' : 'text-orange-400'}`}>
                            Threat: {c.riskLevel}
                          </div>
                        </div>
                        <div className="text-2xl font-display font-bold text-foreground bg-white/5 px-3 py-1 rounded-lg">
                          {c.count}
                        </div>
                      </div>
                      {'domainSimilarity' in c && c.domainSimilarity !== undefined && (
                        <div>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">
                            <span>Cluster Similarity</span>
                            <span className={high ? 'text-red-400' : 'text-foreground'}>{c.domainSimilarity}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${high ? 'bg-red-500' : 'bg-orange-400'}`} style={{ width: `${c.domainSimilarity}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </div>

          {/* Action Panel */}
          <motion.div variants={itemVariants}>
            <div className="glass-card rounded-2xl border border-white/10 p-6 sticky top-24">
              <h3 className="text-lg font-display font-bold text-foreground mb-6">Resolution Protocol</h3>
              
              {decision.shouldEscalate ? (
                <div className="space-y-6">
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-5">
                    <div className="text-red-400 font-bold flex items-center gap-2 mb-2">
                      <Ban className="h-5 w-5" /> Manual Escalation Required
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {decision.reason}
                    </p>
                  </div>

                  <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                    <DialogTrigger asChild>
                      <button className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all flex items-center justify-center gap-2 group">
                        <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" /> Generate Report
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl bg-black/90 backdrop-blur-xl border-white/10 rounded-2xl p-0 overflow-hidden">
                      <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white text-center">
                        <DialogTitle className="text-2xl font-display font-bold">Official Incident Report</DialogTitle>
                        <p className="opacity-80 mt-1 font-mono text-xs">Ref IR-{Math.floor(Math.random() * 10000)} • System Generated</p>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2">Incident Summary</div>
                          <p className="text-sm font-medium text-foreground leading-relaxed">Recurring high‑risk "Prize Scam" pattern with clustered domains detected in the last 24 hours.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3">Risk Clusters</div>
                            <ul className="space-y-2 text-sm font-medium">
                              <li className="flex justify-between border-b border-white/5 pb-2"><span>Prize Scam</span> <span className="text-red-400">5 cases</span></li>
                              <li className="flex justify-between"><span>OTP Request</span> <span className="text-orange-400">3 cases</span></li>
                            </ul>
                          </div>
                          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-3">Flagged Domains</div>
                            <p className="text-xs font-mono text-red-400 mb-1">secure-banklogin.xyz</p>
                            <p className="text-xs font-mono text-red-400">free-prizes.click</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                          <button className="py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold text-foreground transition-colors flex justify-center items-center gap-2"><Mail className="h-4 w-4" /> Notify</button>
                          <button className="py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold text-foreground transition-colors flex justify-center items-center gap-2"><Download className="h-4 w-4" /> PDF</button>
                          <button className="py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-sm font-bold text-foreground transition-colors flex justify-center items-center gap-2"><Ban className="h-4 w-4" /> Ignore</button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <div className="text-emerald-400 font-bold mb-2">No Action Required</div>
                  <p className="text-sm text-foreground/80">{decision.reason}</p>
                </div>
              )}

              <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-widest text-center leading-relaxed">
                PulseGuard analysis relies on behavioral trends; no network information is forwarded without explicit administrative approval.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentCyberCellPage;
