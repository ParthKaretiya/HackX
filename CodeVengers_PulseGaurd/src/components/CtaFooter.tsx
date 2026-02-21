import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const CtaFooter = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* CTA strip */}
      <section className="relative py-24 md:py-32 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#3b82f6] opacity-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-white/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-md shadow-xl border border-white/30 text-white">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-md">
              Secure Your Online Reality
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
              Start scanning links, messages, and claims in seconds — no registration required. Try the engine today.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button
                size="lg"
                onClick={() => navigate('/scanner')}
                className="h-16 gap-3 rounded-2xl bg-white px-10 text-xl font-black text-primary shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-white/90 border-0"
              >
                Launch Universal Scanner
                <ArrowRight className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 glass-panel py-10 relative z-10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#3b82f6] shadow-lg shadow-primary/20">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              PulseGuard
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} PulseGuard • Your Personal Internet Safety & Reality Shield
          </p>
        </div>
      </footer>
    </>
  );
};

export default CtaFooter;
