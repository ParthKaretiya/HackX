import { ClipboardPaste, Search, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    Icon: ClipboardPaste,
    title: 'Paste Data',
    description: 'Copy anything suspicious and drop it directly into the scanner.',
    color: 'from-zinc-500 to-zinc-400'
  },
  {
    Icon: Search,
    title: 'Domain Scan',
    description: 'Our engine checks for known scam indicators and domain age.',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    Icon: Brain,
    title: 'Behavioral Check',
    description: 'Text is analyzed for urgency tactics and emotional triggers.',
    color: 'from-purple-600 to-pink-500'
  },
  {
    Icon: CheckCircle,
    title: 'Clear Verdict',
    description: 'Receive a color-coded result with human explanations.',
    color: 'from-emerald-500 to-teal-400'
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <section className="relative py-32 md:py-48 z-10 overflow-hidden bg-black/20">
      <motion.div style={{ scale }} className="absolute inset-0 bg-primary/5 blur-[150px] mix-blend-screen pointer-events-none" />

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-24 text-center"
        >
          <h2 className="mb-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl drop-shadow-xl">
            How PulseGuard Works
          </h2>
          <p className="text-xl text-muted-foreground font-semibold">Four simple steps to absolute online certainty.</p>
        </motion.div>

        {/* Timeline steps */}
        <div className="mx-auto max-w-7xl relative">
          {/* Connecting Line Vector */}
          <div className="absolute top-1/2 left-0 w-full h-1 hidden lg:block bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0">
            <motion.div
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.15 }}
                key={i}
                className="group relative"
              >
                {/* Float Container */}
                <motion.div
                  whileHover={{ y: -15 }}
                  className="bg-[#0f1115]/80 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all hover:shadow-[0_40px_80px_rgba(59,130,246,0.3)] hover:border-primary/50 relative overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div className={`absolute -inset-10 bg-gradient-to-br \${step.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`}></div>

                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br \${step.color} text-white shadow-xl shadow-black/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                        <step.Icon className="h-8 w-8" />
                      </div>
                      <div className="text-5xl font-black text-white/5 right-4 top-4 absolute group-hover:text-white/10 transition-colors pointer-events-none">
                        0{i + 1}
                      </div>
                    </div>
                    <h3 className="mb-4 text-2xl font-black leading-snug text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{step.title}</h3>
                    <p className="text-base leading-relaxed text-white/70 font-medium">{step.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
          className="mt-24 text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/scanner')}
            className="group relative overflow-hidden h-20 gap-4 rounded-full px-16 text-2xl font-black shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all hover:scale-110 hover:shadow-[0_0_80px_rgba(59,130,246,0.8)] bg-gradient-to-r from-primary via-blue-500 to-cyan-400 border-0 text-white"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out"></div>
            Start Scanning
            <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-2" />
          </Button>
        </motion.div>
      </div >
    </section >
  );
};

export default HowItWorks;
