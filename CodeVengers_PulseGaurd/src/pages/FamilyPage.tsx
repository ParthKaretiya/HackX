import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Users, Baby, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, User, ShieldAlert, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'parent' | 'child' | null;

const FamilyPage = () => {
  const navigate = useNavigate();
  const { updateRole, role: currentRole, user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<Role>(null);

  const [parentName, setParentName] = useState(user?.name || '');
  const [childName, setChildName] = useState('');
  const [kidName, setKidName] = useState(user?.name || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // If they already have a role and came here, maybe they want to switch or see status.
    // We'll let them proceed, but typically they wouldn't hit this unless upgrading.
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Navbar />

      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-primary shadow-[0_0_40px_hsl(210_100%_56%/0.3)]"
            >
              <ShieldAlert className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-foreground">
              Family <span className="text-gradient">Defense</span>
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-muted-foreground font-medium text-lg max-w-xl mx-auto">
              Establish secure parental overrides or enable highly restricted child browsing sessions natively in the browser.
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="step1" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Parent */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectRole('parent')}
                    className="group glass-card rounded-3xl p-8 border border-white/5 hover:border-primary/50 transition-all flex flex-col items-center text-center"
                  >
                    <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                      <User className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors mb-2">Guardian Profile</h3>
                    <p className="text-sm text-muted-foreground">Monitor safety telemetry, connect child accounts, and configure restrictions.</p>
                  </motion.button>

                  {/* Child */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectRole('child')}
                    className="group glass-card rounded-3xl p-8 border border-white/5 hover:border-blue-500/50 transition-all flex flex-col items-center text-center"
                  >
                    <div className="h-20 w-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                      <Baby className="h-10 w-10 text-blue-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-blue-400 transition-colors mb-2">Protected Child</h3>
                    <p className="text-sm text-muted-foreground">Operate inside a zero-trust safe scanning zone with automated blocking.</p>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2 Parent */}
            {step === 2 && role === 'parent' && (
              <motion.div key="step2-parent" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="max-w-md mx-auto">
                <div className="glass-card rounded-3xl p-8 border border-white/5">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold text-foreground">Guardian Setup</h2>
                    <p className="text-sm text-muted-foreground mt-2">Initialize administrator access</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Administrator Name</label>
                      <input
                        value={parentName}
                        onChange={e => setParentName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Child ID (Optional)</label>
                      <input
                        value={childName}
                        onChange={e => setChildName(e.target.value)}
                        placeholder="Link later if preferred"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button disabled={submitting} type="submit" className="flex-1 py-3 rounded-xl font-bold text-white btn-primary btn-shine flex items-center justify-center gap-2 disabled:opacity-50">
                        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Grant Access <ArrowRight className="h-4 w-4" /></>}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2 Child */}
            {step === 2 && role === 'child' && (
              <motion.div key="step2-child" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="max-w-md mx-auto">
                <div className="glass-card rounded-3xl p-8 border border-white/5">
                  <div className="text-center mb-8">
                    <div className="mx-auto h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20">
                      <ShieldCheck className="h-8 w-8 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground">Secure Connection</h2>
                    <p className="text-sm text-muted-foreground mt-2">Initialize safe tunnel identity</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Assigned Name</label>
                      <input
                        value={kidName}
                        onChange={e => setKidName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    
                    <AnimatePresence>
                      {success && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="h-5 w-5" /> Verified & Encrypted
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3 pt-4">
                      <button disabled={submitting || success} type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button disabled={submitting || success} type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 transition-all">
                        {submitting && !success ? <Loader2 className="h-5 w-5 animate-spin" /> : success ? 'Locking...' : <>Initialize <ArrowRight className="h-4 w-4" /></>}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 3 Success */}
            {step === 3 && (
              <motion.div key="step3" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="max-w-md mx-auto">
                <div className="glass-card rounded-3xl p-10 border border-emerald-500/20 bg-emerald-500/5 text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                    <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-2">Session Locked</h2>
                  <p className="text-sm font-bold text-emerald-400/80 uppercase tracking-widest mb-8">Capabilities Online</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate(role === 'parent' ? '/parent-dashboard' : '/child-dashboard')}
                      className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                        role === 'parent' 
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02]'
                      }`}
                    >
                      {role === 'parent' ? <><ShieldCheck className="h-5 w-5" /> Go to Dashboard</> : <><Baby className="h-5 w-5" /> Start Protected View</>}
                    </button>
                    <button
                      onClick={() => navigate('/scanner')}
                      className="w-full py-4 rounded-xl font-bold border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                    >
                      Return to Scanner
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default FamilyPage;
