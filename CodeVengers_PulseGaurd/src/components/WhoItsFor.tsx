import { GraduationCap, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const audiences = [
  {
    Icon: GraduationCap,
    title: 'Students & Youth',
    description: 'Check exam scams, fake job offers, and sketchy social media news before you fall for them.',
  },
  {
    Icon: Users,
    title: 'Families & Elders',
    description: 'Protect parents and grandparents from phishing, fake sale messages, and online banking fraud automatically.',
  },
  {
    Icon: Briefcase,
    title: 'Working Professionals',
    description: 'Scan links before clicking in emails, Slack, or DMs. Keep corporate networks and personal data safe.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

const WhoItsFor = () => {
  return (
    <section className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Engineered For Everyone
          </h2>
          <p className="text-lg text-muted-foreground font-medium">Internet safety shouldn't require a computer science degree.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {audiences.map((a, i) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -10 }}
              key={i}
              className="glass-panel rounded-3xl p-8 text-center shadow-xl border-white/10 hover:shadow-primary/20 hover:border-primary/30 transition-all group"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-secondary text-foreground group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-[#3b82f6] group-hover:text-white transition-all shadow-inner group-hover:shadow-primary/40">
                <a.Icon className="h-9 w-9" />
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">{a.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium">{a.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoItsFor;
