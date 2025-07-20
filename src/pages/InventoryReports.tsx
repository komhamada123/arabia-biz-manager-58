import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, TrendingDown, Download, Archive, BarChart3 } from "lucide-react";

const InventoryReports = () => {
  const inventoryStats = [
    { title: "إجمالي المنتجات", value: "1,247", icon: Package, color: "text-primary" },
    { title: "منتجات نفدت", value: "23", icon: AlertTriangle, color: "text-danger" },
    { title: "منتجات قليلة", value: "45", icon: TrendingDown, color: "text-warning" },
    { title: "قيمة المخزون", value: "156,890 ر.س", icon: BarChart3, color: "text-success" }
  ];

  const lowStockItems = [
    { name: "ورق طباعة A4", current: 5, minimum: 50, category: "مواد طباعة", status: "نفد" },
    { name: "حبر طابعة أسود", current: 12, minimum: 20, category: "مواد طباعة", status: "قليل" },
    { name: "لوحات إعلانية كبيرة", current: 3, minimum: 10, category: "لوحات", status: "قليل" },
    { name: "مواد لاصقة", current: 0, minimum: 25, category: "مواد", status: "نفد" },
    { name: "أقلام تصميم", current: 8, minimum: 15, category: "أدوات", status: "قليل" }
  ];

  const categoryBreakdown = [
    { category: "مواد الطباعة", items: 342, value: "45,200", percentage: 65 },
    { category: "اللوحات الإعلانية", items: 156, value: "32,800", percentage: 23 },
    { category: "الأدوات والمعدات", items: 89, value: "28,400", percentage: 18 },
    { category: "المواد الخام", items: 234, value: "22,100", percentage: 12 },
    { category: "منتجات أخرى", items: 426, value: "28,390", percentage: 8 }
  ];

  const recentMovements = [
    { item: "ورق طباعة A3", type: "خروج", quantity: 50, date: "2024-01-15", reason: "طلب #001" },
    { item: "حبر طابعة ملون", type: "دخول", quantity: 25, date: "2024-01-14", reason: "شراء جديد" },
    { item: "لوحة إعلانية متوسطة", type: "خروج", quantity: 8, date: "2024-01-13", reason: "طلب #002" },
    { item: "مواد لاصقة شفافة", type: "دخول", quantity: 100, date: "2024-01-12", reason: "شراء جديد" },
    { item: "أقلام تصميم ملونة", type: "خروج", quantity: 12, date: "2024-01-11", reason: "طلب #003" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تقارير المخزون</h1>
          <p className="text-muted-foreground">تتبع حالة المخزون والحركة</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="purple"
            size="sm"
          >
            <Archive className="w-4 h-4 ml-2" />
            جرد المخزون
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

      {/* إحصائيات المخزون */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* المنتجات قليلة المخزون */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-danger" />
              تنبيهات المخزون
            </CardTitle>
            <CardDescription>المنتجات التي تحتاج لإعادة تموين</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm">
                      <span className={item.current === 0 ? "text-danger" : "text-warning"}>
                        {item.current}
                      </span>
                      <span className="text-muted-foreground"> / {item.minimum}</span>
                    </p>
                    <Badge 
                      variant={item.status === "نفد" ? "destructive" : "secondary"}
                      className={item.status === "نفد" 
                        ? "bg-danger/10 text-danger border border-danger/20" 
                        : "bg-warning/10 text-warning border border-warning/20"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* توزيع المخزون حسب الفئات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              توزيع المخزون
            </CardTitle>
            <CardDescription>المخزون حسب الفئات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">{category.items} منتج</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{category.percentage}%</span>
                    </div>
                    <span className="font-bold">{category.value} ر.س</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* حركة المخزون الأخيرة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            حركة المخزون الأخيرة
          </CardTitle>
          <CardDescription>آخر العمليات على المخزون</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMovements.map((movement, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    movement.type === "دخول" ? "bg-success" : "bg-danger"
                  }`}></div>
                  <div>
                    <p className="font-medium">{movement.item}</p>
                    <p className="text-sm text-muted-foreground">{movement.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <span className="text-sm text-muted-foreground">{movement.date}</span>
                  <Badge 
                    variant={movement.type === "دخول" ? "default" : "secondary"}
                    className={movement.type === "دخول" 
                      ? "bg-success/10 text-success border border-success/20" 
                      : "bg-info/10 text-info border border-info/20"
                    }
                  >
                    {movement.type} {movement.quantity}
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

export default InventoryReports;