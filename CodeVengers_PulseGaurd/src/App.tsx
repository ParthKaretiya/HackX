import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";

const Index = lazy(() => import("./pages/Index"));
const ScanPage = lazy(() => import("./pages/ScanPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const FamilyPage = lazy(() => import("./pages/FamilyPage"));
const ParentPage = lazy(() => import("./pages/ParentPage"));
const ChildPage = lazy(() => import("./pages/ChildPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ParentCyberCellPage = lazy(() => import("./pages/ParentCyberCellPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border border-foreground/10 border-t-foreground/50"
      />
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Preloader />
            <ScrollProgress />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected routes */}
                <Route path="/scanner" element={<ProtectedRoute roles={["normal", "parent", "child"]}><ScanPage /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute roles={["normal", "parent", "child"]}><HistoryPage /></ProtectedRoute>} />
                <Route path="/family" element={<ProtectedRoute roles={["normal", "parent", "child"]}><FamilyPage /></ProtectedRoute>} />
                <Route path="/family-setup" element={<Navigate to="/family" replace />} />
                <Route path="/profile" element={<ProtectedRoute roles={["normal", "parent", "child"]}><ProfilePage /></ProtectedRoute>} />
                <Route path="/parent-dashboard" element={<ProtectedRoute roles={["parent"]}><ParentPage /></ProtectedRoute>} />
                <Route path="/cyber-cell" element={<ProtectedRoute roles={["normal", "parent", "child"]}><ParentCyberCellPage /></ProtectedRoute>} />
                <Route path="/child-dashboard" element={<ProtectedRoute roles={["child"]}><ChildPage /></ProtectedRoute>} />

                {/* Legacy redirects */}
                <Route path="/scan" element={<Navigate to="/scanner" replace />} />
                <Route path="/parent" element={<Navigate to="/parent-dashboard" replace />} />
                <Route path="/child" element={<Navigate to="/child-dashboard" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
