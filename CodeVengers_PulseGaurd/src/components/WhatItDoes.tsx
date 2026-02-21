import { Shield, ShieldCheck, Radar, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';

const features = [
  {
    Icon: ShieldCheck,
    title: 'Scam & Phishing Link Detection',
    description:
      'Paste any URL to see if it\'s impersonating a bank, newly created, or using scam keywords like OTP, KYC, or blocked account.',
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]'
  },
  {
    Icon: Radar,
    title: 'Fake News & Misinformation Radar',
    description:
      'Paste messages or news text to see if they contain miracle cures, guaranteed returns, or chain-forward patterns commonly used in misinformation.',
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]'
  },
  {
    Icon: ShoppingBag,
    title: 'Too-Good-To-Be-True Sale Checker',
    description:
      'Check suspicious "90% off" sale messages by comparing with real sale info and scam patterns.',
    color: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-[0_0_30px_rgba(52,211,153,0.3)]'
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
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const FeatureCard = ({ f, i }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group perspective-1000"
    >
      <motion.div
        animate={{
          y: isHovered ? -15 : 0,
          scale: isHovered ? 1.05 : 1,
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`glass-panel rounded-[2.5rem] p-10 h-full border border-white/10 \${isHovered ? f.shadow : 'shadow-xl'} transition-shadow duration-500 bg-black/40 backdrop-blur-3xl`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br \${f.color} opacity-0 group-hover:opacity-10 rounded-[2.5rem] transition-opacity duration-500`} />

        <div className="relative z-10">
          <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-gradient-to-br \${f.color} text-white shadow-inner group-hover:scale-110 transition-transform duration-500`}>
            <f.Icon className="h-10 w-10 drop-shadow-md" />
          </div>
          <h3 className="mb-4 text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">{f.title}</h3>
          <p className="text-base leading-relaxed text-white/70 font-medium group-hover:text-white/90 transition-colors duration-300">{f.description}</p>
        </div>

        {/* Decorative Arrow that slides in */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </motion.div >
    </motion.div >
  );
};

const WhatItDoes = () => {
  return (
    <section className="py-24 md:py-40 relative z-10 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] mix-blend-screen rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] mix-blend-screen rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20 text-center"
        >
          <motion.div variants={itemVariants} className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Shield className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-black text-primary tracking-widest uppercase shadow-sm">Core Engine Features</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="mb-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl drop-shadow-lg">
            What PulseGuard Does
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-muted-foreground font-semibold text-balance drop-shadow-sm">
            Three powerful intelligence layers designed to keep you and your family secure online.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"
        >
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatItDoes;
