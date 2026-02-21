import { Shield, ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-shield.png';
import { useAuth } from '@/context/AuthContext';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface HeroSectionProps {
  onHowItWorks: () => void;
}

const benefits = [
  'Detect phishing links and scam websites before you click.',
  'Spot misleading forwards and risky "fake sale" messages.',
  'Get simple, human explanations anyone in your family can understand.',
];

const HeroSection = ({ onHowItWorks }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-background min-h-[90vh] flex flex-col justify-center py-16 md:py-24 lg:py-32 mesh-bg">
      {/* Intense glowing orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3b82f6]/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="mb-8 inline-flex items-center gap-3 rounded-[2rem] border border-primary/30 bg-primary/10 backdrop-blur-xl px-4 py-2 shadow-[0_0_20px_rgba(30,144,255,0.2)]"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <span className="text-sm font-bold tracking-wide text-foreground uppercase">
                PulseGuard Engine v2.0 Live
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              Absolute Security. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#3b82f6] to-cyan-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                Zero Anxiety.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 text-xl text-muted-foreground max-w-lg leading-relaxed font-medium"
            >
              Experience a breakthrough in digital safety. Drag & drop any dubious link, message, or screenshot and watch our AI instantly dismantle hidden threats.
            </motion.p>

            {/* Feature List */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
              }}
              className="mb-10 space-y-5"
            >
              {benefits.map((b, i) => (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  key={i}
                  className="flex items-start gap-4 text-base font-semibold text-foreground/80"
                >
                  <div className="mt-0.5 h-6 w-6 rounded-full bg-safe/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="h-4 w-4 text-safe" />
                  </div>
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              <Button
                size="lg"
                onClick={() => {
                  if (!user) navigate('/auth?mode=register');
                  else navigate('/scanner');
                }}
                className="relative overflow-hidden group gap-2 rounded-2xl px-10 h-14 text-lg font-black shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] bg-gradient-to-r from-primary to-[#3b82f6] border-0"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[500%] transition-transform duration-700 ease-in-out"></div>
                Launch Scanner
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onHowItWorks}
                className="gap-3 rounded-2xl px-10 h-14 text-lg font-bold transition-all hover:bg-secondary/80 border-white/20 bg-white/5 backdrop-blur-lg hover:scale-105"
              >
                View Architecture
                <ArrowDown className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side 3D Tilt Image Component */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: 1200,
              rotateX,
              rotateY,
              zIndex: 50
            }}
            className="flex justify-center items-center lg:justify-end cursor-crosshair h-[600px] w-full relative"
          >
            <motion.div
              style={{
                transformStyle: "preserve-3d"
              }}
              className="relative w-full max-w-[550px] aspect-square rounded-[3rem] p-4 glass-panel border border-white/20 transition-shadow duration-500 ease-out"
              animate={{ boxShadow: isHovered ? "0 40px 100px -20px rgba(59,130,246,0.6)" : "0 20px 40px -10px rgba(0,0,0,0.3)" }}
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/40 to-[#3b82f6]/10 blur-xl mix-blend-screen" />

              {/* Inner floating image layer */}
              <motion.div
                style={{ translateZ: "100px" }}
                className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/30 bg-black/40 backdrop-blur-2xl p-6 shadow-2xl flex items-center justify-center"
              >
                <img
                  src={heroImage}
                  alt="PulseGuard Digital Shield"
                  className="relative w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] object-contain"
                />

                {/* UI Accents on top layer */}
                <motion.div
                  style={{ translateZ: "150px" }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-12 glass-panel px-6 py-4 rounded-2xl border border-white/20 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-background/90"
                >
                  <Shield className="w-8 h-8 text-safe mb-2 animate-pulse" />
                  <span className="text-xl font-black text-foreground">100% Secure</span>
                  <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">Verified System</span>
                </motion.div>

                <motion.div
                  style={{ translateZ: "120px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-10 -top-10 w-40 h-40 border-2 border-primary/40 rounded-full border-dashed opacity-70 pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
