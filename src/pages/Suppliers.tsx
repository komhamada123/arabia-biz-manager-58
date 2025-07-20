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
  Truck,
  Phone,
  Mail,
  MapPin,
  Star,
  Package,
  DollarSign,
  Calendar,
  User,
  Building2
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport 
} from "@/utils/handlers";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const suppliers = [
    {
      id: "SUP-001",
      name: "شركة الورق المتميز",
      contactPerson: "أحمد محمد السعود",
      email: "info@paper-excel.com",
      phone: "01234567890",
      address: "الرياض، المملكة العربية السعودية",
      category: "مواد الطباعة",
      rating: 4.8,
      totalOrders: 45,
      totalSpent: "125,600 ر.س",
      lastOrderDate: "2024-01-20",
      status: "نشط",
      paymentTerms: "30 يوم",
      products: ["ورق A4", "ورق A3", "ورق فوتوغرافي", "مغلفات"]
    },
    {
      id: "SUP-002",
      name: "مؤسسة التقنية الحديثة",
      contactPerson: "سارة عبدالله الراشد",
      email: "sales@modern-tech.sa",
      phone: "01234567891",
      address: "جدة، المملكة العربية السعودية",
      category: "أحبار ومستلزمات",
      rating: 4.5,
      totalOrders: 32,
      totalSpent: "89,400 ر.س",
      lastOrderDate: "2024-01-18",
      status: "نشط",
      paymentTerms: "15 يوم",
      products: ["حبر أسود", "حبر ملون", "خراطيش الطابعة", "قطع غيار"]
    },
    {
      id: "SUP-003",
      name: "مصنع اللوحات الذكية",
      contactPerson: "محمد خالد العثمان",
      email: "orders@smart-boards.com",
      phone: "01234567892",
      address: "الدمام، المملكة العربية السعودية",
      category: "لوحات إعلانية",
      rating: 4.9,
      totalOrders: 28,
      totalSpent: "245,000 ر.س",
      lastOrderDate: "2024-01-15",
      status: "نشط",
      paymentTerms: "45 يوم",
      products: ["لوحات PVC", "لوحات أكريليك", "لوحات معدنية", "إضاءة LED"]
    },
    {
      id: "SUP-004",
      name: "شركة البلاستيك المتطور",
      contactPerson: "فاطمة أحمد الزهراني",
      email: "contact@advanced-plastic.sa",
      phone: "01234567893",
      address: "الخبر، المملكة العربية السعودية",
      category: "مواد بلاستيكية",
      rating: 4.2,
      totalOrders: 19,
      totalSpent: "67,800 ر.س",
      lastOrderDate: "2024-01-10",
      status: "معلق",
      paymentTerms: "20 يوم",
      products: ["كروت بلاستيكية", "أكياس", "مواد تغليف", "لفائف بلاستيك"]
    },
    {
      id: "SUP-005",
      name: "مؤسسة الإبداع للتغليف",
      contactPerson: "عبدالرحمن سعد القحطاني",
      email: "sales@creative-packaging.com",
      phone: "01234567894",
      address: "مكة المكرمة، المملكة العربية السعودية",
      category: "مواد التغليف",
      rating: 4.6,
      totalOrders: 24,
      totalSpent: "43,200 ر.س",
      lastOrderDate: "2024-01-12",
      status: "نشط",
      paymentTerms: "30 يوم",
      products: ["صناديق كرتون", "شرائط لاصقة", "فقاعات التغليف", "أكياس الشحن"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return "status-active";
      case "معلق":
        return "status-pending";
      case "غير نشط":
        return "status-inactive";
      default:
        return "status-pending";
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-warning text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-warning" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />);
    }

    return stars;
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الموردين</h1>
          <p className="text-muted-foreground">
            إدارة بيانات الموردين وتتبع الطلبات والمدفوعات
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
                  placeholder="البحث في الموردين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("مورد")}
                className="shadow-glow"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مورد جديد
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("الموردين")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="orange"
                onClick={() => handleExport("الموردين")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers List */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{supplier.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2 space-x-reverse">
                      <Badge className={getStatusBadge(supplier.status)}>
                        {supplier.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{supplier.category}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    size="sm" 
                    variant="green"
                    onClick={() => handleView(supplier.id, "المورد")}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </Button>
                  <Button 
                    size="sm" 
                    variant="purple"
                    onClick={() => handleEdit(supplier.id, "المورد")}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="hover:shadow-glow"
                    onClick={() => handleDelete(supplier.id, "المورد")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-2 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{supplier.contactPerson}</p>
                    <p className="text-sm text-muted-foreground">الشخص المسؤول</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 ml-2 text-success" />
                  <div>
                    <p className="font-medium text-foreground">{supplier.phone}</p>
                    <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-4 h-4 ml-2 text-info" />
                  <div>
                    <p className="font-medium text-foreground">{supplier.email}</p>
                    <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center p-3 bg-info/10 rounded-lg border border-info/20">
                <MapPin className="w-4 h-4 ml-2 text-info" />
                <div>
                  <p className="text-sm text-info font-medium">العنوان</p>
                  <p className="font-semibold text-info">{supplier.address}</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-center">
                  <Package className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-primary">{supplier.totalOrders}</p>
                  <p className="text-xs text-primary">إجمالي الطلبات</p>
                </div>
                
                <div className="p-3 bg-success/10 rounded-lg border border-success/20 text-center">
                  <DollarSign className="w-6 h-6 text-success mx-auto mb-1" />
                  <p className="text-lg font-bold text-success">{supplier.totalSpent}</p>
                  <p className="text-xs text-success">إجمالي المشتريات</p>
                </div>
                
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    {getRatingStars(supplier.rating)}
                  </div>
                  <p className="text-lg font-bold text-warning">{supplier.rating}</p>
                  <p className="text-xs text-warning">التقييم</p>
                </div>
                
                <div className="p-3 bg-info/10 rounded-lg border border-info/20 text-center">
                  <Calendar className="w-6 h-6 text-info mx-auto mb-1" />
                  <p className="text-sm font-bold text-info">{supplier.lastOrderDate}</p>
                  <p className="text-xs text-info">آخر طلب</p>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <span className="text-warning font-medium">شروط الدفع:</span>
                <span className="text-warning font-semibold">{supplier.paymentTerms}</span>
              </div>

              {/* Products */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Package className="w-4 h-4 ml-2" />
                  المنتجات المتوفرة
                </h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.products.map((product, index) => (
                    <Badge key={index} variant="outline" className="bg-background">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suppliers Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{suppliers.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي الموردين</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Building2 className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">
              {suppliers.filter(s => s.status === "نشط").length}
            </p>
            <p className="text-sm text-muted-foreground">موردين نشطين</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold text-info">
              {suppliers.reduce((sum, supplier) => sum + supplier.totalOrders, 0)}
            </p>
            <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">
              {(suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length).toFixed(1)}
            </p>
            <p className="text-sm text-muted-foreground">متوسط التقييم</p>
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

export default Suppliers;