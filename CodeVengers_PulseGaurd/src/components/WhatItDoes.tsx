import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, AlertTriangle, Newspaper, QrCode, MessageSquare, Globe } from 'lucide-react';

const WhatItDoes = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: t('feat_link_title'),
      description: t('feat_link_desc'),
      tags: [t('feat_link_tag_1'), t('feat_link_tag_2'), t('feat_link_tag_3')],
      borderColor: "hover:border-blue-500/30",
      shadowGlow: "dark:hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.04)]",
      iconBg: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
    },
    {
      icon: MessageSquare,
      title: t('feat_msg_title'),
      description: t('feat_msg_desc'),
      tags: [t('feat_msg_tag_1'), t('feat_msg_tag_2'), t('feat_msg_tag_3')],
      borderColor: "hover:border-cyan-500/30",
      shadowGlow: "dark:hover:shadow-[0_16px_40px_rgba(6,182,212,0.12)] hover:shadow-[0_16px_40px_rgba(6,182,212,0.04)]",
      iconBg: "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20",
    },
    {
      icon: Newspaper,
      title: t('feat_fake_title'),
      description: t('feat_fake_desc'),
      tags: [t('feat_fake_tag_1'), t('feat_fake_tag_2'), t('feat_fake_tag_3')],
      borderColor: "hover:border-violet-500/30",
      shadowGlow: "dark:hover:shadow-[0_16px_40px_rgba(139,92,246,0.12)] hover:shadow-[0_16px_40px_rgba(139,92,246,0.04)]",
      iconBg: "bg-violet-500/10 text-violet-500 dark:bg-violet-500/20",
    },
    {
      icon: QrCode,
      title: t('feat_qr_title'),
      description: t('feat_qr_desc'),
      tags: [t('feat_qr_tag_1'), t('feat_qr_tag_2'), t('feat_qr_tag_3')],
      borderColor: "hover:border-amber-500/30",
      shadowGlow: "dark:hover:shadow-[0_16px_40px_rgba(245,158,11,0.12)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.04)]",
      iconBg: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20",
    },
    {
      icon: Shield,
      title: t('feat_family_title'),
      description: t('feat_family_desc'),
      tags: [t('feat_family_tag_1'), t('feat_family_tag_2'), t('feat_family_tag_3')],
      borderColor: "hover:border-emerald-500/30",
      shadowGlow: "dark:hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.04)]",
      iconBg: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20",
    },
    {
      icon: AlertTriangle,
      title: t('feat_cyber_title'),
      description: t('feat_cyber_desc'),
      tags: [t('feat_cyber_tag_1'), t('feat_cyber_tag_2'), t('feat_cyber_tag_3')],
      borderColor: "hover:border-rose-500/30",
      shadowGlow: "dark:hover:shadow-[0_16px_40px_rgba(244,63,94,0.12)] hover:shadow-[0_16px_40px_rgba(244,63,94,0.04)]",
      iconBg: "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 z-10" id="features">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-foreground mb-6">
            {t('features_title_1')}<br/>
            <span className="text-muted-foreground">{t('features_title_2')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
            {t('features_desc')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative bg-background/50 border border-border/50 ${f.borderColor} rounded-3xl p-8 hover:bg-secondary/30 ${f.shadowGlow} transition-all duration-500 overflow-hidden hover:scale-[1.02]`}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.iconBg} group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-display font-semibold text-foreground tracking-tight group-hover:text-foreground/90 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6 font-medium">
                  {f.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {f.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary/80 border border-border/40 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatItDoes;
