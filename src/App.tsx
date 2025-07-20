import { useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

// Lazy load all pages to improve initial load time
const Customers = lazy(() => import("./pages/Customers"));
const Orders = lazy(() => import("./pages/Orders"));
const Invoices = lazy(() => import("./pages/Invoices"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Categories = lazy(() => import("./pages/Categories"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const SalesReports = lazy(() => import("./pages/SalesReports"));
const InventoryReports = lazy(() => import("./pages/InventoryReports"));
const CustomerReports = lazy(() => import("./pages/CustomerReports"));
const Users = lazy(() => import("./pages/Users"));
const Employees = lazy(() => import("./pages/Employees"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrintingProjects = lazy(() => import("./pages/PrintingProjects"));
const Machines = lazy(() => import("./pages/Machines"));
const RawMaterials = lazy(() => import("./pages/RawMaterials"));
const Production = lazy(() => import("./pages/Production"));
const CostPricing = lazy(() => import("./pages/CostPricing"));

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <TooltipProvider>
            <Login onLogin={handleLogin} />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background flex">
            <Sidebar 
              onLogout={handleLogout}
              isCollapsed={sidebarCollapsed}
              setIsCollapsed={setSidebarCollapsed}
            />
            <div className="flex-1 flex flex-col">
              <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
              <main className="flex-1">
                <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
                  <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/printing-projects" element={<PrintingProjects />} />
                  <Route path="/machines" element={<Machines />} />
                  <Route path="/raw-materials" element={<RawMaterials />} />
                  <Route path="/production" element={<Production />} />
                  <Route path="/cost-pricing" element={<CostPricing />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/customers/new" element={<Customers />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/new" element={<Orders />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/invoices/new" element={<Invoices />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/inventory/new" element={<Inventory />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/expenses/new" element={<Expenses />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/tasks/new" element={<Tasks />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/sales-reports" element={<SalesReports />} />
                  <Route path="/inventory-reports" element={<InventoryReports />} />
                  <Route path="/customer-reports" element={<CustomerReports />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
};

export default App;
