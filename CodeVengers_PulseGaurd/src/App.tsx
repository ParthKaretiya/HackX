import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import FamilyPage from "./pages/FamilyPage";
import ParentPage from "./pages/ParentPage";
import ChildPage from "./pages/ChildPage";
import NotFound from "./pages/NotFound";
import ParentCyberCellPage from "./pages/ParentCyberCellPage";
import AuthPage from "./pages/AuthPage";
import FamilySetupPage from "./pages/FamilySetupPage";
import ProfilePage from "./pages/ProfilePage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
