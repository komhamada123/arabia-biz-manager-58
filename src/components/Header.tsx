import { Button } from "@/components/ui/button";
import { Bell, Search, User, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";

interface HeaderProps {
  onToggleSidebar: () => void;
  currentUser?: {
    name: string;
    role: string;
  };
}

const Header = ({ onToggleSidebar, currentUser }: HeaderProps) => {
  const { selectedCurrency, setSelectedCurrency, getCurrencyByCode } = useCurrency();

  return (
    <header className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Right Side */}
        <div className="flex items-center gap-4 rtl:flex-row-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <span className="sr-only">فتح القائمة</span>
            ☰
          </Button>
        </div>

        {/* Center - Enhanced Developer Credits */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative group cursor-pointer">
            {/* Animated Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl px-8 py-3 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-105">
              
              {/* Top Shine Effect */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              
              <div className="flex items-center gap-4 rtl:flex-row-reverse">
                {/* Avatar with Glow */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-60 animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg drop-shadow-lg">م</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      تطوير وتصميم
                    </p>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    محمد حرفوش - مطور محترف
                  </p>
                  <p className="text-xs text-cyan-400 font-mono">
                    01096215170
                  </p>
                </div>
                
                {/* Side Decorations */}
                <div className="flex flex-col gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-ping delay-300"></div>
                </div>
              </div>
              
              {/* Bottom Shine Effect */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-4 rtl:flex-row-reverse">
          {/* Currency Selector */}
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCurrency.code}
              onChange={(e) => {
                const currency = getCurrencyByCode(e.target.value);
                if (currency) setSelectedCurrency(currency);
              }}
              className="bg-background border border-border rounded px-2 py-1 text-sm text-right rtl:text-right ltr:text-left"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 rtl:-right-1 ltr:-left-1 w-4 h-4 bg-danger rounded-full text-xs text-danger-foreground flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Info */}
          <div className="flex items-center gap-3 rtl:flex-row-reverse">
            <div className="text-right rtl:text-right ltr:text-left">
              <p className="text-sm font-medium">
                {currentUser?.name || "محمد حرفوش"}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.role || "مدير النظام"}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;