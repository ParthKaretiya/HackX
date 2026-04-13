import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const ScanPage = lazy(() => import("./pages/ScanPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const FamilyPage = lazy(() => import("./pages/FamilyPage"));
const ParentPage = lazy(() => import("./pages/ParentPage"));
const ChildPage = lazy(() => import("./pages/ChildPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ParentCyberCellPage = lazy(() => import("./pages/ParentCyberCellPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const FamilySetupPage = lazy(() => import("./pages/FamilySetupPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg font-black text-primary animate-pulse tracking-widest uppercase">Initializing Core...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
              {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected routes */}
            <Route
              path="/scanner"
              element={
                <ProtectedRoute roles={["normal", "parent", "child"]}>
                  <ScanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute roles={["normal", "parent", "child"]}>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/family"
              element={
                <ProtectedRoute roles={["normal", "parent", "child"]}>
                  <FamilyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/family-setup"
              element={
                <ProtectedRoute>
                  <FamilySetupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["normal"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent-dashboard"
              element={
                <ProtectedRoute roles={["parent"]}>
                  <ParentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cyber-cell"
              element={
                <ProtectedRoute roles={["normal", "parent", "child"]}>
                  <ParentCyberCellPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/child-dashboard"
              element={
                <ProtectedRoute roles={["child"]}>
                  <ChildPage />
                </ProtectedRoute>
              }
            />

            {/* Legacy redirects */}
            <Route path="/scan" element={<Navigate to="/scanner" replace />} />
            <Route
              path="/parent"
              element={<Navigate to="/parent-dashboard" replace />}
            />
            <Route
              path="/child"
              element={<Navigate to="/child-dashboard" replace />}
            />

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
