import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  ShoppingCart, 
  Receipt, 
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const Dashboard = () => {
  const { formatAmount } = useCurrency();
  const navigate = useNavigate();
  const stats = [
    {
      title: "إجمالي العملاء",
      value: "1,247",
      change: "+12%",
      isPositive: true,
      icon: Users,
      color: "bg-creative-green"
    },
    {
      title: "الطلبات الجديدة",
      value: "89",
      change: "+5%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-creative-cyan"
    },
    {
      title: "الفواتير المعلقة",
      value: "23",
      change: "-8%",
      isPositive: false,
      icon: Receipt,
      color: "bg-creative-orange"
    },
    {
      title: "المنتجات المتاحة",
      value: "456",
      change: "+3%",
      isPositive: true,
      icon: Package,
      color: "bg-creative-purple"
    }
  ];

  const quickActions = [
    {
      title: "إضافة عميل جديد",
      description: "إضافة عميل جديد إلى النظام",
      icon: Users,
      color: "green",
      path: "/customers/new"
    },
    {
      title: "إنشاء طلب جديد",
      description: "إنشاء طلب جديد للعميل",
      icon: ShoppingCart,
      color: "cyan",
      path: "/orders/new"
    },
    {
      title: "إنشاء فاتورة",
      description: "إنشاء فاتورة جديدة",
      icon: Receipt,
      color: "orange",
      path: "/invoices/new"
    },
    {
      title: "إضافة منتج",
      description: "إضافة منتج جديد للمخزون",
      icon: Package,
      color: "purple",
      path: "/inventory/new"
    },
    {
      title: "تسجيل مصروف",
      description: "تسجيل مصروف جديد",
      icon: DollarSign,
      color: "destructive",
      path: "/expenses/new"
    },
    {
      title: "إضافة مهمة",
      description: "إضافة مهمة جديدة",
      icon: Calendar,
      color: "gradient",
      path: "/tasks/new"
    }
  ];

  const recentActivities = [
    {
      action: "تم إنشاء فاتورة جديدة",
      client: "شركة النور للإعلان",
      amount: 2500,
      time: "منذ 5 دقائق"
    },
    {
      action: "تم إضافة عميل جديد",
      client: "مؤسسة الفجر التجارية",
      amount: null,
      time: "منذ 15 دقيقة"
    },
    {
      action: "تم تحديث طلب",
      client: "شركة الأمل للطباعة",
      amount: 1800,
      time: "منذ 30 دقيقة"
    },
    {
      action: "تم دفع فاتورة",
      client: "مكتب الإبداع الإعلاني",
      amount: 3200,
      time: "منذ ساعة"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-muted-foreground">
            مرحباً بك في نظام إدارة مكاتب الدعاية والإعلان
          </p>
        </div>
        <div className="text-right rtl:text-right ltr:text-left text-sm text-muted-foreground">
          {new Date().toLocaleDateString('ar-SA')}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="arabic-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2 gap-1 rtl:flex-row-reverse">
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-danger" />
                    )}
                    <span className={`text-sm ${stat.isPositive ? 'text-success' : 'text-danger'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="arabic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:flex-row-reverse">
              <Activity className="w-5 h-5" />
              الإجراءات السريعة
            </CardTitle>
            <CardDescription>
              الوصول السريع للإجراءات الأكثر استخداماً
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.color as "green" | "cyan" | "orange" | "purple" | "destructive" | "gradient"}
                  size="lg"
                  className="h-auto p-4 justify-start text-right group hover:shadow-glow"
                  onClick={() => navigate(action.path)}
                >
                  <div className="cursor-pointer w-full">
                    <div className="flex items-center gap-3 rtl:flex-row-reverse">
                      <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-right rtl:text-right ltr:text-left">
                        <p className="font-medium text-current">
                          {action.title}
                        </p>
                        <p className="text-sm opacity-90">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="arabic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:flex-row-reverse">
              <FileText className="w-5 h-5" />
              النشاطات الأخيرة
            </CardTitle>
            <CardDescription>
              آخر العمليات التي تمت في النظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="text-right rtl:text-right ltr:text-left">
                    <p className="font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.client}
                    </p>
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    {activity.amount && (
                      <p className="font-medium text-success">
                        {formatAmount(activity.amount)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="arabic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:flex-row-reverse">
              <BarChart3 className="w-5 h-5" />
              إحصائيات المبيعات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-dashed border-primary/20 flex flex-col items-center justify-center space-y-3 hover:border-primary/40 transition-colors">
              <BarChart3 className="w-16 h-16 text-primary animate-pulse" />
              <p className="text-foreground font-medium">إحصائيات المبيعات الشهرية</p>
              <p className="text-muted-foreground text-sm">سيتم إضافة الرسم البياني قريباً</p>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <div className="w-3 h-3 bg-creative-orange rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                <div className="w-3 h-3 bg-creative-cyan rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-creative-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="arabic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl:flex-row-reverse">
              <PieChart className="w-5 h-5" />
              توزيع العملاء حسب النوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg border-2 border-dashed border-secondary/20 flex flex-col items-center justify-center space-y-3 hover:border-secondary/40 transition-colors">
              <PieChart className="w-16 h-16 text-secondary animate-pulse" />
              <p className="text-foreground font-medium">توزيع العملاء حسب النوع</p>
              <p className="text-muted-foreground text-sm">سيتم إضافة الرسم البياني قريباً</p>
              <div className="flex space-x-1 rtl:space-x-reverse">
                <div className="w-2 h-8 bg-creative-green rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                <div className="w-2 h-6 bg-creative-yellow rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-10 bg-creative-magenta rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                <div className="w-2 h-7 bg-creative-cyan rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;