import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Role = "normal" | "parent" | "child";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (roles && role && !roles.includes(role)) {
    return (
      <Navigate
        to={role === "child" ? "/child-dashboard" : role === "parent" ? "/parent-dashboard" : "/profile"}
        replace
      />
    );
  }

  return <>{children}</>;
}
