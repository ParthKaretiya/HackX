import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatItDoes from '@/components/WhatItDoes';
import HowItWorks from '@/components/HowItWorks';
import WhoItsFor from '@/components/WhoItsFor';
import CtaFooter from '@/components/CtaFooter';

const Index = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      <Navbar />

      <div className="relative z-10">
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

        {/* 5. CTA + Footer */}
        <CtaFooter />
      </div>
    </div>
  );
};

export default Index;
