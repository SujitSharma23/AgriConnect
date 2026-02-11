import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import FarmerDashboard from "./pages/FarmerDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import Marketplace from "./pages/Marketplace";
import MarketPulse from "./pages/MarketPulse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [role, setRole] = useState<'farmer' | 'business' | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar role={role} onRoleChange={setRole} />
          <Routes>
            <Route path="/" element={<Index onRoleSelect={setRole} />} />
            <Route
              path="/dashboard"
              element={
                role === 'farmer' ? <FarmerDashboard /> :
                role === 'business' ? <BusinessDashboard /> :
                <Navigate to="/" />
              }
            />
            <Route path="/marketplace" element={role ? <Marketplace /> : <Navigate to="/" />} />
            <Route path="/market-pulse" element={role ? <MarketPulse /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
