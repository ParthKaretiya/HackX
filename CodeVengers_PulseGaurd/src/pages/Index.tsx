import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatItDoes from '@/components/WhatItDoes';
import HowItWorks from '@/components/HowItWorks';
import WhoItsFor from '@/components/WhoItsFor';
import WhatItChecks from '@/components/WhatItChecks';
import WhyDifferent from '@/components/WhyDifferent';
import HistoryList from '@/components/HistoryList';
import CtaFooter from '@/components/CtaFooter';
import { mockRecentScans } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';

import ParticleBackground from '@/components/ParticleBackground';
import CyberCellSection from '@/components/CyberCellSection';

const Index = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg">
      <ParticleBackground />
      <Navbar />

      {/* 1. Hero */}
      <HeroSection
        onHowItWorks={() => howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* 2. What it does */}
      <WhatItDoes />

      {/* 3. How it works */}
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>

      {/* 4. Who it's for */}
      <WhoItsFor />

      {/* 5. What it checks */}
      <WhatItChecks />

      {/* 6. Recent scans preview */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              See PulseGuard in Action
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground font-medium">
              Live telemetry of recent threat interceptions and safe URL verifications handled by the system.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl glass-panel rounded-3xl p-6 md:p-10 shadow-2xl border-white/5"
          >
            <HistoryList scans={mockRecentScans.slice(0, 6)} compact />
          </motion.div>
        </div>
      </section>

      {/* 7. Family Setup teaser */}
      <section className="relative py-24 md:py-32 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-md" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/10 blur-[150px] mix-blend-screen rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] mix-blend-screen rounded-full" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mb-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Constructed For Families
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
              Equip parents with a Guardian Dashboard to monitor analytics and intercept threats. Provide children with an automated shield to block malicious content.
            </p>
            <button
              onClick={() => {
                if (!user) {
                  navigate('/auth?mode=family');
                } else if (role === 'parent') {
                  navigate('/parent-dashboard');
                } else if (role === 'child') {
                  navigate('/child-dashboard');
                } else {
                  navigate('/family');
                }
              }}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-[#3b82f6] px-10 py-5 text-lg font-black text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
            >
              Configure Family Setup <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 8. Why different */}
      <WhyDifferent />

      {/* Cyber Cell Integration */}
      <CyberCellSection />

      {/* 9. CTA + Footer */}
      <CtaFooter />
    </div>
  );
};

export default Index;
