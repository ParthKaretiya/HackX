import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import HistoryList from "@/components/HistoryList";
import ScanResult from "@/components/ScanResult";
import { ScanResultData } from "@/types/scan";
import { X, Activity, Filter, Search, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

type RiskFilter = "ALL" | "SAFE" | "SUSPICIOUS" | "DANGEROUS";
type SortBy = "date" | "risk";

const STAT_CARDS = [
  { key: 'total', label: 'Total Scanned', icon: Activity, gradient: 'from-blue-500 to-cyan-400', glow: 'shadow-blue-500/20' },
  { key: 'high', label: 'Critical Threats', icon: AlertTriangle, gradient: 'from-red-500 to-orange-500', glow: 'shadow-red-500/20' },
  { key: 'medium', label: 'Suspicious', icon: Filter, gradient: 'from-amber-400 to-orange-400', glow: 'shadow-amber-500/20' },
  { key: 'low', label: 'Verified Safe', icon: Search, gradient: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-500/20' },
];

const FILTERS: { value: RiskFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'DANGEROUS', label: 'Critical' },
  { value: 'SUSPICIOUS', label: 'Suspicious' },
  { value: 'SAFE', label: 'Safe' },
];

const HistoryPage = () => {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResultData[]>([]);
  const [selected, setSelected] = useState<ScanResultData | null>(null);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("pulseguard_scans") || "[]");
    const items = raw
      .filter((e: any) => user?.uid ? e.uid === user.uid : true)
      .map((e: any) => ({ ...e.result, timestamp: new Date(e.timestamp) }));
    setScans(items);
  }, [user?.uid]);

  const summary = useMemo(() => ({
    total: scans.length,
    high: scans.filter(s => s.safetyCategory === "DANGEROUS").length,
    medium: scans.filter(s => s.safetyCategory === "SUSPICIOUS").length,
    low: scans.filter(s => s.safetyCategory === "SAFE").length,
  }), [scans]);

  const visible = useMemo(() => {
    let out = [...scans];
    if (riskFilter !== "ALL") out = out.filter(s => s.safetyCategory === riskFilter);
    if (search.trim()) out = out.filter(s => s.input.toLowerCase().includes(search.toLowerCase()));
    out.sort((a, b) => {
      if (sortBy === "date") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      const order: Record<string, number> = { DANGEROUS: 3, SUSPICIOUS: 2, SAFE: 1 };
      return order[b.safetyCategory] - order[a.safetyCategory];
    });
    return out;
  }, [scans, riskFilter, search, sortBy]);

  const statValues: Record<string, number> = { total: summary.total, high: summary.high, medium: summary.medium, low: summary.low };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-semibold text-primary mb-4">
            <Activity className="h-4 w-4 animate-pulse" />
            Scan History
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            Threat <span className="text-gradient">History</span>
          </h1>
          <p className="mt-3 text-muted-foreground font-medium">
            All your past scan results and threat analysis logs.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-5 border border-white/5 ${card.glow}`}
            >
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">{card.label}</div>
              <div className={`text-4xl font-display font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                {statValues[card.key]}
              </div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: summary.total > 0 ? `${(statValues[card.key] / summary.total) * 100}%` : '0%' }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl border border-white/5 p-3 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          {/* Risk filter tabs */}
          <div className="flex gap-1 glass rounded-xl p-1">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setRiskFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  riskFilter === f.value ? 'bg-primary text-white shadow' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="history-search"
                placeholder="Search scans..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortBy)}
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="date" className="bg-background">By Date</option>
              <option value="risk" className="bg-background">By Risk</option>
            </select>
          </div>
        </motion.div>

        {/* Data grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div layout className={selected ? "lg:col-span-3" : "lg:col-span-5"} transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <div className="glass-card rounded-2xl border border-white/5 p-4 md:p-6">
              <HistoryList scans={visible} onSelect={setSelected} />
            </div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-24">
                  <div className="glass-card rounded-2xl border border-white/8 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-primary/15 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-base font-display font-bold text-foreground">Scan Detail</h3>
                      </div>
                      <button
                        onClick={() => setSelected(null)}
                        className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-5 max-h-[65vh] overflow-y-auto">
                      <ScanResult result={selected} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
