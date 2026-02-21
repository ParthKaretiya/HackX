import { ShieldAlert, PhoneCall, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const CyberCellSection = () => {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Motion Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <section className="relative py-24 md:py-32 z-10 overflow-hidden">
            <div className="absolute inset-0 bg-destructive/5 backdrop-blur-md" />
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-red-500/10 blur-[150px] mix-blend-screen rounded-full -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] mix-blend-screen rounded-full -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div className="mb-6 inline-flex items-center gap-3 rounded-[2rem] border border-destructive/30 bg-destructive/10 backdrop-blur-xl px-4 py-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                            </div>
                            <span className="text-sm font-bold tracking-wide text-red-500 uppercase">
                                Emergency Protocol
                            </span>
                        </div>

                        <h2 className="mb-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            National Cyber Crime
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                Direct Line
                            </span>
                        </h2>
                        <p className="mb-8 text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
                            If you or your family are actively being scammed, threatened, or blackmailed online, do not panic. PulseGuard provides a direct conduit to the National Cyber Crime portal for immediate help.
                        </p>

                        <motion.ul className="mb-10 space-y-4">
                            {[
                                "Call 1930 immediately for financial fraud.",
                                "Instantly file a cyber complaint report.",
                                "Access local state nodal agency numbers."
                            ].map((text, i) => (
                                <motion.li key={i} className="flex items-center gap-4 text-base font-semibold text-foreground/80">
                                    <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                                        <ShieldAlert className="h-4 w-4 text-destructive" />
                                    </div>
                                    {text}
                                </motion.li>
                            ))}
                        </motion.ul>

                        <Button
                            size="lg"
                            onClick={() => navigate('/cyber-cell')}
                            className="relative overflow-hidden group gap-2 rounded-2xl px-10 h-14 text-lg font-black shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(239,68,68,0.6)] bg-gradient-to-r from-red-600 to-orange-600 border-0 text-white"
                        >
                            <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[30deg] -translate-x-[200%] group-hover:translate-x-[500%] transition-transform duration-700 ease-in-out"></div>
                            Access Cyber Cell Portal
                            <ArrowRight className="h-5 w-5 ml-1" />
                        </Button>
                    </motion.div>

                    {/* Right Side: 3D Holographic Card */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{ perspective: 1200, rotateX, rotateY }}
                        className="flex justify-center lg:justify-end cursor-crosshair h-[500px] w-full relative"
                    >
                        <motion.div
                            style={{ transformStyle: "preserve-3d" }}
                            className="relative w-full max-w-[450px] aspect-[4/5] rounded-[3rem] p-4 glass-panel border border-red-500/20"
                            animate={{ boxShadow: isHovered ? "0 40px 100px -20px rgba(239,68,68,0.6)" : "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                        >
                            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-red-500/30 to-orange-500/10 blur-xl mix-blend-screen" />

                            <motion.div
                                style={{ translateZ: "50px" }}
                                className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0f1115]/90 backdrop-blur-2xl p-8 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center p-4 shadow-xl">
                                            <ShieldAlert className="w-full h-full text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white">Emergency Center</h3>
                                            <p className="text-red-400 font-bold tracking-widest text-xs uppercase mt-1">Status: Active</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <PhoneCall className="w-5 h-5 text-red-400" />
                                                <span className="text-white font-semibold">Dial 1930</span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <ExternalLink className="w-5 h-5 text-orange-400" />
                                                <span className="text-white font-semibold">cybercrime.gov.in</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs text-muted-foreground text-center font-medium mt-8 border-t border-white/10 pt-6">
                                    Government of India National Cyber Crime Reporting Portal integration.
                                </div>

                                {/* Floating Elements */}
                                <motion.div
                                    style={{ translateZ: "100px" }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-4 -top-4 glass-panel px-4 py-2 rounded-xl border border-red-500/20 shadow-[0_10px_40px_rgba(239,68,68,0.5)] bg-background/90"
                                >
                                    <span className="text-sm font-black text-red-500">Fast Response</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CyberCellSection;
