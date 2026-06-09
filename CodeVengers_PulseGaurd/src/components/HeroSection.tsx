import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Check, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroShield from '@/assets/hero-shield.png';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  onHowItWorks: () => void;
}

const HeroSection = ({ onHowItWorks }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">
            
            {/* Live Engine Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {t('hero_badge')}
            </motion.div>

            {/* Headline */}
            <div className="space-y-2 md:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-foreground leading-[1.08] font-display"
              >
                {t('hero_title_1')}
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {t('hero_title_2')}
                </span>
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] text-muted-foreground leading-relaxed max-w-xl font-medium"
            >
              {t('hero_desc')}
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 w-full"
            >
              {[
                t('hero_feat_1'),
                t('hero_feat_2'),
                t('hero_feat_3')
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-[15px] text-foreground/80 font-medium">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 pt-4"
            >
              <button
                onClick={() => navigate('/scanner')}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                {t('launch_scanner')}
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onHowItWorks}
                className="text-foreground font-semibold hover:text-blue-500 transition-colors flex items-center gap-1.5 px-4 py-2 hover:bg-secondary/50 rounded-xl"
              >
                {t('view_architecture')}
                <ArrowDown className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

          {/* Right Column - Tablet Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-3 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 dark:border-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.3)] backdrop-blur-xl max-w-[460px] w-full"
            >
              {/* Inner card illustration container */}
              <div className="overflow-hidden rounded-[2rem] bg-secondary/30 aspect-square flex items-center justify-center">
                <img 
                  src={heroShield} 
                  alt="Security Shield Illustration" 
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Floating Verified Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-8 left-6 lg:-left-6 bg-background/90 dark:bg-card/90 backdrop-blur-xl border border-border p-4 pr-6 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-foreground text-sm tracking-tight leading-none">{t('secure_100')}</span>
                  <span className="text-[9px] text-muted-foreground font-mono tracking-widest mt-1">{t('verified_system')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
