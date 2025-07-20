import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  ShoppingCart, 
  Receipt, 
  Package, 
  DollarSign, 
  CheckSquare,
  FolderOpen,
  Truck,
  BarChart3,
  UserCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  CreditCard,
  Archive,
  UserCog,
  Printer,
  Cog,
  Calculator
} from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  {
    title: "لوحة التحكم",
    icon: BarChart3,
    path: "/dashboard",
    variant: "default"
  },
  {
    title: "المشاريع الطباعية",
    icon: Printer,
    path: "/printing-projects",
    variant: "blue"
  },
  {
    title: "الماكينات والمعدات",
    icon: Cog,
    path: "/machines",
    variant: "purple"
  },
  {
    title: "إدارة المواد الخام",
    icon: Package,
    path: "/raw-materials",
    variant: "orange"
  },
  {
    title: "إدارة الإنتاج",
    icon: Cog,
    path: "/production",
    variant: "blue"
  },
  {
    title: "التكاليف والتسعير",
    icon: Calculator,
    path: "/cost-pricing",
    variant: "yellow"
  },
  {
    title: "إدارة العملاء",
    icon: Users,
    path: "/customers", 
    variant: "green"
  },
  {
    title: "إدارة الطلبات",
    icon: ShoppingCart,
    path: "/orders",
    variant: "orange"
  },
  {
    title: "إدارة الفواتير",
    icon: Receipt,
    path: "/invoices",
    variant: "yellow"
  },
  {
    title: "إدارة المخزون",
    icon: Package,
    path: "/inventory",
    variant: "purple"
  },
  {
    title: "إدارة المصروفات",
    icon: DollarSign,
    path: "/expenses",
    variant: "magenta"
  },
  {
    title: "إدارة المهام",
    icon: CheckSquare,
    path: "/tasks",
    variant: "cyan"
  },
  {
    title: "إدارة التصنيفات",
    icon: FolderOpen,
    path: "/categories",
    variant: "default"
  },
  {
    title: "إدارة الموردين",
    icon: Truck,
    path: "/suppliers",
    variant: "green"
  },
  {
    title: "تقارير المبيعات",
    icon: BarChart3,
    path: "/sales-reports",
    variant: "default"
  },
  {
    title: "تقارير المخزون",
    icon: Archive,
    path: "/inventory-reports", 
    variant: "purple"
  },
  {
    title: "تقارير العملاء",
    icon: UserCheck,
    path: "/customer-reports",
    variant: "cyan"
  },
  {
    title: "إدارة المستخدمين",
    icon: UserCog,
    path: "/users",
    variant: "secondary"
  },
  {
    title: "إدارة الموظفين",
    icon: UserCheck,
    path: "/employees",
    variant: "magenta"
  },
  {
    title: "الإعدادات",
    icon: Settings,
    path: "/settings",
    variant: "secondary"
  }
];

const Sidebar = ({ onLogout, isCollapsed, setIsCollapsed }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full bg-card border-l border-border z-50 transition-all duration-300
        ${isCollapsed ? 'w-0 lg:w-16' : 'w-80'}
        lg:relative lg:z-auto rtl:right-0 rtl:border-l rtl:border-r-0
        ltr:left-0 ltr:border-r ltr:border-l-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border header-gradient">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h1 className="text-lg font-bold text-primary-foreground">
                      نظام الإدارة
                    </h1>
                    <p className="text-sm text-primary-foreground/80">
                      مكاتب الدعاية والإعلان
                    </p>
                  </div>
                  <Building2 className="w-8 h-8 text-primary-foreground flex-shrink-0" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-primary-foreground hover:bg-primary-foreground/10 flex-shrink-0"
              >
                {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {menuItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="block"
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? item.variant as any : "ghost"}
                      className={`
                        w-full justify-start gap-3 h-auto
                        ${isCollapsed ? 'p-3' : 'p-4'}
                        ${isActive ? 'shadow-lg' : 'text-foreground hover:text-foreground'}
                        transition-all duration-300 hover:scale-105 hover:-translate-y-1
                      `}
                    >
                      <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0`} />
                      {!isCollapsed && (
                        <span className="text-right flex-1 font-semibold">
                          {item.title}
                        </span>
                      )}
                    </Button>
                  )}
                </NavLink>
              ))}
            </div>
          </ScrollArea>

          {/* Enhanced Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed && (
              <div className="mb-4 relative group">
                {/* Animated Background */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-xl blur opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
                
                <div className="relative bg-card/80 rounded-xl p-4 border border-border shadow-lg backdrop-blur-sm">
                  {/* Top Glow */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
                  
                  <div className="text-center space-y-3">
                    {/* Avatar */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-60 animate-pulse"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">م</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-sm font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        تطوير وتصميم
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        محمد حرفوش
                      </p>
                      <div className="px-2 py-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-200 dark:border-cyan-800">
                        <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                          01096215170
                        </p>
                      </div>
                    </div>
                    
                    {/* Animated Dots */}
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                  
                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
                </div>
              </div>
            )}
            <Button
              onClick={onLogout}
              variant="destructive"
              className={`${isCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full flex items-center justify-center gap-2'}`}
            >
              {!isCollapsed && <span className="flex-1 text-right">تسجيل الخروج</span>}
              <LogOut className="w-5 h-5 flex-shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;