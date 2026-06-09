import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Upload, Cpu, ShieldCheck, ArrowRight, AlertTriangle, Info } from 'lucide-react';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      step: '01',
      icon: Upload,
      title: t('how_step_1_title'),
      description: t('how_step_1_desc'),
      glow: "hover:shadow-[0_16px_32px_rgba(59,130,246,0.04)] hover:border-blue-500/20",
      accent: "text-blue-500 bg-blue-500/5 border-blue-500/10",
    },
    {
      step: '02',
      icon: Cpu,
      title: t('how_step_2_title'),
      description: t('how_step_2_desc'),
      glow: "hover:shadow-[0_16px_32px_rgba(139,92,246,0.04)] hover:border-violet-500/20",
      accent: "text-violet-500 bg-violet-500/5 border-violet-500/10",
    },
    {
      step: '03',
      icon: ShieldCheck,
      title: t('how_step_3_title'),
      description: t('how_step_3_desc'),
      glow: "hover:shadow-[0_16px_32px_rgba(16,185,129,0.04)] hover:border-emerald-500/20",
      accent: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 z-10 bg-secondary/10" id="how-it-works">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/5 to-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-4 text-foreground">
            {t('how_title')} <span className="text-muted-foreground">{t('how_title_highlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
            {t('how_desc')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-24">
          {/* Connector line with animated background gradient */}
          <div className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-blue-500/25 via-violet-500/25 to-emerald-500/25" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col items-center text-center p-6 rounded-3xl border border-transparent transition-all duration-300 ${s.glow}`}
              >
                {/* Step number + icon */}
                <div className={`relative mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-background border border-border shadow-sm z-10 transition-transform duration-300 hover:scale-105`}>
                  <s.icon className="h-8 w-8 text-foreground" strokeWidth={1.5} />
                  <span className={`absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold ${s.accent}`}>
                    {s.step}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-display font-semibold text-foreground tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[14px] max-w-[280px] font-medium">{s.description}</p>

                {/* Arrow connector on mobile */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-border">
                    <ArrowRight className="h-6 w-6 rotate-90 text-border mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom demo card styled like the premium scanner result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl bg-background rounded-3xl p-6 md:p-8 border border-red-500/20 shadow-xl shadow-red-500/[0.02] dark:shadow-red-500/[0.04]"
        >
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
            </div>
            
            <div className="flex-1 space-y-4 pt-1 text-left">
              <div>
                <h3 className="text-base font-bold text-red-500 mb-1 flex items-center gap-2">
                  {t('how_demo_threat')}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                  {t('how_demo_threat_desc')}
                </p>
              </div>

              <div className="bg-secondary/40 border border-border/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('scan_breakdown')}</span>
                </div>
                <ul className="space-y-2.5 font-medium text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{t('how_demo_factor_1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{t('how_demo_factor_2')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{t('how_demo_factor_3')}</span>
                  </li>
                </ul>
              </div>

              <div className="text-xs text-muted-foreground font-medium">
                {t('scan_scanned_input')}: <span className="font-mono bg-secondary px-2 py-1 rounded text-[10px] text-foreground/80 border border-border/50">https://secure-banklogin.xyz/verify</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
