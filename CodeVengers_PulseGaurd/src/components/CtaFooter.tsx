import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CtaFooter = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {/* CTA Section */}
      <section className="relative py-24 md:py-32 z-10 overflow-hidden bg-foreground text-background">
        {/* Dynamic mesh glow backdrops */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            {/* Icon */}
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10 text-background border border-background/20">
              <Shield className="h-8 w-8" strokeWidth={2} />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-6 text-background">
              {t('cta_title_1')}
              <br />
              <span className="text-background/60">{t('cta_title_2')}</span>
            </h2>
            <p className="text-lg text-background/80 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              {t('cta_desc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={user ? '/scanner' : '/auth'}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-foreground bg-background hover:scale-105 transition-transform text-sm shadow-lg shadow-black/10"
              >
                <Shield className="h-4 w-4" />
                {user ? t('cta_btn_open') : t('cta_btn_start')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </Link>
              {!user && (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-background hover:bg-background/10 transition-colors text-sm border border-background/25"
                >
                  {t('cta_btn_signin')}
                </Link>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs text-background/60 font-bold tracking-widest uppercase">
              <span>✓ {t('cta_indicator_1')}</span>
              <span>✓ {t('cta_indicator_2')}</span>
              <span>✓ {t('cta_indicator_3')}</span>
              <span>✓ {t('cta_indicator_4')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                  <Shield className="h-4 w-4 text-background" />
                </div>
                <span className="text-xl font-display font-semibold text-foreground tracking-tight">{t('app_name')}</span>
              </div>
              <p className="text-[14px] text-muted-foreground leading-relaxed max-w-xs mb-6 font-medium">
                {t('footer_desc')}
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[10px] font-bold text-muted-foreground mb-6 uppercase tracking-wider">{t('footer_product')}</h4>
              <ul className="space-y-4">
                {[
                  { label: t('scanner'), path: '/scanner' },
                  { label: t('history'), path: '/history' },
                  { label: t('family_setup'), path: '/family' },
                  { label: t('cyber_cell'), path: '/cyber-cell' },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path} className="text-[14px] font-semibold text-foreground/80 hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-muted-foreground mb-6 uppercase tracking-wider">{t('footer_account')}</h4>
              <ul className="space-y-4">
                {[
                  { label: t('login'), path: '/auth' },
                  { label: t('signup'), path: '/auth?mode=register' },
                  { label: t('profile'), path: '/profile' },
                  { label: t('family'), path: '/parent-dashboard' },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path} className="text-[14px] font-semibold text-foreground/80 hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] font-semibold text-muted-foreground">
              © 2025 PulseGuard · CodeVengers
            </p>
            <p className="text-[13px] font-semibold text-muted-foreground">
              {t('footer_made_in')}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CtaFooter;
