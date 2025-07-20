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
  Receipt,
  Calendar,
  User,
  DollarSign,
  FileText,
  Clock,
  Send
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport,
  handleSend 
} from "@/utils/handlers";
import { useCurrency } from "@/contexts/CurrencyContext";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { formatAmount } = useCurrency();
  
  const invoices = [
    {
      id: "INV-2024-001",
      customerName: "شركة النور للإعلان",
      customerEmail: "info@noor-ads.com",
      issueDate: "2024-01-15",
      dueDate: "2024-02-14",
      status: "مدفوعة",
      totalAmount: 2300,
      paidAmount: 2300,
      remainingAmount: 0,
      items: [
        { description: "تصميم شعار", quantity: 1, unitPrice: 1500, total: 1500 },
        { description: "طباعة بروشور", quantity: 100, unitPrice: 8, total: 800 }
      ]
    },
    {
      id: "INV-2024-002",
      customerName: "مؤسسة الفجر التجارية",
      customerEmail: "contact@alfajr.com",
      issueDate: "2024-01-18",
      dueDate: "2024-02-17",
      status: "مرسلة",
      totalAmount: 7400,
      paidAmount: 3700,
      remainingAmount: 3700,
      items: [
        { description: "تصميم موقع إلكتروني", quantity: 1, unitPrice: 5000, total: 5000 },
        { description: "إدارة محتوى شهرية", quantity: 12, unitPrice: 200, total: 2400 }
      ]
    },
    {
      id: "INV-2024-003",
      customerName: "شركة الأمل للطباعة",
      customerEmail: "amal@print.com",
      issueDate: "2024-01-20",
      dueDate: "2024-02-19",
      status: "مسودة",
      totalAmount: 1200,
      paidAmount: 0,
      remainingAmount: 1200,
      items: [
        { description: "طباعة كروت شخصية", quantity: 500, unitPrice: 1.5, total: 750 },
        { description: "تصميم أختام", quantity: 3, unitPrice: 150, total: 450 }
      ]
    },
    {
      id: "INV-2024-004",
      customerName: "مكتب الإبداع الإعلاني",
      customerEmail: "creative@ibda.com",
      issueDate: "2024-01-22",
      dueDate: "2024-02-21",
      status: "متأخرة",
      totalAmount: 15000,
      paidAmount: 5000,
      remainingAmount: 10000,
      items: [
        { description: "حملة إعلانية متكاملة", quantity: 1, unitPrice: 12000, total: 12000 },
        { description: "تصوير منتجات", quantity: 20, unitPrice: 150, total: 3000 }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مدفوعة":
        return "status-active";
      case "مرسلة":
        return "bg-info/10 text-info border border-info/20";
      case "مسودة":
        return "status-pending";
      case "متأخرة":
        return "status-inactive";
      default:
        return "status-pending";
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الفواتير</h1>
          <p className="text-muted-foreground">
            إدارة فواتير العملاء ومتابعة الدفعات
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
                  placeholder="البحث في الفواتير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("فاتورة")}
                className="shadow-glow"
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء فاتورة جديدة
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("الفواتير")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="purple"
                onClick={() => handleExport("الفواتير")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <CardTitle className="text-xl">فاتورة رقم: {invoice.id}</CardTitle>
                  <Badge className={getStatusBadge(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    size="sm" 
                    variant="green"
                    onClick={() => handleView(invoice.id, "الفاتورة")}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </Button>
                  <Button 
                    size="sm" 
                    variant="cyan"
                    onClick={() => handleSend(invoice.id, "الفاتورة")}
                  >
                    <Send className="w-4 h-4 ml-2" />
                    إرسال
                  </Button>
                  <Button 
                    size="sm" 
                    variant="orange"
                    onClick={() => handleEdit(invoice.id, "الفاتورة")}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(invoice.id, "الفاتورة")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Invoice Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-2 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{invoice.customerName}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customerEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-2 text-info" />
                  <div>
                    <p className="font-medium text-foreground">تاريخ الإصدار</p>
                    <p className="text-sm text-muted-foreground">{invoice.issueDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-2 text-warning" />
                  <div>
                    <p className="font-medium text-foreground">تاريخ الاستحقاق</p>
                    <p className="text-sm text-muted-foreground">{invoice.dueDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 ml-2 text-success" />
                  <div>
                    <p className="font-medium text-foreground">المبلغ الإجمالي</p>
                    <p className="text-sm text-success font-semibold">{formatAmount(invoice.totalAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <FileText className="w-4 h-4 ml-2" />
                  بنود الفاتورة
                </h4>
                <div className="space-y-2">
                  {invoice.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{item.description}</p>
                        <p className="text-sm text-muted-foreground">
                          الكمية: {item.quantity} × {formatAmount(item.unitPrice)}
                        </p>
                      </div>
                      <p className="font-semibold text-primary">{formatAmount(item.total)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium">المبلغ المدفوع</p>
                  <p className="text-lg font-bold text-success">{formatAmount(invoice.paidAmount)}</p>
                </div>
                
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning font-medium">المبلغ المتبقي</p>
                  <p className="text-lg font-bold text-warning">{formatAmount(invoice.remainingAmount)}</p>
                </div>
                
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">المبلغ الإجمالي</p>
                  <p className="text-lg font-bold text-primary">{formatAmount(invoice.totalAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoices Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-primary">{invoices.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-success">
              {invoices.filter(i => i.status === "مدفوعة").length}
            </p>
            <p className="text-sm text-muted-foreground">فواتير مدفوعة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-warning">
              {invoices.filter(i => i.status === "مرسلة").length}
            </p>
            <p className="text-sm text-muted-foreground">فواتير مرسلة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-danger">
              {invoices.filter(i => i.status === "متأخرة").length}
            </p>
            <p className="text-sm text-muted-foreground">فواتير متأخرة</p>
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

export default Invoices;