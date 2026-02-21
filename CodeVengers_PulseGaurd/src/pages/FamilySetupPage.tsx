import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Baby, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'normal' | 'parent' | 'child';

export default function FamilySetupPage() {
  const { user, role, updateRole } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [chosen, setChosen] = useState<Role>('normal');
  const [parentEmail, setParentEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!role) return;
    if (role === 'parent') navigate('/parent-dashboard', { replace: true });
    if (role === 'child') navigate('/child-dashboard', { replace: true });
  }, [role, navigate]);

  const chooseRole = (r: Role) => {
    if (r === 'parent') {
      setChosen('parent');
      setStep(2);
    } else if (r === 'child') {
      setChosen('child');
      setStep(2);
    }
  };

  const submit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      if (chosen === 'parent') {
        await updateRole('parent');
        navigate('/parent-dashboard', { replace: true });
      } else if (chosen === 'child') {
        // Mock a connection success state before redirecting
        await new Promise((res) => setTimeout(res, 800));
        setSuccess(true);
        await new Promise((res) => setTimeout(res, 800));
        await updateRole('child', parentEmail.trim() || undefined);
        navigate('/child-dashboard', { replace: true });
      }
    } finally {
      if (chosen !== 'child') setSubmitting(false);
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden mesh-bg">
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full mix-blend-screen pointer-events-none" />
      <Navbar />

      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-[#3b82f6] shadow-xl shadow-primary/25"
          >
            <Users className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
          >
            Family Integration
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="mx-auto max-w-lg text-lg text-muted-foreground"
          >
            Establish your digital household. Choose your core function to unlock automated family protection and dashboard access.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 relative z-10">
        <div className="container mx-auto max-w-2xl px-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={fadeVariants}
                initial="hidden" animate="visible" exit="exit"
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Select Primary Authorization</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => chooseRole('parent')}
                    className="glass-panel group flex flex-col items-center gap-4 rounded-3xl p-8 border border-white/10 hover:border-primary/50 text-center transition-all shadow-lg hover:shadow-primary/20"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                      <ShieldCheck className="h-10 w-10 text-primary transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">Guardian / Parent</span>
                      <span className="text-sm font-medium text-muted-foreground leading-relaxed">Administer controls and monitor digital safety alerts</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => chooseRole('child')}
                    className="glass-panel group flex flex-col items-center gap-4 rounded-3xl p-8 border border-white/10 hover:border-[#3b82f6]/50 text-center transition-all shadow-lg hover:shadow-[#3b82f6]/20"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#3b82f6]/10 transition-colors group-hover:bg-[#3b82f6] group-hover:text-white">
                      <Baby className="h-10 w-10 text-[#3b82f6] transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-foreground group-hover:text-[#3b82f6] transition-colors mb-1">Child / Member</span>
                      <span className="text-sm font-medium text-muted-foreground leading-relaxed">Scan links safely and auto-alert your guardian</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && chosen === 'child' && (
              <motion.div
                key="step2-child"
                variants={fadeVariants}
                initial="hidden" animate="visible" exit="exit"
              >
                <div className="mb-8 text-center glass-panel p-8 rounded-3xl max-w-md mx-auto relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <Baby className="w-48 h-48" />
                  </div>

                  <h2 className="mb-2 text-2xl font-extrabold text-foreground flex items-center justify-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-primary" /> Guardian Authorization
                  </h2>
                  <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-6">
                    Connect your account to your parent's dashboard to ensure alerts are routed correctly.
                  </p>

                  <div className="space-y-5 text-left relative z-10">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-foreground/80 uppercase tracking-wider text-xs">Parent Authentication Email</label>
                      <Input
                        disabled={submitting || success}
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="parent.guardian@example.com"
                        className="h-14 rounded-2xl bg-secondary/50 border-white/10 focus-visible:ring-primary font-medium text-base shadow-inner"
                      />
                    </div>

                    <AnimatePresence>
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="rounded-xl bg-safe/10 border border-safe/30 p-3 flex items-center gap-3 text-safe font-bold"
                        >
                          <CheckCircle2 className="w-5 h-5" /> Connection Established Successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3 pt-4">
                      <Button
                        disabled={submitting || success}
                        size="lg"
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="gap-2 rounded-xl bg-background/50 backdrop-blur-md border-white/10"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                      <Button
                        disabled={submitting || success}
                        size="lg"
                        onClick={submit}
                        className="flex-1 gap-2 rounded-xl font-bold shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-[#3b82f6] border-0"
                      >
                        {submitting && !success ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full" />
                        ) : success ? (
                          'Redirecting...'
                        ) : (
                          <>Verify Connection <ArrowRight className="h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && chosen === 'parent' && (
              <motion.div
                key="step2-parent"
                variants={fadeVariants}
                initial="hidden" animate="visible" exit="exit"
                className="text-center"
              >
                <div className="glass-panel mx-auto max-w-md rounded-3xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <ShieldCheck className="w-48 h-48" />
                  </div>

                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-safe shadow-lg shadow-safe/30"
                  >
                    <ShieldCheck className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="mb-3 text-3xl font-extrabold text-foreground">Activate Guardian Mode</h2>
                  <p className="mb-8 text-base text-foreground/80 font-medium leading-relaxed">
                    By proceeding, you will initialize the master monitoring dashboard allowing you to oversee child accounts.
                  </p>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      disabled={submitting}
                      onClick={submit}
                      size="lg"
                      className="w-full h-14 gap-2 rounded-2xl font-black shadow-xl shadow-safe/25 bg-safe hover:bg-safe/90 text-white text-lg transition-all"
                    >
                      {submitting ? 'Initializing Dashboard...' : <>Initialize Dashboard <ArrowRight className="h-5 w-5" /></>}
                    </Button>
                  </motion.div>

                  <button onClick={() => setStep(1)} className="mt-6 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Wait, go back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
