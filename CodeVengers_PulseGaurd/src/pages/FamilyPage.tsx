import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  Baby,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

type Role = 'parent' | 'child' | null;

const FamilyPage = () => {
  const navigate = useNavigate();
  const { updateRole, role: currentRole, user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<Role>(null);

  // Parent fields
  const [parentName, setParentName] = useState(user?.name || '');
  const [childName, setChildName] = useState('');

  // Child fields
  const [kidName, setKidName] = useState(user?.name || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectRole = (r: Role) => {
    setRole(r);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (role === 'parent') {
        await new Promise(r => setTimeout(r, 600));
        await updateRole('parent');
        setStep(3);
      } else if (role === 'child') {
        await new Promise(r => setTimeout(r, 800));
        setSuccess(true);
        await new Promise(r => setTimeout(r, 800));
        await updateRole('child');
        setStep(3);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden mesh-bg pb-20">
      <ParticleBackground />
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#3b82f6]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <Navbar />

      <section className="py-16 md:py-24 relative z-10 w-full flex flex-col items-center">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-primary to-[#3b82f6] shadow-[0_0_50px_rgba(59,130,246,0.5)] transform hover:scale-110 transition-transform duration-500"
          >
            <ShieldAlert className="h-12 w-12 text-white animate-pulse" />
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl drop-shadow-xl text-gradient">
              Family Defense Configuration
            </h1>
            <p className="mx-auto max-w-xl text-xl text-muted-foreground font-medium drop-shadow-sm">
              Establish secure parental overrides or enable highly restricted child browsing sessions natively in the browser.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 relative z-20">
        <div className="container mx-auto max-w-3xl px-4 relative">
          {/* Neon Grid Glow */}
          <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 to-[#3b82f6]/10 rounded-[4rem] blur-3xl opacity-50" />

          {/* Step indicator */}
          <AnimatePresence>
            {step < 3 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                className="mb-12 flex items-center justify-center gap-4 text-sm text-white/50 relative z-10"
              >
                <motion.span whileHover={{ scale: 1.1 }} className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black transition-all shadow-lg \${step >= 1 ? 'bg-gradient-to-br from-primary to-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white/5 border border-white/10'}`}>1</motion.span>
                <div className="h-1 w-24 rounded-full overflow-hidden bg-white/5 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-primary to-[#3b82f6] transition-all duration-700 ease-in-out" style={{ width: step >= 2 ? '100%' : '0%' }} />
                </div>
                <motion.span whileHover={{ scale: 1.1 }} className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black transition-all shadow-lg \${step >= 2 ? 'bg-gradient-to-br from-primary to-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white/5 border border-white/10'}`}>2</motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Step 1 – Who are you? */}
            {step === 1 && (
              <motion.div key="step1" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-foreground tracking-tight drop-shadow-md">Select Operational Logic</h2>
                  <p className="text-muted-foreground font-medium mt-2 text-lg">Define the clearance level for this browser session.</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -10 }} whileTap={{ scale: 0.95 }}
                    onClick={() => selectRole('parent')}
                    className="group relative overflow-hidden rounded-[3rem] p-10 border border-white/10 text-center transition-all shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-3xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner group-hover:from-primary group-hover:to-blue-600 transition-all duration-500">
                        <User className="h-12 w-12 text-primary group-hover:text-white transition-colors duration-500 drop-shadow-md" />
                      </div>
                      <span className="block text-2xl font-black text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all mb-2">Guardian Profile</span>
                      <span className="text-base font-semibold text-muted-foreground group-hover:text-white/80 transition-colors">Monitor safety telemetry and configure restrictions.</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -10 }} whileTap={{ scale: 0.95 }}
                    onClick={() => selectRole('child')}
                    className="group relative overflow-hidden rounded-[3rem] p-10 border border-white/10 text-center transition-all shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-3xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 shadow-inner group-hover:from-[#3b82f6] group-hover:to-cyan-400 transition-all duration-500">
                        <Baby className="h-12 w-12 text-[#3b82f6] group-hover:text-white transition-colors duration-500 drop-shadow-md" />
                      </div>
                      <span className="block text-2xl font-black text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all mb-2">Child Profile</span>
                      <span className="text-base font-semibold text-muted-foreground group-hover:text-white/80 transition-colors">Operate inside a zero-trust safe scanning zone.</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2 – Parent Detail */}
            {step === 2 && role === 'parent' && (
              <motion.div key="step2-parent" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="bg-black/40 backdrop-blur-3xl space-y-8 rounded-[3rem] p-10 lg:p-14 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="text-center mb-10 border-b border-white/10 pb-8">
                    <h2 className="text-3xl font-black text-foreground drop-shadow-lg">Guardian Authorization</h2>
                    <p className="text-base mt-2 font-bold text-primary uppercase tracking-widest">Initialize Admin Access</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 relative group">
                      <label className="text-xs font-black text-white/50 uppercase tracking-widest ml-2 group-focus-within:text-primary transition-colors">Administrator Name</label>
                      <Input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Enter full name" required className="h-16 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary shadow-inner font-bold text-lg px-6 placeholder:text-muted-foreground/50 transition-all" />
                    </div>
                    <div className="space-y-2 relative group">
                      <label className="text-xs font-black text-white/50 uppercase tracking-widest ml-2 group-focus-within:text-primary transition-colors">Linked Child (Optional)</label>
                      <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child's identifier" className="h-16 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary shadow-inner font-bold text-lg px-6 placeholder:text-muted-foreground/50 transition-all" />
                    </div>
                    <div className="flex gap-4 pt-10 border-t border-white/5">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} size="lg" className="rounded-2xl h-16 px-8 text-white/70 font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                        <ArrowLeft className="h-5 w-5 mr-3" /> Abort
                      </Button>
                      <Button disabled={submitting} type="submit" size="lg" className="flex-1 rounded-2xl h-16 font-black text-lg shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] hover:scale-[1.02] bg-gradient-to-r from-primary to-[#3b82f6] border-0 text-white transition-all overflow-hidden relative group">
                        <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out"></div>
                        {submitting ? 'Authenticating...' : <>Grant Access <ArrowRight className="h-5 w-5 ml-3" /></>}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2 – Child Verification */}
            {step === 2 && role === 'child' && (
              <motion.div key="step2-child" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10">
                <div className="bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none scale-150 transform translate-x-1/4 -translate-y-1/4">
                    <ShieldCheck className="w-64 h-64 text-[#3b82f6]" />
                  </div>

                  <div className="relative z-10">
                    <div className="text-center mb-10 border-b border-white/10 pb-8 flex flex-col items-center">
                      <div className="p-4 bg-[#3b82f6]/10 rounded-2xl mb-4 border border-[#3b82f6]/20">
                        <ShieldCheck className="w-10 h-10 text-[#3b82f6]" />
                      </div>
                      <h2 className="text-3xl font-black text-foreground drop-shadow-lg">
                        Secure Connection Protocol
                      </h2>
                      <p className="text-base mt-2 font-bold text-[#3b82f6] uppercase tracking-widest">Verify safe tunnel identity</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2 relative group">
                        <label className="text-xs font-black text-white/50 uppercase tracking-widest ml-2 group-focus-within:text-[#3b82f6] transition-colors">Your Assigned Name</label>
                        <Input disabled={submitting || success} value={kidName} onChange={(e) => setKidName(e.target.value)} placeholder="Enter unique ID..." required className="h-16 rounded-2xl bg-white/5 border-white/10 focus-visible:ring-[#3b82f6] shadow-inner font-bold text-lg px-6 placeholder:text-muted-foreground/50 transition-all" />
                      </div>

                      <AnimatePresence>
                        {success && (
                          <motion.div initial={{ opacity: 0, height: 0, scale: 0.9 }} animate={{ opacity: 1, height: 'auto', scale: 1, marginTop: 24 }} className="rounded-2xl bg-safe/10 border border-safe/30 p-5 flex items-center justify-center gap-4 text-safe font-black shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <CheckCircle2 className="w-8 h-8" /> Connection Verified & Encrypted
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex gap-4 pt-10 border-t border-white/5">
                        <Button disabled={submitting || success} type="button" variant="outline" onClick={() => setStep(1)} size="lg" className="rounded-2xl h-16 px-8 text-white/70 font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                          <ArrowLeft className="h-5 w-5 mr-3" /> Cancel
                        </Button>
                        <Button disabled={submitting || success} type="submit" size="lg" className="flex-1 rounded-2xl h-16 font-black text-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] bg-[#3b82f6] hover:bg-blue-500 border-0 text-white transition-all overflow-hidden relative group">
                          {submitting && !success ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full mx-auto shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                          ) : success ? (
                            <span className="animate-pulse">Locking Tunnel...</span>
                          ) : (
                            <>Initialize Tunnel <ArrowRight className="h-5 w-5 ml-3" /></>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 – Success */}
            {step === 3 && (
              <motion.div key="step3" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="relative z-10 w-full">
                <div className="bg-black/60 backdrop-blur-3xl mx-auto rounded-[3rem] p-14 lg:p-20 border border-safe/30 shadow-[0_30px_100px_rgba(34,197,94,0.2)] text-center relative overflow-hidden flex flex-col items-center">

                  {/* Expanding success ripple */}
                  <motion.div initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute bg-safe/20 rounded-full w-40 h-40 pointer-events-none" />

                  <motion.div
                    initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                    className="mb-8 flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-safe/30 to-safe/10 border border-safe/40 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                  >
                    <CheckCircle2 className="h-16 w-16 text-safe" />
                  </motion.div>

                  <h2 className="mb-4 text-5xl font-black text-white drop-shadow-md">Session Locked</h2>
                  <p className="mb-12 text-xl font-medium text-safe/80 uppercase tracking-widest">Dashboard capabilities online.</p>

                  <div className="space-y-6 w-full max-w-md">
                    {role === 'parent' ? (
                      <>
                        <Button onClick={() => navigate('/parent-dashboard')} size="lg" className="w-full h-16 gap-3 rounded-2xl font-black shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:shadow-[0_0_60px_rgba(34,197,94,0.7)] transition-all hover:scale-[1.03] bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xl border-0 overflow-hidden relative group">
                          <div className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out"></div>
                          <ShieldCheck className="h-6 w-6" /> Access Guardian Panel
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/scanner')} size="lg" className="w-full h-14 gap-2 rounded-2xl font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all">
                          <ArrowLeft className="h-5 w-5" /> Return to Scanner
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => navigate('/child-dashboard')} size="lg" className="w-full h-16 gap-3 rounded-2xl font-black shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] transition-all hover:scale-[1.03] bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xl border-0 overflow-hidden relative group">
                          <div className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out"></div>
                          <Baby className="h-6 w-6" /> Load Protected View
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/scanner')} size="lg" className="w-full h-14 gap-2 rounded-2xl font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all">
                          <ArrowLeft className="h-5 w-5" /> Return to Scanner
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section >
    </div >
  );
};

export default FamilyPage;
