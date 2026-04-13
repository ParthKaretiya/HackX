import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Zap, TrendingUp, Globe, MessageSquare } from 'lucide-react';

const threats = [
  {
    id: 1,
    type: 'Phishing',
    target: 'SBI Bank Users',
    severity: 'High',
    location: 'Mumbai, India',
    time: '5 min ago',
    icon: Globe,
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  },
  {
    id: 2,
    type: 'Prize Scam',
    target: 'WhatsApp Users',
    severity: 'Medium',
    location: 'Delhi, India',
    time: '12 min ago',
    icon: MessageSquare,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 3,
    type: 'KYC Fraud',
    target: 'Aadhaar Card Holders',
    severity: 'High',
    location: 'Bangalore, India',
    time: '24 min ago',
    icon: ShieldCheck,
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  },
  {
    id: 4,
    type: 'Lottery Scam',
    target: 'General Public',
    severity: 'Low',
    location: 'Kolkata, India',
    time: '45 min ago',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  }
];

export function SafetyFeed() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          Live Threat Telemetry
        </h3>
        <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-black animate-pulse">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          LIVE UPDATES
        </span>
      </div>

      <div className="grid gap-4">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-5 rounded-3xl border border-white/5 bg-black/20 hover:bg-black/40 transition-all group flex items-center gap-5"
          >
            <div className={`h-12 w-12 rounded-2xl ${threat.bg} flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform`}>
              <threat.icon className={`h-6 w-6 ${threat.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-black uppercase tracking-widest ${threat.color}`}>
                  {threat.type}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">• {threat.time}</span>
              </div>
              <h4 className="font-bold text-foreground truncate">{threat.target}</h4>
              <p className="text-xs text-muted-foreground font-medium">{threat.location}</p>
            </div>

            <div className="text-right">
              <div className={`text-xs font-black px-2 py-1 rounded-lg border ${
                threat.severity === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                threat.severity === 'Medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              }`}>
                {threat.severity} Risk
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-sm font-bold text-muted-foreground transition-all">
        View Full Threat Map
      </button>
    </div>
  );
}
