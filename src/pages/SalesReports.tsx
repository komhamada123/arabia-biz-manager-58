import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, DollarSign, Download, BarChart3, PieChart } from "lucide-react";

const SalesReports = () => {
  const salesData = [
    { period: "اليوم", amount: "15,250", growth: "+12%", orders: 23 },
    { period: "هذا الأسبوع", amount: "89,400", growth: "+8%", orders: 156 },
    { period: "هذا الشهر", amount: "356,800", growth: "+15%", orders: 642 },
    { period: "هذا العام", amount: "2,450,600", growth: "+22%", orders: 4891 }
  ];

  const topProducts = [
    { name: "منتج الطباعة الرقمية", sales: "45,200", quantity: 89 },
    { name: "تصميم هوية بصرية", sales: "38,900", quantity: 67 },
    { name: "إعلانات وسائل التواصل", sales: "32,150", quantity: 123 },
    { name: "تصميم مواقع إلكترونية", sales: "28,750", quantity: 34 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تقارير المبيعات</h1>
          <p className="text-muted-foreground">تتبع أداء المبيعات والإيرادات</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="cyan"
            size="sm"
          >
            <Calendar className="w-4 h-4 ml-2" />
            اختر الفترة
          </Button>
          <Button 
            variant="gradient"
            size="sm"
            className="shadow-glow"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.period}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.amount} ر.س</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {item.orders} طلب
                </p>
                <Badge 
                  variant="secondary" 
                  className="bg-success/10 text-success border border-success/20"
                >
                  {item.growth}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* أفضل المنتجات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              أفضل المنتجات مبيعاً
            </CardTitle>
            <CardDescription>المنتجات الأكثر طلباً هذا الشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.quantity} قطعة</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary">{product.sales} ر.س</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* تحليل المبيعات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              تحليل المبيعات
            </CardTitle>
            <CardDescription>توزيع المبيعات حسب الفئات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الطباعة والإعلان</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>التصميم الجرافيكي</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <span className="text-sm">50%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>المواقع الإلكترونية</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/3 h-2 bg-accent rounded-full"></div>
                  </div>
                  <span className="text-sm">33%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>الخدمات الأخرى</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/4 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <span className="text-sm">25%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تقرير مفصل */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            تقرير المبيعات المفصل
          </CardTitle>
          <CardDescription>آخر 10 مبيعات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: "#INV-001", customer: "شركة الرياض للإعلان", amount: "5,200", date: "2024-01-15", status: "مكتمل" },
              { id: "#INV-002", customer: "مؤسسة النور للتسويق", amount: "3,800", date: "2024-01-14", status: "قيد التنفيذ" },
              { id: "#INV-003", customer: "شركة المستقبل للدعاية", amount: "7,500", date: "2024-01-13", status: "مكتمل" },
              { id: "#INV-004", customer: "متجر الإبداع الرقمي", amount: "2,100", date: "2024-01-12", status: "مكتمل" },
              { id: "#INV-005", customer: "مكتب التصميم الحديث", amount: "4,300", date: "2024-01-11", status: "مكتمل" }
            ].map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{sale.id}</p>
                    <p className="text-sm text-muted-foreground">{sale.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{sale.date}</span>
                  <span className="font-bold">{sale.amount} ر.س</span>
                  <Badge 
                    variant={sale.status === "مكتمل" ? "default" : "secondary"}
                    className={sale.status === "مكتمل" 
                      ? "bg-success/10 text-success border border-success/20" 
                      : "bg-warning/10 text-warning border border-warning/20"
                    }
                  >
                    {sale.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;