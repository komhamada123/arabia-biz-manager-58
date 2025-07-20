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
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Archive,
  Truck
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport 
} from "@/utils/handlers";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const inventory = [
    {
      id: "PRD-001",
      name: "ورق طباعة A4",
      category: "مواد الطباعة",
      sku: "A4-PAPER-500",
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unitPrice: "25 ر.س",
      totalValue: "3,750 ر.س",
      supplier: "شركة الورق المتميز",
      status: "متوفر",
      lastUpdated: "2024-01-20"
    },
    {
      id: "PRD-002",
      name: "حبر طابعة أسود",
      category: "مواد الطباعة",
      sku: "INK-BLACK-HP",
      currentStock: 25,
      minStock: 30,
      maxStock: 100,
      unitPrice: "120 ر.س",
      totalValue: "3,000 ر.س",
      supplier: "مؤسسة التقنية الحديثة",
      status: "منخفض",
      lastUpdated: "2024-01-18"
    },
    {
      id: "PRD-003",
      name: "لوحة إعلانية 3x2 متر",
      category: "لوحات إعلانية",
      sku: "BOARD-3X2-PVC",
      currentStock: 12,
      minStock: 5,
      maxStock: 50,
      unitPrice: "450 ر.س",
      totalValue: "5,400 ر.س",
      supplier: "مصنع اللوحات الذكية",
      status: "متوفر",
      lastUpdated: "2024-01-19"
    },
    {
      id: "PRD-004",
      name: "كروت بلاستيكية",
      category: "مواد التصنيع",
      sku: "CARD-PLASTIC-1000",
      currentStock: 0,
      minStock: 100,
      maxStock: 1000,
      unitPrice: "0.5 ر.س",
      totalValue: "0 ر.س",
      supplier: "شركة البلاستيك المتطور",
      status: "نفد",
      lastUpdated: "2024-01-15"
    },
    {
      id: "PRD-005",
      name: "ألوان طباعة CMYK",
      category: "مواد الطباعة",
      sku: "CMYK-SET-EPSON",
      currentStock: 8,
      minStock: 10,
      maxStock: 40,
      unitPrice: "200 ر.س",
      totalValue: "1,600 ر.س",
      supplier: "مؤسسة التقنية الحديثة",
      status: "منخفض",
      lastUpdated: "2024-01-21"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "متوفر":
        return "status-active";
      case "منخفض":
        return "status-pending";
      case "نفد":
        return "status-inactive";
      default:
        return "status-pending";
    }
  };

  const getStockIcon = (currentStock: number, minStock: number) => {
    if (currentStock === 0) {
      return <AlertTriangle className="w-4 h-4 text-danger" />;
    } else if (currentStock <= minStock) {
      return <TrendingDown className="w-4 h-4 text-warning" />;
    } else {
      return <TrendingUp className="w-4 h-4 text-success" />;
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المخزون</h1>
          <p className="text-muted-foreground">
            إدارة المنتجات والمواد المتاحة في المخزون
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
                  placeholder="البحث في المخزون..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("منتج")}
                className="shadow-glow"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة منتج جديد
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("المخزون")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="purple"
                onClick={() => handleExport("المخزون")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <Card key={item.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Badge className={getStatusBadge(item.status)}>
                  {item.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center justify-between">
                <span>كود المنتج: {item.sku}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">{item.category}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stock Info */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center">
                  {getStockIcon(item.currentStock, item.minStock)}
                  <span className="mr-2 font-medium">الكمية المتاحة</span>
                </div>
                <span className="text-lg font-bold text-primary">{item.currentStock}</span>
              </div>

              {/* Stock Levels */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحد الأدنى:</span>
                  <span className="font-medium">{item.minStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحد الأقصى:</span>
                  <span className="font-medium">{item.maxStock}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">سعر الوحدة:</span>
                  <span className="font-semibold text-info">{item.unitPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">القيمة الإجمالية:</span>
                  <span className="font-semibold text-success">{item.totalValue}</span>
                </div>
              </div>

              {/* Supplier */}
              <div className="flex items-center p-2 bg-info/10 rounded border border-info/20">
                <Truck className="w-4 h-4 text-info ml-2" />
                <div>
                  <p className="text-xs text-info font-medium">المورد</p>
                  <p className="text-sm text-info">{item.supplier}</p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-xs text-muted-foreground text-center">
                آخر تحديث: {item.lastUpdated}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 space-x-reverse pt-2">
                <Button 
                  size="sm" 
                  variant="orange"
                  className="flex-1"
                  onClick={() => handleEdit(item.id, "المنتج")}
                >
                  <Edit className="w-4 h-4 ml-2" />
                  تعديل
                </Button>
                <Button 
                  size="sm" 
                  variant="green"
                  className="flex-1"
                  onClick={() => handleView(item.id, "المنتج")}
                >
                  <Eye className="w-4 h-4 ml-2" />
                  عرض
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDelete(item.id, "المنتج")}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{inventory.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">
              {inventory.filter(i => i.status === "متوفر").length}
            </p>
            <p className="text-sm text-muted-foreground">منتجات متوفرة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <TrendingDown className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">
              {inventory.filter(i => i.status === "منخفض").length}
            </p>
            <p className="text-sm text-muted-foreground">مخزون منخفض</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-danger mx-auto mb-2" />
            <p className="text-2xl font-bold text-danger">
              {inventory.filter(i => i.status === "نفد").length}
            </p>
            <p className="text-sm text-muted-foreground">منتجات نفدت</p>
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

export default Inventory;