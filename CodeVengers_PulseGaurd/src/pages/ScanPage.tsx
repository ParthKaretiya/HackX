import { useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ScanFormLink from "@/components/ScanFormLink";
import ScanFormText from "@/components/ScanFormText";
import ScanResult from "@/components/ScanResult";
import HistoryList from "@/components/HistoryList";
import { ScanResultData } from "@/types/scan";
import {
  scanLink,
  scanContent,
  checkFileScan,
  mockRecentScans,
} from "@/services/api";
import { History, ScanSearch, ShieldCheck, QrCode, FileText, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { QRScanner } from "@/components/QRScanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScanPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<ScanResultData | null>(null);
  const [recentScans, setRecentScans] = useState<ScanResultData[]>(mockRecentScans);
  const resultRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const addToHistory = useCallback((result: ScanResultData) => {
    setRecentScans((prev) => [result, ...prev].slice(0, 20));
    const key = "pulseguard_scans";
    const existing = JSON.parse(localStorage.getItem(key) || "[]") as Array<{
      uid: string;
      content: string;
      result: ScanResultData;
      timestamp: string;
    }>;
    if (user?.uid) {
      const entry = { uid: user.uid, content: result.input, result, timestamp: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify([entry, ...existing].slice(0, 200)));
    }
  }, [user?.uid]);

  const saveScan = async (_content: string, _result: ScanResultData) => { };

  const executeScan = async (action: () => Promise<ScanResultData>, actionType: string, input: string) => {
    setLoading(true);
    setCurrentResult(null);
    try {
      const result = await action();
      setCurrentResult(result);
      addToHistory(result);
      await saveScan(actionType === 'image' ? '[News Screenshot]' : input, result);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
    } finally {
      setLoading(false);
    }
  };

  const handleScanLink = (url: string) => executeScan(() => scanLink(url), 'link', url);
  const handleScanText = (text: string) => executeScan(() => scanContent(text), 'text', text);
  const handleScanImage = (file: File) => executeScan(() => checkFileScan(file), 'image', '[Image]');

  const handleSelectScan = (scan: ScanResultData) => {
    setCurrentResult(scan);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden mesh-bg">
      <ParticleBackground />
      <motion.div style={{ y: yParallax }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <motion.div style={{ y: yParallax }} className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#3b82f6]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <Navbar />

      {/* Scanner header */}
      <section className="pt-24 pb-16 relative z-10 w-full flex flex-col items-center">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants} className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-primary to-[#3b82f6] shadow-[0_0_50px_rgba(59,130,246,0.5)] transform hover:scale-110 transition-transform duration-500">
            <ScanSearch className="h-12 w-12 text-white animate-pulse" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl drop-shadow-xl text-gradient">
            Universal Intelligence Core
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-muted-foreground font-medium drop-shadow-sm">
            Deploy deep-layer neural analysis on any URL, message, or screenshot. Extract the truth instantaneously.
          </motion.p>
        </motion.div>
      </section>

      {/* Scanner cards */}
      <section className="pb-24 relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4 max-w-4xl relative z-20"
        >
          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-16 rounded-[2rem] bg-black/20 backdrop-blur-3xl border border-white/10 p-2 mb-10">
              <TabsTrigger value="link" className="rounded-full flex items-center gap-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <Globe className="h-4 w-4" /> URL Link
              </TabsTrigger>
              <TabsTrigger value="text" className="rounded-full flex items-center gap-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <FileText className="h-4 w-4" /> Message Text
              </TabsTrigger>
              <TabsTrigger value="qr" className="rounded-full flex items-center gap-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <QrCode className="h-4 w-4" /> QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="link">
              <div className="glass-panel p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Globe className="w-32 h-32" />
                </div>
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <span className="p-2 bg-primary/20 rounded-xl"><Globe className="h-6 w-6 text-primary" /></span>
                  URL Analysis
                </h2>
                <ScanFormLink onScan={handleScanLink} loading={loading} />
              </div>
            </TabsContent>

            <TabsContent value="text">
              <div className="glass-panel p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <FileText className="w-32 h-32" />
                </div>
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <span className="p-2 bg-primary/20 rounded-xl"><FileText className="h-6 w-6 text-primary" /></span>
                  Message Scrutiny
                </h2>
                <ScanFormText onScan={handleScanText} onScanImage={handleScanImage} loading={loading} />
              </div>
            </TabsContent>

            <TabsContent value="qr">
              <div className="glass-panel p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <QrCode className="w-32 h-32" />
                </div>
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <span className="p-2 bg-primary/20 rounded-xl"><QrCode className="h-6 w-6 text-primary" /></span>
                  QR Decryption
                </h2>
                <QRScanner onScan={handleScanLink} />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* Result */}
      <AnimatePresence mode="wait">
        {currentResult && (
          <motion.section
            key={currentResult.id}
            ref={resultRef}
            initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pb-24 relative z-30"
          >
            <div className="container mx-auto max-w-5xl px-4 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#3b82f6] rounded-[3rem] blur-2xl opacity-20" />
              <div className="relative bg-background/50 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground">Intelligence Report Generaed</h2>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">Status: Analysis Complete</p>
                  </div>
                </div>

                {/* Risk Meter */}
                <div className="mb-8 rounded-[2rem] bg-black/40 border border-white/5 p-8 shadow-inner">
                  {(() => {
                    const score =
                      currentResult.safetyCategory === "SAFE" ? 92 : currentResult.safetyCategory === "SUSPICIOUS" ? 55 : 18;
                    const barColor =
                      currentResult.safetyCategory === "SAFE" ? "bg-safe shadow-[0_0_20px_rgba(34,197,94,0.6)]" : currentResult.safetyCategory === "SUSPICIOUS" ? "bg-warning shadow-[0_0_20px_rgba(234,179,8,0.6)]" : "bg-dangerous shadow-[0_0_20px_rgba(239,68,68,0.6)]";
                    return (
                      <>
                        <div className="mb-4 flex items-center justify-between text-sm uppercase tracking-widest font-bold">
                          <span className="text-muted-foreground/80">Threat Probability Index</span>
                          <span className="text-4xl font-black text-foreground">{score}<span className="text-xl text-muted-foreground">/100</span></span>
                        </div>
                        <div className="h-6 w-full overflow-hidden rounded-full bg-secondary/20 shadow-inner">
                          <motion.div initial={{ width: 0 }} animate={{ width: `\${score}%` }} transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }} className={`h-full rounded-full \${barColor}`} />
                        </div>
                      </>
                    );
                  })()}
                </div>

                <ScanResult result={currentResult} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Recent scans */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-white/10 bg-background/80 backdrop-blur-2xl py-24 relative z-10"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <History className="h-8 w-8 text-primary" />
                </div>
                Global Telemetry List
              </h2>
              <p className="text-muted-foreground mt-3 font-medium text-lg ml-2">Recent malicious threats and verified platforms intercepted by the engine.</p>
            </div>
            <Link to="/history" className="hidden sm:inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-gradient-to-r from-primary to-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 transition-all px-8 py-4 rounded-xl">
              View All Global Logs
            </Link>
          </div>
          <div className="bg-black/20 p-6 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
            <HistoryList scans={recentScans.slice(0, 6)} onSelect={handleSelectScan} compact />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ScanPage;
