import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { scanLink, scanContent, checkFileScan } from "@/services/api";
import { ScanResultData } from "@/types/scan";
import { 
  ArrowRight, 
  Link2, 
  FileText, 
  Image as ImageIcon, 
  Loader2, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Bot, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ScanTab = 'link' | 'text' | 'image';

const SUGGESTIONS = [
  {
    title: "Verify Banking Link",
    titleHi: "बैंकिंग लिंक सत्यापित करें",
    subtitle: "Check phishing domain",
    subtitleHi: "फ़िशिंग डोमेन जांचें",
    text: "https://secure-hdfc-banking-login.net/verify",
    tab: "link" as const
  },
  {
    title: "Analyze Urgent SMS",
    titleHi: "तत्काल एसएमएस का विश्लेषण करें",
    subtitle: "Check lottery card fraud",
    subtitleHi: "लॉटरी कार्ड धोखाधड़ी जांचें",
    text: "URGENT: Your SBI net banking account will be suspended in 2 hours due to KYC mismatch. Update now at: https://sbi-kyc-update.org",
    tab: "text" as const
  },
  {
    title: "Inspect Promo Claim",
    titleHi: "प्रोमो दावे का निरीक्षण करें",
    subtitle: "Check voucher fraud",
    subtitleHi: "वाउचर धोखाधड़ी जांचें",
    text: "Congratulations! You have been selected to win a free iPhone 15 Pro. Claim your prize immediately at http://free-prize-claims.xyz/iphone",
    tab: "text" as const
  }
];

const ScanPage = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const [activeTab, setActiveTab] = useState<ScanTab>('link');
  const [inputStr, setInputStr] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<ScanResultData | null>(null);
  
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Rotate loading steps for visual realism
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const loadingMessages = [
    t('scan_analyzing', "Analyzing content..."),
    isHi ? "शीर्षलेखों और यूआरएल संरचना की जांच की जा रही है..." : "Inspecting headers and URL structure...",
    isHi ? "वैश्विक थ्रेट डेटाबेस के विरुद्ध क्रॉस-चेक किया जा रहा है..." : "Cross-checking against global threat databases...",
    isHi ? "एआई हेयुरिस्टिक्स एल्गोरिदम चलाए जा रहे हैं..." : "Running AI heuristics algorithms..."
  ];

  useEffect(() => {
    if (location.state && location.state.initialUrl) {
      setInputStr(location.state.initialUrl);
      setActiveTab('link');
      handleScan(location.state.initialUrl, 'link');
      // Clear state so it doesn't loop
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleScan = async (input: string, type: ScanTab, file?: File | null) => {
    if (!input.trim() && !file) return;
    
    setLoading(true);
    setResult(null);
    try {
      let res;
      if (type === 'link') {
        res = await scanLink(input);
      } else if (type === 'text') {
        res = await scanContent(input);
      } else if (type === 'image' && file) {
        res = await checkFileScan(file);
      }
      if (res) setResult(res);
    } catch (err) {
      // Fallback
      setResult({
        id: crypto.randomUUID(),
        safetyCategory: 'SUSPICIOUS',
        truthCategory: 'UNVERIFIED',
        topic: 'general',
        type: type === 'link' ? 'link' : 'text',
        reasons: [
          isHi ? "विश्लेषण सर्वर से संपर्क नहीं हो सका।" : "Backend analysis server could not be reached.",
          isHi ? "यह एक डेमो सिमुलेशन परिणाम है।" : "This is a simulated demo result."
        ],
        recommendation: isHi ? "कृपया सुनिश्चित करें कि आपका बैकएंड सर्वर पोर्ट 5000 पर चल रहा है।" : "Please ensure your backend server is running on localhost:5000.",
        input: file ? `[Image: ${file.name}]` : input.substring(0, 100),
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleScan(inputStr, activeTab, imageFile);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setInputStr(file.name);
    }
  };

  const triggerSuggestion = (s: typeof SUGGESTIONS[0]) => {
    setActiveTab(s.tab);
    setInputStr(s.text);
    setImageFile(null);
    handleScan(s.text, s.tab);
  };

  const clearScanner = () => {
    setInputStr('');
    setImageFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-background selection:bg-primary selection:text-background">
      <Navbar />

      {/* Decorative premium background light blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <main className="flex-1 container mx-auto px-6 pt-28 pb-16 max-w-4xl flex flex-col justify-center">
        
        {/* Banner header if no result yet */}
        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center mb-10"
            >
              <div className="h-16 w-16 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20">
                <Bot className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight leading-none">
                {t('scan_help')}
              </h1>
              <p className="text-muted-foreground text-[15px] max-w-md font-medium">
                {t('scan_desc')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestion Cards */}
        <AnimatePresence>
          {!result && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerSuggestion(s)}
                  className="flex flex-col text-left p-5 rounded-2xl bg-secondary/30 border border-border/60 hover:bg-secondary/60 hover:border-border/100 hover:scale-[1.02] transition-all duration-300 group shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-500 group-hover:animate-bounce-subtle" />
                    <span className="font-bold text-foreground text-sm tracking-tight">
                      {isHi ? s.titleHi : s.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium mb-3">
                    {isHi ? s.subtitleHi : s.subtitle}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono truncate w-full bg-secondary/80 px-2 py-1 rounded border border-border/40">
                    {s.text}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat input wrapper */}
        <div className="w-full relative">
          <div className="bg-background border border-border rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 focus-within:border-primary/30 focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            
            {/* Sliding Pill Tabs */}
            <div className="flex px-3 pt-3 pb-1 bg-secondary/15 gap-1.5 border-b border-border/30">
              {[
                { id: 'link', icon: Link2, label: t('scan_url') },
                { id: 'text', icon: FileText, label: t('scan_text') },
                { id: 'image', icon: ImageIcon, label: t('scan_image') }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => { setActiveTab(tab.id as ScanTab); setImageFile(null); setInputStr(''); }}
                    className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 overflow-hidden ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-background border border-border/80 shadow-sm rounded-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={onSubmit} className="p-4 bg-background flex flex-col gap-4">
              {activeTab === 'image' ? (
                <div className="flex items-center gap-4 w-full">
                  <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={handleImageChange} />
                  <button 
                    type="button" 
                    onClick={() => fileRef.current?.click()} 
                    className="flex-1 py-6 border border-dashed border-border hover:border-primary/40 rounded-2xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all duration-300 flex flex-col items-center gap-2"
                  >
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    <span>{imageFile ? imageFile.name : t('scan_placeholder_image')}</span>
                  </button>
                </div>
              ) : (
                <textarea
                  value={inputStr}
                  onChange={(e) => setInputStr(e.target.value)}
                  placeholder={activeTab === 'link' ? t('scan_placeholder_url') : t('scan_placeholder_text')}
                  className="w-full resize-none outline-none bg-transparent min-h-[70px] text-[15px] text-foreground placeholder:text-muted-foreground p-2 font-medium"
                  rows={2}
                />
              )}

              <div className="flex justify-between items-center pt-2 border-t border-border/20">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  {isHi ? "पल्सगार्ड इंजन v2.0" : "PulseGuard Engine V2.0"}
                </span>
                
                <div className="flex items-center gap-2">
                  {result && (
                    <button
                      type="button"
                      onClick={clearScanner}
                      className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title={isHi ? "रीसेट करें" : "Reset Scanner"}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading || (!inputStr.trim() && !imageFile)}
                    className="h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Results / Processing Area */}
        <div ref={resultRef} className="mt-8">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="flex gap-5 p-6 md:p-8 rounded-[2rem] bg-secondary/20 border border-border shadow-sm items-center relative overflow-hidden"
              >
                {/* Glowing orbit behind */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                
                <div className="h-12 w-12 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center shrink-0 shadow-sm relative">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                </div>
                
                <div className="space-y-1.5 pt-0.5 z-10">
                  <motion.p 
                    key={loadingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base font-semibold text-foreground"
                  >
                    {loadingMessages[loadingStep]}
                  </motion.p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {t('scan_running_checks')}
                  </p>
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Colored border shadow logic */}
                <div className={`flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-[2rem] border transition-all duration-300 shadow-xl ${
                  result.safetyCategory === 'SAFE' 
                    ? 'border-emerald-500/25 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] shadow-emerald-500/[0.02]' 
                    : result.safetyCategory === 'SUSPICIOUS' 
                    ? 'border-amber-500/25 bg-amber-500/[0.02] dark:bg-amber-500/[0.01] shadow-amber-500/[0.02]' 
                    : 'border-rose-500/25 bg-rose-500/[0.02] dark:bg-rose-500/[0.01] shadow-rose-500/[0.02]'
                }`}>
                  
                  {/* Status Indicator Icon with glow background */}
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                    result.safetyCategory === 'SAFE' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                      : result.safetyCategory === 'SUSPICIOUS' 
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                  }`}>
                    {result.safetyCategory === 'SAFE' ? (
                      <ShieldCheck className="h-6 w-6 animate-pulse" />
                    ) : result.safetyCategory === 'SUSPICIOUS' ? (
                      <HelpCircle className="h-6 w-6" />
                    ) : (
                      <ShieldAlert className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4 pt-1">
                    <div>
                      {/* Safety Category Headline badge */}
                      <span className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 border ${
                        result.safetyCategory === 'SAFE' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                          : result.safetyCategory === 'SUSPICIOUS' 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                      }`}>
                        {result.safetyCategory === 'SAFE' ? t('risk_safe') : 
                         result.safetyCategory === 'SUSPICIOUS' ? t('risk_suspicious') : 
                         t('risk_dangerous')}
                      </span>

                      <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                        {result.safetyCategory === 'SAFE' ? t('scan_safe_title') : 
                         result.safetyCategory === 'SUSPICIOUS' ? t('scan_suspicious_title') : 
                         t('scan_danger_title')}
                      </h3>
                      <p className="text-[15px] text-foreground/80 leading-relaxed font-medium">
                        {result.recommendation}
                      </p>
                    </div>

                    {/* Breakdown panel */}
                    <div className="bg-secondary/25 border border-border/50 rounded-2xl p-5 shadow-inner">
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {t('scan_breakdown')}
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {result.reasons.map((reason, idx) => (
                          <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-[14px] text-foreground/80 flex items-start gap-2.5 font-medium"
                          >
                            <span className="text-blue-500 mt-1 shrink-0">•</span>
                            <span>{reason}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[11px] text-muted-foreground font-semibold flex items-center gap-2">
                      <span>{t('scan_scanned_input')}:</span>
                      <span className="font-mono bg-secondary px-2 py-0.5 rounded border border-border/40 text-[10px] text-foreground select-all truncate max-w-xs md:max-w-md">
                        {result.input}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
