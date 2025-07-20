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
  DollarSign,
  Calendar,
  FileText,
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport 
} from "@/utils/handlers";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const expenses = [
    {
      id: "EXP-001",
      description: "شراء مواد طباعة",
      category: "مواد خام",
      amount: "1,200 ر.س",
      date: "2024-01-15",
      paymentMethod: "تحويل بنكي",
      vendor: "شركة الورق المتميز",
      status: "مدفوع",
      receipt: "RCP-001.pdf",
      notes: "شراء ورق A4 وأحبار طباعة"
    },
    {
      id: "EXP-002",
      description: "فاتورة كهرباء",
      category: "مصاريف تشغيلية",
      amount: "850 ر.س",
      date: "2024-01-18",
      paymentMethod: "خصم مباشر",
      vendor: "شركة الكهرباء السعودية",
      status: "مدفوع",
      receipt: "RCP-002.pdf",
      notes: "فاتورة شهر ديسمبر 2023"
    },
    {
      id: "EXP-003",
      description: "راتب موظف",
      category: "رواتب",
      amount: "4,500 ر.س",
      date: "2024-01-20",
      paymentMethod: "تحويل بنكي",
      vendor: "أحمد محمد الصالح",
      status: "مدفوع",
      receipt: "",
      notes: "راتب شهر يناير 2024"
    },
    {
      id: "EXP-004",
      description: "صيانة معدات الطباعة",
      category: "صيانة",
      amount: "650 ر.س",
      date: "2024-01-22",
      paymentMethod: "نقدي",
      vendor: "مركز الصيانة المتخصص",
      status: "معلق",
      receipt: "",
      notes: "صيانة طابعة HP LaserJet"
    },
    {
      id: "EXP-005",
      description: "اشتراك برنامج التصميم",
      category: "اشتراكات",
      amount: "299 ر.س",
      date: "2024-01-25",
      paymentMethod: "بطاقة ائتمان",
      vendor: "Adobe Creative Cloud",
      status: "مدفوع",
      receipt: "RCP-005.pdf",
      notes: "اشتراك شهري في Adobe CC"
    },
    {
      id: "EXP-006",
      description: "وقود السيارة",
      category: "مصاريف تشغيلية",
      amount: "150 ر.س",
      date: "2024-01-26",
      paymentMethod: "نقدي",
      vendor: "محطة الوقود الوطنية",
      status: "مدفوع",
      receipt: "",
      notes: "تعبئة وقود سيارة التوصيل"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مدفوع":
        return "status-active";
      case "معلق":
        return "status-pending";
      case "مرفوض":
        return "status-inactive";
      default:
        return "status-pending";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "مواد خام":
        return <Receipt className="w-4 h-4" />;
      case "رواتب":
        return <DollarSign className="w-4 h-4" />;
      case "صيانة":
        return <FileText className="w-4 h-4" />;
      case "اشتراكات":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Receipt className="w-4 h-4" />;
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totalAmount = expenses.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount.replace(/[^\d.]/g, ''));
  }, 0);

  const paidAmount = expenses
    .filter(expense => expense.status === "مدفوع")
    .reduce((sum, expense) => {
      return sum + parseFloat(expense.amount.replace(/[^\d.]/g, ''));
    }, 0);

  const pendingAmount = expenses
    .filter(expense => expense.status === "معلق")
    .reduce((sum, expense) => {
      return sum + parseFloat(expense.amount.replace(/[^\d.]/g, ''));
    }, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المصروفات</h1>
          <p className="text-muted-foreground">
            تتبع وإدارة جميع مصروفات الشركة
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
                  placeholder="البحث في المصروفات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("مصروف")}
                className="shadow-glow"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مصروف جديد
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("المصروفات")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="purple"
                onClick={() => handleExport("المصروفات")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <div className="space-y-4">
        {filteredExpenses.map((expense) => (
          <Card key={expense.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <CardTitle className="text-xl">{expense.description}</CardTitle>
                  <Badge className={getStatusBadge(expense.status)}>
                    {expense.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    size="sm" 
                    variant="green"
                    onClick={() => handleView(expense.id, "المصروف")}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </Button>
                  <Button 
                    size="sm" 
                    variant="orange"
                    onClick={() => handleEdit(expense.id, "المصروف")}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(expense.id, "المصروف")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Expense Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  {getCategoryIcon(expense.category)}
                  <div className="mr-2">
                    <p className="font-medium text-foreground">{expense.category}</p>
                    <p className="text-sm text-muted-foreground">التصنيف</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-2 text-info" />
                  <div>
                    <p className="font-medium text-foreground">{expense.date}</p>
                    <p className="text-sm text-muted-foreground">تاريخ المصروف</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 ml-2 text-warning" />
                  <div>
                    <p className="font-medium text-foreground">{expense.paymentMethod}</p>
                    <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 ml-2 text-success" />
                  <div>
                    <p className="font-medium text-success text-lg">{expense.amount}</p>
                    <p className="text-sm text-muted-foreground">المبلغ</p>
                  </div>
                </div>
              </div>

              {/* Vendor and Receipt Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-info/10 rounded-lg border border-info/20">
                  <p className="text-sm text-info font-medium">المورد/البائع</p>
                  <p className="font-semibold text-info">{expense.vendor}</p>
                </div>
                
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning font-medium">الإيصال</p>
                  <p className="font-semibold text-warning">
                    {expense.receipt ? expense.receipt : "لا يوجد إيصال"}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {expense.notes && (
                <div className="p-3 bg-background border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">ملاحظات:</p>
                  <p className="text-foreground">{expense.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expenses Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{totalAmount.toLocaleString()} ر.س</p>
            <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">{paidAmount.toLocaleString()} ر.س</p>
            <p className="text-sm text-muted-foreground">مصروفات مدفوعة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <TrendingDown className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">{pendingAmount.toLocaleString()} ر.س</p>
            <p className="text-sm text-muted-foreground">مصروفات معلقة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold text-info">{expenses.length}</p>
            <p className="text-sm text-muted-foreground">عدد المصروفات</p>
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

export default Expenses;