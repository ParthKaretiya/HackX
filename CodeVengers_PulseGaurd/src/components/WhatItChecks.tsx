import {
  Globe,
  Eye,
  KeyRound,
  HeartPulse,
  Forward,
  BadgePercent,
} from 'lucide-react';
import { motion } from 'framer-motion';

const checks = [
  {
    Icon: Globe,
    title: 'Domain Age & Reputation',
    description: 'We instantly verify when a domain was created and score it against global threat databases.',
  },
  {
    Icon: Eye,
    title: 'Typosquatting & Lookalikes',
    description: 'Detects domains mimicking known brands (like "arnazon") with subtle spelling or homoglyph tricks.',
  },
  {
    Icon: KeyRound,
    title: 'OTP & Account Scams',
    description: 'Flags messages using fear-based keywords commonly found in phishing and identity theft.',
  },
  {
    Icon: HeartPulse,
    title: 'Miracle Cures & False Claims',
    description: 'Spots classic misinformation patterns like "100% cure" or "guaranteed risk-free profit".',
  },
  {
    Icon: Forward,
    title: 'Viral Chain Information',
    description: 'Identifies viral chain-forward patterns structurally designed to spread misinformation.',
  },
  {
    Icon: BadgePercent,
    title: 'Unrealistic Sale Anomalies',
    description: 'Compares text offers against known scam patterns and mathematically unrealistic discounts.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};


const WhatItChecks = () => {
  return (
    <section className="relative py-20 md:py-32 z-10 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Deep Scan Parameters
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
            PulseGuard evaluates dozens of distinct threat signals in milliseconds to formulate a verdict.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {checks.map((c, i) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              key={i}
              className="flex items-start gap-5 rounded-3xl border border-white/5 glass-panel p-6 shadow-xl transition-all hover:shadow-primary/20 hover:border-primary/20 bg-background/40 backdrop-blur-md group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
                <c.Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-base font-extrabold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatItChecks;
