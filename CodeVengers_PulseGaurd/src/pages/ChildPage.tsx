import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { scanLink, scanContent } from '@/services/api';
import { ScanResultData } from '@/types/scan';
import { useRequireRole } from '@/context/AuthContext';
import {
  Baby,
  Search,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  ArrowLeft,
  AlertCircle,
  Bell,
  Star,
  CheckCircle2,
  LockKeyhole
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

const ChildPage = () => {
  useRequireRole('child');
  const [url, setUrl] = useState('');
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResultData | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() && !messageText.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = url.trim()
        ? await scanLink(url.trim())
        : await scanContent(messageText.trim());
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const isSafe = result?.safetyCategory === 'SAFE';
  const isBlocked = result && !isSafe;

  const score = result
    ? result.safetyCategory === 'SAFE'
      ? 92
      : result.safetyCategory === 'SUSPICIOUS'
        ? 55
        : 18
    : 0;

  const barColor =
    result?.safetyCategory === 'SAFE'
      ? 'bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]'
      : result?.safetyCategory === 'SUSPICIOUS'
        ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]'
        : 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]';

  const tags = (result?.reasons || [])
    .flatMap((r) => {
      const out: string[] = [];
      if (/otp/i.test(r)) out.push('OTP Request');
      if (/prize|win/i.test(r)) out.push('Fake Prize');
      if (/urgent|urgency|now/i.test(r)) out.push('Urgency Scarcity');
      if (/domain|impersonation/i.test(r)) out.push('Impersonation');
      return out;
    })
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg">
      <ParticleBackground />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#3b82f6]/10 blur-[130px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <Navbar />

      <section className="py-20 md:py-24 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container mx-auto px-4 text-center">
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#3b82f6] to-cyan-500 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Baby className="h-12 w-12 text-white" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="mb-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl drop-shadow-lg text-gradient">
            Protected Zone
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto max-w-xl text-xl text-muted-foreground font-medium drop-shadow-sm">
            Paste any link or message below. PulseGuard will analyze it and keep you shielded from hidden threats automatically.
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-32 relative z-10">
        <div className="container mx-auto max-w-3xl px-4">
          <AnimatePresence mode="wait">
            {!result && (
              <motion.div key="scanner" initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9, y: 50 }} variants={itemVariants} className="bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <LockKeyhole className="w-56 h-56 text-[#3b82f6]" />
                </div>

                <form onSubmit={handleScan} className="space-y-8 relative z-10">
                  <div className="space-y-3 relative group/input">
                    <label className="text-xs font-black tracking-widest text-[#3b82f6] uppercase ml-3">Target URL</label>
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com..."
                      className="h-16 rounded-[2rem] bg-white/5 text-lg border-white/10 focus-visible:ring-[#3b82f6] shadow-inner font-bold px-6 placeholder:text-muted-foreground/50 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xs font-black text-white/20 uppercase tracking-widest">
                    <div className="h-px bg-white/10 flex-1" /> OR <div className="h-px bg-white/10 flex-1" />
                  </div>

                  <div className="space-y-3 relative group/textarea">
                    <label className="text-xs font-black tracking-widest text-[#3b82f6] uppercase ml-3">Raw Message</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Paste suspicious SMS, email, or chat..."
                      className="min-h-36 w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 text-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent focus:outline-none shadow-inner font-bold resize-none transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading || (!url.trim() && !messageText.trim())}
                      size="lg"
                      className="w-full h-[4.5rem] gap-3 rounded-[2rem] text-xl font-black shadow-[0_0_30px_rgba(59,130,246,0.5)] bg-gradient-to-r from-[#3b82f6] to-cyan-400 border-0 transition-all text-white hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out"></div>
                      {loading ? (
                        <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Loader2 className="h-7 w-7" /></motion.div> Scanning Environment…</>
                      ) : (
                        <><Search className="h-7 w-7" /> Verify Safety Protocol</>
                      )}
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {loading && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 rounded-[1.5rem] bg-black/50 p-6 border border-white/5 space-y-4 shadow-inner">
                        <div className="flex items-center gap-4 text-sm font-black text-[#3b82f6] uppercase tracking-widest"><Search className="h-5 w-5 animate-pulse" /> Initiating Neural Scan</div>
                        <div className="flex items-center gap-4 text-sm font-bold text-white/70"><LockKeyhole className="h-4 w-4 animate-pulse text-[#3b82f6]/70" /> Analyzing cryptographic integrity</div>
                        <div className="flex items-center gap-4 text-sm font-bold text-white/70"><ShieldCheck className="h-4 w-4 animate-pulse text-[#3b82f6]/70" /> Verifying structural semantics</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-center text-sm font-black text-safe flex items-center justify-center gap-3 mt-8 pt-6 border-t border-white/10 uppercase tracking-widest">
                    <ShieldCheck className="h-5 w-5 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    Guardian Protocol Active
                  </p>
                </form>
              </motion.div>
            )}

            {result && isSafe && (
              <motion.div key="result-safe" initial="hidden" animate="visible" variants={containerVariants} className="space-y-10">
                <motion.div variants={itemVariants} className="rounded-[3rem] border border-safe/30 bg-safe/5 p-10 md:p-14 text-center glass-panel shadow-[0_20px_80px_rgba(34,197,94,0.15)] relative overflow-hidden backdrop-blur-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-safe/20 to-transparent opacity-50 pointer-events-none" />

                  <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.5 }} className="relative z-10 w-32 h-32 mx-auto bg-gradient-to-br from-safe/30 to-emerald-400/20 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)] border border-safe/40">
                    <CheckCircle2 className="h-16 w-16 text-safe" />
                  </motion.div>

                  <h2 className="mb-4 text-4xl font-black text-white drop-shadow-md">Verified Safe</h2>
                  <p className="mb-10 text-white/70 font-semibold text-xl">No malicious patterns detected. Zero risk profile.</p>

                  <div className="bg-black/40 rounded-[2rem] p-8 mb-10 text-left border border-white/5 shadow-inner">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#3b82f6] mb-6 drop-shadow-sm">Scan Diagnostics</h4>
                    <ul className="space-y-5">
                      {result.reasons.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-4 text-base font-bold text-white/90">
                          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-safe drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href={result.input.startsWith('http') ? result.input : '#'} target="_blank" rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-r from-emerald-500 to-emerald-400 px-10 py-5 text-xl font-black text-white shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)]">
                    Continue to Target <ExternalLink className="h-6 w-6 ml-2" />
                  </a>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel rounded-[2rem] bg-black/40 backdrop-blur-3xl p-8 border border-white/10 flex items-center gap-8 shadow-2xl">
                  <div className="flex-1">
                    <div className="mb-3 text-sm font-black uppercase tracking-widest text-[#3b82f6]">Threat Probability Base</div>
                    <div className="mb-5 text-4xl font-black text-white drop-shadow-md">Minimal</div>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-black shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `\${score}%` }} transition={{ duration: 1.5, type: "spring" }} className={`h-full rounded-full \${barColor}`} />
                    </div>
                  </div>
                  <div className="hidden sm:flex h-32 w-32 rounded-full bg-black items-center justify-center border-[6px] border-safe/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <span className="text-4xl font-black text-safe drop-shadow-md">{score}</span>
                  </div>
                </motion.div>

                <Button variant="outline" size="lg" onClick={() => { setResult(null); setUrl(''); }} className="w-full h-16 gap-3 rounded-[2rem] font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white transition-all text-xl">
                  <ArrowLeft className="h-6 w-6" /> Back to Analyzer
                </Button>
              </motion.div>
            )}

            {result && isBlocked && (
              <motion.div key="result-blocked" initial="hidden" animate="visible" variants={containerVariants} className="space-y-10">
                <motion.div variants={itemVariants} className="rounded-[3rem] border border-red-500/30 bg-red-500/5 p-10 md:p-14 text-center glass-panel shadow-[0_20px_80px_rgba(239,68,68,0.2)] relative overflow-hidden backdrop-blur-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-50 pointer-events-none" />

                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="relative z-10 w-32 h-32 mx-auto bg-gradient-to-br from-red-600/30 to-red-400/20 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(239,68,68,0.6)] border border-red-500/40">
                    <ShieldAlert className="h-16 w-16 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                  </motion.div>

                  <h2 className="mb-4 text-4xl font-black text-red-500 drop-shadow-md">Threat Intercepted</h2>
                  <p className="mb-10 text-white/80 font-bold text-xl">Access blocked globally. This entity poses a severe threat to your security.</p>

                  <div className="bg-black/60 rounded-[2rem] p-8 mb-8 text-left border border-red-500/30 shadow-inner">
                    <h4 className="text-sm font-black uppercase tracking-widest text-red-400 mb-6 flex items-center gap-3"><LockKeyhole className="h-5 w-5" /> Detected Attack Vectors:</h4>
                    <ul className="space-y-5">
                      {result.reasons.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-4 text-base font-bold text-white">
                          <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-orange-500/40 bg-orange-500/10 p-5 text-sm font-black text-orange-400 flex items-center justify-center gap-3 shadow-inner tracking-wide uppercase">
                    <Bell className="h-6 w-6 animate-pulse" /> Guardian Dashboard alert dispatched locally.
                  </div>
                </motion.div>

                {/* Score panel */}
                <motion.div variants={itemVariants} className="glass-panel rounded-[2rem] bg-black/40 backdrop-blur-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                  <div className="flex-1 w-full relative">
                    <div className="mb-3 text-sm font-black uppercase tracking-widest text-[#3b82f6]">Threat Probability Base</div>
                    <div className="mb-5 text-4xl font-black text-white drop-shadow-md">Critical Risk</div>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-black shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `\${score}%` }} transition={{ duration: 1.5, type: "spring" }} className={`h-full rounded-full \${barColor}`} />
                    </div>
                    {tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {tags.map((t) => (
                          <span key={t} className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-black text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)] uppercase tracking-widest">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-black flex items-center justify-center border-[6px] border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                      <span className="text-4xl font-black text-red-500 drop-shadow-md">{score}</span>
                    </div>
                  </div>
                </motion.div>

                <Button variant="outline" size="lg" onClick={() => { setResult(null); setUrl(''); }} className="w-full h-16 gap-3 rounded-[2rem] font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white transition-all text-xl">
                  <ArrowLeft className="h-6 w-6" /> Evaluate New Target
                </Button>
              </motion.div>
            )}

            {/* Educational Modules */}
            <motion.div variants={itemVariants} className="mt-24 pt-10 border-t border-white/10">
              <h3 className="mb-10 text-3xl font-black text-foreground flex items-center gap-4 justify-center">
                <Star className="h-8 w-8 text-[#3b82f6] animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" /> Defense Academy
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: 'The OTP Rule', desc: 'Legitimate services never ask you to share your OTP. Never text or say it to anyone.' },
                  { title: 'Unreal Prizes', desc: 'If you didn\'t enter a contest, you didn\'t win. Fake prizes steal information.' },
                  { title: 'Urgency Tricks', desc: 'Scammers use words like "Act Now" or "Account Suspended" to panic you.' },
                  { title: 'Lookalike Links', desc: 'Always check if a link says "amazon" vs "arnazon" before clicking.' },
                ].map((c) => (
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} key={c.title} className="glass-panel bg-black/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group transition-all">
                    <div className="text-xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#3b82f6] transition-all">{c.title}</div>
                    <p className="text-base font-medium text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors">{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};

export default ChildPage;
