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
  FolderOpen,
  Tag,
  FileText,
  Image,
  Palette,
  Package,
  Users,
  DollarSign
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport 
} from "@/utils/handlers";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    {
      id: "CAT-001",
      name: "تصميم الشعارات",
      description: "خدمات تصميم الشعارات والهويات البصرية",
      type: "خدمة",
      parentCategory: null,
      color: "#3B82F6",
      icon: "Palette",
      itemsCount: 25,
      totalValue: "45,600 ر.س",
      status: "نشط",
      createdDate: "2024-01-10"
    },
    {
      id: "CAT-002",
      name: "طباعة المواد الدعائية",
      description: "طباعة البروشورات، الفلايرز، والمواد الترويجية",
      type: "منتج",
      parentCategory: null,
      color: "#10B981",
      icon: "FileText",
      itemsCount: 156,
      totalValue: "89,300 ر.س",
      status: "نشط",
      createdDate: "2024-01-08"
    },
    {
      id: "CAT-003",
      name: "اللوحات الإعلانية",
      description: "تصميم وتركيب اللوحات الإعلانية الخارجية",
      type: "خدمة",
      parentCategory: null,
      color: "#F59E0B",
      icon: "Image",
      itemsCount: 42,
      totalValue: "180,000 ر.س",
      status: "نشط",
      createdDate: "2024-01-05"
    },
    {
      id: "CAT-004",
      name: "التسويق الرقمي",
      description: "خدمات التسويق عبر وسائل التواصل الاجتماعي",
      type: "خدمة",
      parentCategory: null,
      color: "#8B5CF6",
      icon: "Users",
      itemsCount: 18,
      totalValue: "67,500 ر.س",
      status: "نشط",
      createdDate: "2024-01-12"
    },
    {
      id: "CAT-005",
      name: "مواد الطباعة",
      description: "أوراق، أحبار، ومستلزمات الطباعة",
      type: "مخزون",
      parentCategory: "CAT-002",
      color: "#EF4444",
      icon: "Package",
      itemsCount: 89,
      totalValue: "23,400 ر.س",
      status: "نشط",
      createdDate: "2024-01-07"
    },
    {
      id: "CAT-006",
      name: "الكروت الشخصية",
      description: "تصميم وطباعة الكروت الشخصية",
      type: "منتج",
      parentCategory: "CAT-002",
      color: "#06B6D4",
      icon: "Tag",
      itemsCount: 78,
      totalValue: "12,600 ر.س",
      status: "نشط",
      createdDate: "2024-01-15"
    },
    {
      id: "CAT-007",
      name: "التصوير الفوتوغرافي",
      description: "خدمات التصوير للمنتجات والفعاليات",
      type: "خدمة",
      parentCategory: null,
      color: "#84CC16",
      icon: "Image",
      itemsCount: 32,
      totalValue: "54,000 ر.س",
      status: "معلق",
      createdDate: "2024-01-20"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "خدمة":
        return <Users className="w-4 h-4" />;
      case "منتج":
        return <Package className="w-4 h-4" />;
      case "مخزون":
        return <FolderOpen className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "خدمة":
        return "bg-primary/10 text-primary border border-primary/20";
      case "منتج":
        return "bg-success/10 text-success border border-success/20";
      case "مخزون":
        return "bg-warning/10 text-warning border border-warning/20";
      default:
        return "bg-muted/10 text-muted-foreground border border-muted/20";
    }
  };

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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة التصنيفات</h1>
          <p className="text-muted-foreground">
            تنظيم وإدارة تصنيفات المنتجات والخدمات
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
                  placeholder="البحث في التصنيفات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("تصنيف")}
                className="shadow-glow"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة تصنيف جديد
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("التصنيفات")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="orange"
                onClick={() => handleExport("التصنيفات")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {getTypeIcon(category.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge className={getStatusBadge(category.status)}>
                      {category.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {category.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Category Type */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">نوع التصنيف:</span>
                <Badge className={getTypeBadge(category.type)}>
                  {getTypeIcon(category.type)}
                  <span className="mr-1">{category.type}</span>
                </Badge>
              </div>

              {/* Parent Category */}
              {category.parentCategory && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">التصنيف الرئيسي:</span>
                  <span className="text-sm font-medium text-primary">
                    {categories.find(c => c.id === category.parentCategory)?.name || "غير محدد"}
                  </span>
                </div>
              )}

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{category.itemsCount}</p>
                  <p className="text-xs text-muted-foreground">عدد العناصر</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-success">{category.totalValue}</p>
                  <p className="text-xs text-muted-foreground">القيمة الإجمالية</p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                <span className="font-medium">{category.createdDate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 space-x-reverse pt-2">
                <Button 
                  size="sm" 
                  variant="purple"
                  className="flex-1"
                  onClick={() => handleEdit(category.id, "التصنيف")}
                >
                  <Edit className="w-4 h-4 ml-2" />
                  تعديل
                </Button>
                <Button 
                  size="sm" 
                  variant="green"
                  className="flex-1"
                  onClick={() => handleView(category.id, "التصنيف")}
                >
                  <Eye className="w-4 h-4 ml-2" />
                  عرض
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  className="hover:shadow-glow"
                  onClick={() => handleDelete(category.id, "التصنيف")}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <FolderOpen className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{categories.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي التصنيفات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold text-info">
              {categories.filter(c => c.type === "خدمة").length}
            </p>
            <p className="text-sm text-muted-foreground">تصنيفات الخدمات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">
              {categories.filter(c => c.type === "منتج").length}
            </p>
            <p className="text-sm text-muted-foreground">تصنيفات المنتجات</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">
              {categories.reduce((sum, cat) => sum + cat.itemsCount, 0)}
            </p>
            <p className="text-sm text-muted-foreground">إجمالي العناصر</p>
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

export default Categories;