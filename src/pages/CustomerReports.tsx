import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, Download, Star, Calendar } from "lucide-react";

const CustomerReports = () => {
  const customerStats = [
    { title: "إجمالي العملاء", value: "1,543", growth: "+12%", icon: Users },
    { title: "عملاء جدد هذا الشهر", value: "89", growth: "+25%", icon: TrendingUp },
    { title: "متوسط قيمة الطلب", value: "2,450 ر.س", growth: "+8%", icon: DollarSign },
    { title: "معدل الرضا", value: "4.8/5", growth: "+0.3", icon: Star }
  ];

  const topCustomers = [
    { name: "شركة الرياض للإعلان", orders: 45, total: "125,400", lastOrder: "2024-01-15", status: "VIP" },
    { name: "مؤسسة النور للتسويق", orders: 38, total: "98,750", lastOrder: "2024-01-14", status: "VIP" },
    { name: "شركة المستقبل للدعاية", orders: 32, total: "87,200", lastOrder: "2024-01-13", status: "مميز" },
    { name: "متجر الإبداع الرقمي", orders: 28, total: "65,800", lastOrder: "2024-01-12", status: "مميز" },
    { name: "مكتب التصميم الحديث", orders: 24, total: "52,300", lastOrder: "2024-01-11", status: "عادي" }
  ];

  const customerSegments = [
    { segment: "عملاء VIP", count: 45, percentage: 75, revenue: "450,200" },
    { segment: "عملاء مميزون", count: 156, percentage: 55, revenue: "342,800" },
    { segment: "عملاء عاديون", count: 890, percentage: 35, revenue: "287,600" },
    { segment: "عملاء جدد", count: 452, percentage: 15, revenue: "125,400" }
  ];

  const recentActivities = [
    { customer: "شركة الرياض للإعلان", activity: "طلب جديد", amount: "5,200", date: "2024-01-15", type: "order" },
    { customer: "مؤسسة النور للتسويق", activity: "تم الدفع", amount: "3,800", date: "2024-01-14", type: "payment" },
    { customer: "شركة المستقبل للدعاية", activity: "استفسار", amount: "-", date: "2024-01-13", type: "inquiry" },
    { customer: "متجر الإبداع الرقمي", activity: "طلب مكتمل", amount: "2,100", date: "2024-01-12", type: "completed" },
    { customer: "مكتب التصميم الحديث", activity: "تقييم الخدمة", amount: "5/5", date: "2024-01-11", type: "review" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return '🛍️';
      case 'payment': return '💳';
      case 'inquiry': return '❓';
      case 'completed': return '✅';
      case 'review': return '⭐';
      default: return '📝';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تقارير العملاء</h1>
          <p className="text-muted-foreground">تحليل سلوك العملاء والأداء</p>
        </div>
        <div className="flex gap-3">
          <Button variant="gradient" size="sm" className="shadow-colorful hover:shadow-glow">
            <Calendar className="w-4 h-4 ml-2" />
            اختر الفترة
          </Button>
          <Button variant="creative" size="sm" className="shadow-creative hover:shadow-glow">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* إحصائيات العملاء */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Badge 
                variant="secondary" 
                className="bg-creative-green/10 text-creative-green border-creative-green/20 shadow-sm mt-2"
              >
                {stat.growth}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* أفضل العملاء */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              أفضل العملاء
            </CardTitle>
            <CardDescription>العملاء الأكثر نشاطاً وقيمة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-gradient-to-r from-card to-card/50 hover:shadow-colorful hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]">
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {customer.orders} طلب • آخر طلب: {customer.lastOrder}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary">{customer.total} ر.س</p>
                    <Badge 
                      variant={customer.status === "VIP" ? "default" : customer.status === "مميز" ? "secondary" : "outline"}
                      className={
                        customer.status === "VIP" ? "bg-gradient-primary text-white shadow-glow border-0" :
                        customer.status === "مميز" ? "bg-creative-purple text-creative-purple-foreground shadow-creative border-0" :
                        "bg-creative-cyan/10 text-creative-cyan border-creative-cyan/20"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* تصنيف العملاء */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              تصنيف العملاء
            </CardTitle>
            <CardDescription>توزيع العملاء حسب الفئات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{segment.segment}</span>
                    <span className="text-sm text-muted-foreground">{segment.count} عميل</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{segment.percentage}%</span>
                    </div>
                    <span className="font-bold">{segment.revenue} ر.س</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* نشاطات العملاء الأخيرة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            نشاطات العملاء الأخيرة
          </CardTitle>
          <CardDescription>آخر التفاعلات مع العملاء</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-accent/50 bg-gradient-to-r from-card to-accent/20 hover:shadow-creative hover:border-primary/30 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-colorful">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.customer}</p>
                    <p className="text-sm text-muted-foreground">{activity.activity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <span className="text-sm text-muted-foreground">{activity.date}</span>
                  {activity.amount !== "-" && (
                    <span className="font-bold">{activity.amount} ر.س</span>
                  )}
                  {activity.amount === "5/5" && (
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReports;