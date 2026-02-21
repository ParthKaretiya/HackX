import { MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const differentiators = [
  {
    Icon: MessageSquare,
    title: 'Not Just Anti-Virus',
    description: 'We don\'t just scan for malware files. We explain psychological manipulation, phishing, and scam tactics in plain English.',
  },
  {
    Icon: ShieldCheck,
    title: 'Unified Protection',
    description: 'Combines link safety, behavioral phishing, fake news, and scam detection inside a single, unified intelligence layer.',
  },
  {
    Icon: Sparkles,
    title: 'Family-First Design',
    description: 'We separated the experience. Children get safe scanning blocks, while parents get master dashboards and intelligence reports.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

const WhyDifferent = () => {
  return (
    <section className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Why We Are Different
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
            Standard antivirus software protects your computer. PulseGuard protects your reality.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3"
        >
          {differentiators.map((d, i) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              key={i}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 glass-panel bg-gradient-to-br from-secondary/50 to-background p-8 text-center transition-all shadow-2xl hover:shadow-primary/30 group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/80 text-foreground group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-[#3b82f6] group-hover:text-white transition-all shadow-inner group-hover:shadow-primary/50 relative z-10">
                <d.Icon className="h-10 w-10" />
              </div>
              <h3 className="mb-3 text-2xl font-black text-foreground group-hover:text-primary transition-colors relative z-10">{d.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground font-medium relative z-10">{d.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferent;
