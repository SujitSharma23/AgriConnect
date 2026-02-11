import { Link, useLocation } from 'react-router-dom';
import { Sprout, BarChart3, Store, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  role: 'farmer' | 'business' | null;
  onRoleChange: (role: 'farmer' | 'business' | null) => void;
}

const Navbar = ({ role, onRoleChange }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === 'farmer'
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: Sprout },
        { to: '/marketplace', label: 'Marketplace', icon: Store },
        { to: '/market-pulse', label: 'Market Pulse', icon: BarChart3 },
      ]
    : role === 'business'
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
        { to: '/marketplace', label: 'Marketplace', icon: Store },
        { to: '/market-pulse', label: 'Market Pulse', icon: BarChart3 },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={() => onRoleChange(null)} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl text-foreground">AgriConnect</span>
        </Link>

        {role && (
          <>
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
                {role}
              </span>
              <button
                onClick={() => onRoleChange(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Switch Role
              </button>
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {mobileOpen && role && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => { onRoleChange(null); setMobileOpen(false); }}
                className="mt-2 rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground hover:bg-muted"
              >
                Switch Role
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
