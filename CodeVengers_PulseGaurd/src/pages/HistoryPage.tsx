import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import HistoryList from "@/components/HistoryList";
import ScanResult from "@/components/ScanResult";
import { ScanResultData } from "@/types/scan";
import { X, Activity, Filter, Search, Calendar, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";

type RiskFilter = "ALL" | "SAFE" | "SUSPICIOUS" | "DANGEROUS";
type SortBy = "date" | "risk";

const HistoryPage = () => {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResultData[]>([]);
  const [selected, setSelected] = useState<ScanResultData | null>(null);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");

  useEffect(() => {
    const key = "pulseguard_scans";
    const raw = JSON.parse(localStorage.getItem(key) || "[]") as Array<{
      uid: string;
      content: string;
      result: ScanResultData;
      timestamp: string;
    }>;
    const items = raw
      .filter((e) => (user?.uid ? e.uid === user.uid : true))
      .map((e) => ({ ...e.result, timestamp: new Date(e.timestamp) }));
    setScans(items);
  }, [user?.uid]);

  const summary = useMemo(() => {
    const total = scans.length;
    const high = scans.filter((s) => s.safetyCategory === "DANGEROUS").length;
    const medium = scans.filter((s) => s.safetyCategory === "SUSPICIOUS").length;
    const low = scans.filter((s) => s.safetyCategory === "SAFE").length;
    return { total, high, medium, low };
  }, [scans]);

  const visible = useMemo(() => {
    let out = scans.slice();
    if (riskFilter !== "ALL") out = out.filter((s) => s.safetyCategory === riskFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((s) => s.input.toLowerCase().includes(q));
    }
    out.sort((a, b) => {
      if (sortBy === "date") return b.timestamp.getTime() - a.timestamp.getTime();
      const order: Record<string, number> = { DANGEROUS: 3, SUSPICIOUS: 2, SAFE: 1 };
      return order[b.safetyCategory] - order[a.safetyCategory];
    });
    return out;
  }, [scans, riskFilter, search, sortBy]);

  const statCards = [
    { label: "Total Scanned", value: summary.total, tone: "secondary", color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
    { label: "Critical Threats", value: summary.high, tone: "dangerous", color: "from-red-500 to-orange-500", shadow: "shadow-red-500/20" },
    { label: "Anomalies", value: summary.medium, tone: "warning", color: "from-yellow-400 to-orange-400", shadow: "shadow-yellow-500/20" },
    { label: "Verified Safe", value: summary.low, tone: "safe", color: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-500/20" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg">
      <ParticleBackground />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 py-24 relative z-10 w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-4">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-bold text-primary uppercase tracking-widest">Global Telemetry Logs</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-foreground drop-shadow-md">
              Threat History
            </h1>
            <p className="mt-4 text-lg text-muted-foreground font-medium">
              Review past analysis operations and extracted threat profiles.
            </p>
          </div>
        </motion.div>

        {/* Neural Summary Nodes */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((c, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ y: -5, scale: 1.02 }}
              key={c.label}
              className={`relative overflow-hidden group glass-panel rounded-[2rem] p-6 border border-white/10 shadow-xl \${c.shadow} transition-all`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br \${c.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{c.label}</div>
              <div className="mt-2 text-5xl font-black text-foreground drop-shadow-sm">{c.value}</div>
              
              <div className="mt-6 h-1 w-full rounded-full bg-secondary/50 overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: summary.total > 0 ? `\${(c.value / summary.total) * 100}%` : "0%" }} 
                   transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                   className={`h-full bg-gradient-to-r \${c.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Controls */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="mb-8 flex flex-col items-stretch gap-4 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-3xl p-4 md:flex-row md:items-center md:justify-between shadow-2xl"
        >
          <div className="flex flex-wrap items-center gap-2 p-1 bg-black/50 rounded-2xl border border-white/5">
            {(["ALL", "DANGEROUS", "SUSPICIOUS", "SAFE"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all \${
                  riskFilter === f
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {f === "ALL" ? "All Logs" : f === "DANGEROUS" ? "Critical" : f === "SUSPICIOUS" ? "Anomalies" : "Verified"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                className="h-12 w-64 rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm font-medium text-white placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                placeholder="Search queries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <select
                className="h-12 rounded-2xl border border-white/10 bg-white/5 pl-11 pr-10 text-sm font-bold text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none appearance-none cursor-pointer"
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSortBy(e.target.value === "risk" ? "risk" : "date")
                }
              >
                <option value="date" className="bg-gray-900">Sort by Time</option>
                <option value="risk" className="bg-gray-900">Sort by Threat</option>
              </select>
            </div>
          </div>
        </motion.div >

  {/* Data Grid */ }
  < div className = "grid gap-8 lg:grid-cols-5 relative" >
          <motion.div layout className={selected ? "lg:col-span-3 transition-all duration-500 ease-in-out" : "lg:col-span-5 transition-all duration-500 ease-in-out"}>
             <div className="glass-panel rounded-[2.5rem] p-4 md:p-8 border border-white/10 shadow-2xl bg-black/20">
                <HistoryList scans={visible} onSelect={setSelected} />
             </div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {selected && (
              <motion.div 
                 initial={{ opacity: 0, x: 50, scale: 0.9 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, x: 50, scale: 0.9 }}
                 transition={{ type: "spring", bounce: 0.2 }}
                 className="lg:col-span-2"
              >
                <div className="sticky top-28">
                  <div className="glass-panel rounded-[2.5rem] border border-white/10 p-6 shadow-2xl bg-[#0f1115]/80 backdrop-blur-3xl">
                    <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/20 rounded-xl">
                            <AlertTriangle className="w-5 h-5 text-primary" />
                         </div>
                         <h3 className="text-xl font-black text-foreground">Deep Inspection</h3>
                      </div>
                      <button
                        onClick={() => setSelected(null)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted-foreground hover:bg-red-500/20 hover:text-red-500 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                       <ScanResult result={selected} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div >
      </div >
    </div >
  );
};

export default HistoryPage;
