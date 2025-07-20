import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Calendar,
  User,
  Package,
  DollarSign,
  Clock
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport 
} from "@/utils/handlers";
import { useCurrency } from "@/contexts/CurrencyContext";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { formatAmount } = useCurrency();
  
  const orders = [
    {
      id: "ORD-001",
      customerName: "شركة النور للإعلان",
      customerEmail: "info@noor-ads.com",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-20",
      status: "مكتمل",
      priority: "عادي",
      items: [
        { name: "تصميم شعار", quantity: 1, price: 1500 },
        { name: "طباعة بروشور", quantity: 100, price: 800 }
      ],
      totalAmount: 2300,
      paidAmount: 2300,
      remainingAmount: 0
    },
    {
      id: "ORD-002",
      customerName: "مؤسسة الفجر التجارية",
      customerEmail: "contact@alfajr.com",
      orderDate: "2024-01-18",
      deliveryDate: "2024-01-25",
      status: "قيد التنفيذ",
      priority: "عالي",
      items: [
        { name: "تصميم موقع إلكتروني", quantity: 1, price: 5000 },
        { name: "إدارة محتوى", quantity: 12, price: 2400 }
      ],
      totalAmount: 7400,
      paidAmount: 3700,
      remainingAmount: 3700
    },
    {
      id: "ORD-003",
      customerName: "شركة الأمل للطباعة",
      customerEmail: "amal@print.com",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-27",
      status: "جديد",
      priority: "متوسط",
      items: [
        { name: "طباعة كروت شخصية", quantity: 500, price: 750 },
        { name: "تصميم أختام", quantity: 3, price: 450 }
      ],
      totalAmount: 1200,
      paidAmount: 0,
      remainingAmount: 1200
    },
    {
      id: "ORD-004",
      customerName: "مكتب الإبداع الإعلاني",
      customerEmail: "creative@ibda.com",
      orderDate: "2024-01-22",
      deliveryDate: "2024-02-05",
      status: "معلق",
      priority: "عالي",
      items: [
        { name: "حملة إعلانية متكاملة", quantity: 1, price: 12000 },
        { name: "تصوير منتجات", quantity: 20, price: 3000 }
      ],
      totalAmount: 15000,
      paidAmount: 5000,
      remainingAmount: 10000
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "status-active";
      case "قيد التنفيذ":
        return "bg-info/10 text-info border border-info/20";
      case "جديد":
        return "status-pending";
      case "معلق":
        return "status-inactive";
      default:
        return "status-pending";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "عالي":
        return "bg-danger/10 text-danger border border-danger/20";
      case "متوسط":
        return "bg-warning/10 text-warning border border-warning/20";
      case "عادي":
        return "bg-success/10 text-success border border-success/20";
      default:
        return "bg-muted/10 text-muted-foreground border border-muted/20";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الطلبات</h1>
          <p className="text-muted-foreground">
            إدارة طلبات العملاء ومتابعة حالة التنفيذ
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <Card className="arabic-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
            <div className="flex items-center space-x-4 space-x-reverse w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث في الطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("طلب")}
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة طلب جديد
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("الطلبات")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="purple"
                onClick={() => handleExport("الطلبات")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <CardTitle className="text-xl">طلب رقم: {order.id}</CardTitle>
                  <Badge className={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                  <Badge className={getPriorityBadge(order.priority)}>
                    {order.priority}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    size="sm" 
                    variant="green"
                    onClick={() => handleView(order.id, "الطلب")}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </Button>
                  <Button 
                    size="sm" 
                    variant="orange"
                    onClick={() => handleEdit(order.id, "الطلب")}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(order.id, "الطلب")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-2 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-2 text-info" />
                  <div>
                    <p className="font-medium text-foreground">تاريخ الطلب</p>
                    <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-2 text-warning" />
                  <div>
                    <p className="font-medium text-foreground">تاريخ التسليم</p>
                    <p className="text-sm text-muted-foreground">{order.deliveryDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 ml-2 text-success" />
                  <div>
                    <p className="font-medium text-foreground">المبلغ الإجمالي</p>
                    <p className="text-sm text-success font-semibold">{formatAmount(order.totalAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Package className="w-4 h-4 ml-2" />
                  عناصر الطلب
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary">{formatAmount(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium">المبلغ المدفوع</p>
                  <p className="text-lg font-bold text-success">{formatAmount(order.paidAmount)}</p>
                </div>
                
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning font-medium">المبلغ المتبقي</p>
                  <p className="text-lg font-bold text-warning">{formatAmount(order.remainingAmount)}</p>
                </div>
                
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">المبلغ الإجمالي</p>
                  <p className="text-lg font-bold text-primary">{formatAmount(order.totalAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-primary">{orders.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-success">
              {orders.filter(o => o.status === "مكتمل").length}
            </p>
            <p className="text-sm text-muted-foreground">طلبات مكتملة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-warning">
              {orders.filter(o => o.status === "قيد التنفيذ").length}
            </p>
            <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-info">
              {orders.filter(o => o.status === "جديد").length}
            </p>
            <p className="text-sm text-muted-foreground">طلبات جديدة</p>
          </CardContent>
        </Card>
      </div>

      {/* Developer Footer */}
      <div className="text-center py-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          تطوير: محمد حرفوش | للتواصل: 01096215170
        </p>
      </div>
    </div>
  );
};

export default Orders;