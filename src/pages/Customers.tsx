import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Star,
  Phone,
  Mail,
  MapPin,
  Award,
  ArrowLeft,
  Save
} from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "@/hooks/use-toast";
import { 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport 
} from "@/utils/handlers";

const Customers = () => {
  const { formatAmount } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isAddingNew = location.pathname === "/customers/new";
  
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم بنجاح",
      description: "تم إضافة العميل الجديد بنجاح",
      variant: "default",
    });

    // Reset form and navigate back
    setNewCustomer({ name: "", email: "", phone: "", address: "", notes: "" });
    navigate("/customers");
  };
  
  const customers = [
    {
      id: 1,
      name: "شركة النور للإعلان",
      email: "info@noor-ads.com",
      phone: "01234567890",
      address: "الرياض، السعودية",
      points: 150,
      totalOrders: 25,
      totalSpent: 45000,
      status: "نشط",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "مؤسسة الفجر التجارية",
      email: "contact@alfajr.com",
      phone: "01234567891",
      address: "جدة، السعودية",
      points: 89,
      totalOrders: 12,
      totalSpent: 28500,
      status: "نشط",
      joinDate: "2023-03-20"
    },
    {
      id: 3,
      name: "شركة الأمل للطباعة",
      email: "amal@print.com",
      phone: "01234567892",
      address: "الدمام، السعودية",
      points: 45,
      totalOrders: 8,
      totalSpent: 15200,
      status: "معلق",
      joinDate: "2023-05-10"
    },
    {
      id: 4,
      name: "مكتب الإبداع الإعلاني",
      email: "creative@ibda.com",
      phone: "01234567893",
      address: "الخبر، السعودية",
      points: 220,
      totalOrders: 35,
      totalSpent: 67800,
      status: "نشط",
      joinDate: "2022-11-05"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إذا كان المستخدم في صفحة إضافة عميل جديد
  if (isAddingNew) {
    return (
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">إضافة عميل جديد</h1>
            <p className="text-muted-foreground">
              إضافة عميل جديد إلى النظام
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/customers")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للقائمة
          </Button>
        </div>

        {/* Add Customer Form */}
        <Card className="arabic-card">
          <CardHeader>
            <CardTitle>بيانات العميل</CardTitle>
            <CardDescription>يرجى ملء جميع البيانات المطلوبة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم العميل *</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="اسم الشركة أو العميل"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="01234567890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <Input
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="العنوان بالتفصيل"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={newCustomer.notes}
                onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="أي ملاحظات إضافية حول العميل"
                rows={3}
              />
            </div>
          </CardContent>
          <CardContent className="pt-0">
            <div className="flex gap-4">
              <Button
                onClick={handleAddCustomer}
                className="flex items-center gap-2"
                size="lg"
              >
                <Save className="w-4 h-4" />
                حفظ العميل
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/customers")}
                size="lg"
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة العملاء</h1>
          <p className="text-muted-foreground">
            إدارة بيانات العملاء ونظام النقاط
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <Card className="arabic-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute rtl:right-3 ltr:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث في العملاء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rtl:pr-10 ltr:pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <Button 
                variant="green"
                size="lg"
                className="flex items-center gap-2 shadow-glow hover:scale-105 transform transition-all duration-300"
                onClick={() => navigate("/customers/new")}
              >
                <Plus className="w-5 h-5" />
                إضافة عميل جديد
              </Button>
              <Button 
                variant="cyan"
                size="lg"
                className="flex items-center gap-2 hover:scale-105 transform transition-all duration-300"
                onClick={() => handleImport("العملاء")}
              >
                <Upload className="w-5 h-5" />
                استيراد Excel
              </Button>
              <Button 
                variant="orange"
                size="lg"
                className="flex items-center gap-2 hover:scale-105 transform transition-all duration-300"
                onClick={() => handleExport("العملاء")}
              >
                <Download className="w-5 h-5" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <Badge 
                  className={customer.status === "نشط" ? "status-active" : "status-pending"}
                >
                  {customer.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2 rtl:flex-row-reverse">
                <Mail className="w-4 h-4" />
                {customer.email}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground gap-2 rtl:flex-row-reverse">
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2 rtl:flex-row-reverse">
                  <MapPin className="w-4 h-4" />
                  {customer.address}
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{customer.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">إجمالي الطلبات</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-success">{formatAmount(customer.totalSpent)}</p>
                  <p className="text-xs text-muted-foreground">إجمالي المشتريات</p>
                </div>
              </div>

              {/* Points System */}
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <Award className="w-5 h-5 text-warning" />
                  <span className="font-medium text-warning">نقاط الولاء</span>
                </div>
                <div className="flex items-center gap-1 rtl:flex-row-reverse">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="font-bold text-warning">{customer.points}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="gradient"
                  className="flex-1 flex items-center gap-2 hover:scale-105 transform transition-all duration-300"
                  onClick={() => handleEdit(customer.id.toString(), "العميل")}
                >
                  <Edit className="w-4 h-4" />
                  تعديل
                </Button>
                <Button 
                  size="sm" 
                  variant="purple" 
                  className="flex-1 hover:scale-105 transform transition-all duration-300"
                  onClick={() => handleView(customer.id.toString(), "العميل")}
                >
                  عرض التفاصيل
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => handleDelete(customer.id.toString(), "العميل")}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-primary">{customers.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي العملاء</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-success">
              {customers.filter(c => c.status === "نشط").length}
            </p>
            <p className="text-sm text-muted-foreground">العملاء النشطين</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-warning">
              {customers.reduce((sum, customer) => sum + customer.points, 0)}
            </p>
            <p className="text-sm text-muted-foreground">إجمالي النقاط</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-info">
              {customers.reduce((sum, customer) => sum + customer.totalOrders, 0)}
            </p>
            <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
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

export default Customers;