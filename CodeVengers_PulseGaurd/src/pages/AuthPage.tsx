import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type Role = "parent" | "child";

const AuthPage = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const { user, role, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [r, setR] = useState<Role>("parent");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const flow = useMemo<"normal" | "family">(() => {
    const m = (search.get("mode") || "normal").toLowerCase();
    return m === "family" ? "family" : "normal";
  }, [search]);

  useEffect(() => {
    if (user && role) {
      if (role === "parent") navigate("/parent-dashboard", { replace: true });
      else if (role === "child") navigate("/child-dashboard", { replace: true });
      else navigate("/scanner", { replace: true });
    }
  }, [user, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password, r);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Authentication failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden mesh-bg">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} as={motion.div} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3b82f6]/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} as={motion.div} />

      <Navbar />
      <section className="py-20 md:py-32 relative z-10 flex flex-col items-center justify-center container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#3b82f6]">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-base text-muted-foreground max-w-sm mx-auto">
            {mode === "login" ? "Access your dashboard to continue securing your digital life." : "Secure your and your family's digital footprint today."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
          style={{ perspective: "1000px" }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={handleSubmit}
            className="glass-panel space-y-5 rounded-3xl p-8 transform-gpu transition-all hover:shadow-primary/10 hover:shadow-2xl border border-white/10 dark:border-white/5"
          >
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="mb-1.5 block text-sm font-semibold text-foreground/80">
                    Full Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="h-12 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground/80">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground/80">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              />
            </div>

            <AnimatePresence mode="wait">
              {mode === "register" && flow === "family" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="mb-1.5 block text-sm font-semibold text-foreground/80">
                    Role in Family
                  </label>
                  <div className="relative">
                    <select
                      value={r}
                      onChange={(e) => setR(e.target.value as Role)}
                      className="h-12 w-full appearance-none rounded-xl border border-border/50 bg-background/50 px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    >
                      <option value="parent">Parent</option>
                      <option value="child">Child</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === "register" && flow === "normal" && (
              <input type="hidden" value="normal" />
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full h-12 gap-2 rounded-xl text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all bg-gradient-to-r from-primary to-[#3b82f6] border-0"
              >
                {submitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  </motion.div>
                ) : (
                  mode === "login" ? "Login Securely" : "Create Account"
                )}
              </Button>
            </motion.div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                {mode === "login"
                  ? "Don't have an account? Create one"
                  : "Already registered? Sign in"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default AuthPage;
