import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhoItsFor = () => {
  const { t } = useTranslation();

  const audiences = [
    {
      icon: User,
      title: t('who_indiv_title'),
      subtitle: t('who_indiv_subtitle'),
      description: t('who_indiv_desc'),
      features: [
        t('who_indiv_feat_1'),
        t('who_indiv_feat_2'),
        t('who_indiv_feat_3'),
        t('who_indiv_feat_4')
      ],
      cta: { label: t('who_indiv_cta'), path: '/auth' },
      hoverBorder: "hover:border-blue-500/40",
      hoverShadow: "dark:hover:shadow-[0_16px_40px_rgba(59,130,246,0.1)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.03)]",
      iconBg: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
    },
    {
      icon: Shield,
      title: t('who_parent_title'),
      subtitle: t('who_parent_subtitle'),
      description: t('who_parent_desc'),
      features: [
        t('who_parent_feat_1'),
        t('who_parent_feat_2'),
        t('who_parent_feat_3'),
        t('who_parent_feat_4')
      ],
      cta: { label: t('who_parent_cta'), path: '/auth?mode=family' },
      featured: true,
      hoverBorder: "hover:border-emerald-500/40",
      hoverShadow: "dark:hover:shadow-[0_16px_40px_rgba(16,185,129,0.1)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.03)]",
      iconBg: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20",
    },
    {
      icon: Users,
      title: t('who_child_title'),
      subtitle: t('who_child_subtitle'),
      description: t('who_child_desc'),
      features: [
        t('who_child_feat_1'),
        t('who_child_feat_2'),
        t('who_child_feat_3'),
        t('who_child_feat_4')
      ],
      cta: { label: t('who_child_cta'), path: '/auth' },
      hoverBorder: "hover:border-purple-500/40",
      hoverShadow: "dark:hover:shadow-[0_16px_40px_rgba(139,92,246,0.1)] hover:shadow-[0_16px_40px_rgba(139,92,246,0.03)]",
      iconBg: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 z-10" id="audiences">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-4 text-foreground">
            {t('who_title')} <span className="text-muted-foreground">{t('who_title_highlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
            {t('who_desc')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group flex flex-col bg-background/50 rounded-3xl border ${
                a.featured ? 'border-foreground/35 shadow-lg shadow-foreground/[0.02]' : 'border-border/50'
              } ${a.hoverBorder} ${a.hoverShadow} hover:scale-[1.02] transition-all duration-500 overflow-hidden p-8`}
            >
              <div className="relative z-10 flex flex-col flex-1 text-left">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`h-12 w-12 rounded-2xl ${a.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <a.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {a.featured && (
                    <span className="px-3.5 py-1 rounded-full bg-foreground text-[9px] font-bold text-background uppercase tracking-widest">
                      {t('who_recommended')}
                    </span>
                  )}
                </div>

                <div className="mb-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{a.subtitle}</div>
                <h3 className="mb-4 text-2xl font-display font-semibold text-foreground tracking-tight">{a.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-8 flex-1 font-medium">{a.description}</p>

                {/* Features list */}
                <ul className="space-y-3.5 mb-8">
                  {a.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={a.cta.path}
                  className={`group/btn inline-flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
                    a.featured
                      ? 'bg-foreground text-background hover:opacity-95'
                      : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border/50'
                  }`}
                >
                  <span>{a.cta.label}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
