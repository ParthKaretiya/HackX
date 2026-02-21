import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export type Role = "normal" | "parent" | "child";

interface User {
  uid: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  lastLogin?: Date;
  parentUid?: string;
  parentEmail?: string;
  linkedChildren?: string[];
}

interface AuthContextType {
  user: User | null;
  role: Role | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  updateRole: (role: Role, parentEmail?: string) => Promise<void>;
  linkChildAccount: (childCode: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AUTH_USER_KEY = "pulseguard_auth_user";
const AUTH_USERS_KEY = "pulseguard_users";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const u = JSON.parse(raw) as User;
      setUser({ ...u, createdAt: new Date(u.createdAt), lastLogin: u.lastLogin ? new Date(u.lastLogin) : undefined });
      setRole(u.role);
    }
    setLoading(false);
  }, []);

  const saveCurrentUser = (u: User) => {
    setUser(u);
    setRole(u.role);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
    const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "{}") as Record<string, { user: User; password: string }>;
    users[u.email] = { user: u, password: users[u.email]?.password || "" };
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "{}") as Record<string, { user: User; password: string }>;
    const record = users[email];
    if (!record || record.password !== password) {
      const uid = crypto.randomUUID();
      const newUser: User = {
        uid,
        name: email.split("@")[0],
        email,
        role: "normal",
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      users[email] = { user: newUser, password };
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
      saveCurrentUser(newUser);
    } else {
      const u = { ...record.user, lastLogin: new Date() };
      saveCurrentUser(u);
    }
  };

  const register = async (name: string, email: string, password: string, r: Role) => {
    const uid = crypto.randomUUID();
    const newUser: User = {
      uid,
      name,
      email,
      role: r,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "{}") as Record<string, { user: User; password: string }>;
    users[email] = { user: newUser, password };
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
    saveCurrentUser(newUser);
  };

  const updateRole = async (r: Role, parentEmail?: string) => {
    if (!user) return;
    const updated: User = { ...user, role: r, parentEmail };
    saveCurrentUser(updated);
  };

  const linkChildAccount = async (childCode: string) => {
    if (!user || user.role !== "parent") return;
    const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "{}") as Record<string, { user: User; password: string }>;

    // Find the child in users mapping by checking their UID matching the code
    const childEntry = Object.values(users).find(u => u.user.uid.split('-')[0].toUpperCase() === childCode.toUpperCase() && u.user.role === "child");
    if (!childEntry) return;

    // Update parent
    const updatedChildren = user.linkedChildren ? [...user.linkedChildren] : [];
    if (!updatedChildren.includes(childCode)) {
      updatedChildren.push(childCode);
    }
    const updatedParent: User = { ...user, linkedChildren: updatedChildren };
    users[user.email].user = updatedParent;
    saveCurrentUser(updatedParent);

    // Update child record
    const childData = childEntry.user;
    childData.parentUid = user.uid;
    users[childData.email].user = childData;

    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  };

  const logout = async () => {
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, isAuthenticated: !!user, login, register, updateRole, linkChildAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useRequireRole = (allowed: Role) => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    if (role !== allowed) {
      if (role === "child")
        navigate("/child-dashboard", { replace: true, state: { from: location.pathname } });
      else if (role === "parent")
        navigate("/parent-dashboard", { replace: true, state: { from: location.pathname } });
      else
        navigate("/auth", { replace: true, state: { from: location.pathname } });
    }
  }, [role, allowed, loading, navigate, location.pathname]);
};
