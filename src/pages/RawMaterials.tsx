import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Droplets,
  Layers,
  Ruler,
  Palette,
  Edit,
  Eye,
  Save,
  X
} from 'lucide-react';

interface RawMaterial {
  id: string;
  name: string;
  category: 'paper' | 'inks' | 'metal-sheets';
  subcategory?: string;
  specifications: {
    size?: string;
    type?: string;
    thickness?: string;
    color?: string;
    gsm?: number;
  };
  currentStock: number;
  minStock: number;
  unit: string;
  supplier: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  cost: number;
}

const mockRawMaterials: RawMaterial[] = [
  // الورق
  {
    id: '1',
    name: 'ورق طباعة A4 أبيض',
    category: 'paper',
    subcategory: 'طباعة',
    specifications: {
      size: 'A4 (210×297mm)',
      type: 'ورق طباعة عادي',
      gsm: 80
    },
    currentStock: 150,
    minStock: 50,
    unit: 'رزمة',
    supplier: 'مؤسسة الورق الذهبي',
    lastUpdated: '2024-01-15',
    status: 'in-stock',
    cost: 25.50
  },
  {
    id: '2',
    name: 'ورق مقوى A3 لامع',
    category: 'paper',
    subcategory: 'مقوى',
    specifications: {
      size: 'A3 (420×297mm)',
      type: 'ورق مقوى لامع',
      gsm: 300
    },
    currentStock: 45,
    minStock: 20,
    unit: 'رزمة',
    supplier: 'مؤسسة الورق الذهبي',
    lastUpdated: '2024-01-14',
    status: 'in-stock',
    cost: 85.00
  },
  {
    id: '3',
    name: 'ورق فوتوغرافي A4',
    category: 'paper',
    subcategory: 'فوتوغرافي',
    specifications: {
      size: 'A4 (210×297mm)',
      type: 'ورق فوتوغرافي لامع',
      gsm: 250
    },
    currentStock: 10,
    minStock: 25,
    unit: 'رزمة',
    supplier: 'شركة التصوير المتقدم',
    lastUpdated: '2024-01-10',
    status: 'low-stock',
    cost: 120.00
  },
  // الأحبار والكيماويات
  {
    id: '4',
    name: 'حبر أسود HP LaserJet',
    category: 'inks',
    subcategory: 'أحبار ليزر',
    specifications: {
      type: 'حبر ليزر أسود',
      color: 'أسود'
    },
    currentStock: 15,
    minStock: 20,
    unit: 'خرطوشة',
    supplier: 'مكتبة الكمبيوتر',
    lastUpdated: '2024-01-14',
    status: 'low-stock',
    cost: 120.00
  },
  {
    id: '5',
    name: 'حبر ملون للطباعة الرقمية',
    category: 'inks',
    subcategory: 'أحبار رقمية',
    specifications: {
      type: 'حبر رقمي متعدد الألوان',
      color: 'متعدد الألوان'
    },
    currentStock: 8,
    minStock: 12,
    unit: 'عبوة',
    supplier: 'شركة الأحبار المتطورة',
    lastUpdated: '2024-01-16',
    status: 'low-stock',
    cost: 350.00
  },
  {
    id: '6',
    name: 'مذيب التنظيف',
    category: 'inks',
    subcategory: 'كيماويات',
    specifications: {
      type: 'مذيب تنظيف الماكينات'
    },
    currentStock: 25,
    minStock: 10,
    unit: 'لتر',
    supplier: 'شركة الكيماويات الصناعية',
    lastUpdated: '2024-01-15',
    status: 'in-stock',
    cost: 45.00
  },
  // الصفائح المعدنية
  {
    id: '7',
    name: 'ألومنيوم للافتات',
    category: 'metal-sheets',
    subcategory: 'ألومنيوم',
    specifications: {
      size: '2×1 متر',
      thickness: '3مم',
      type: 'ألومنيوم مركب'
    },
    currentStock: 20,
    minStock: 15,
    unit: 'لوح',
    supplier: 'مصنع المعادن الحديث',
    lastUpdated: '2024-01-12',
    status: 'in-stock',
    cost: 150.00
  },
  {
    id: '8',
    name: 'استانلس ستيل للوحات',
    category: 'metal-sheets',
    subcategory: 'استانلس ستيل',
    specifications: {
      size: '1.5×1 متر',
      thickness: '2مم',
      type: 'استانلس ستيل مصقول'
    },
    currentStock: 5,
    minStock: 10,
    unit: 'لوح',
    supplier: 'مصنع المعادن الحديث',
    lastUpdated: '2024-01-10',
    status: 'low-stock',
    cost: 280.00
  },
  {
    id: '9',
    name: 'صاج مجلفن',
    category: 'metal-sheets',
    subcategory: 'صاج',
    specifications: {
      size: '2×1.2 متر',
      thickness: '1.5مم',
      type: 'صاج مجلفن'
    },
    currentStock: 0,
    minStock: 8,
    unit: 'لوح',
    supplier: 'شركة المعادن المتقدمة',
    lastUpdated: '2024-01-08',
    status: 'out-of-stock',
    cost: 95.00
  }
];

const RawMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [materials, setMaterials] = useState(mockRawMaterials);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null);
  const { toast } = useToast();

  // Form state for adding/editing materials
  const [formData, setFormData] = useState({
    name: '',
    category: 'paper' as 'paper' | 'inks' | 'metal-sheets',
    subcategory: '',
    size: '',
    type: '',
    thickness: '',
    color: '',
    gsm: '',
    currentStock: '',
    minStock: '',
    unit: '',
    supplier: '',
    cost: ''
  });

  const categories = [
    { key: 'all', label: 'الكل', icon: Package },
    { key: 'paper', label: 'الورق', icon: FileText },
    { key: 'inks', label: 'الأحبار والكيماويات', icon: Droplets },
    { key: 'metal-sheets', label: 'الصفائح المعدنية', icon: Layers }
  ];

  // Helper functions
  const resetForm = () => {
    setFormData({
      name: '',
      category: 'paper',
      subcategory: '',
      size: '',
      type: '',
      thickness: '',
      color: '',
      gsm: '',
      currentStock: '',
      minStock: '',
      unit: '',
      supplier: '',
      cost: ''
    });
  };

  const fillForm = (material: RawMaterial) => {
    setFormData({
      name: material.name,
      category: material.category,
      subcategory: material.subcategory || '',
      size: material.specifications.size || '',
      type: material.specifications.type || '',
      thickness: material.specifications.thickness || '',
      color: material.specifications.color || '',
      gsm: material.specifications.gsm?.toString() || '',
      currentStock: material.currentStock.toString(),
      minStock: material.minStock.toString(),
      unit: material.unit,
      supplier: material.supplier,
      cost: material.cost.toString()
    });
  };

  const handleAddMaterial = () => {
    const newMaterial: RawMaterial = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      specifications: {
        size: formData.size || undefined,
        type: formData.type || undefined,
        thickness: formData.thickness || undefined,
        color: formData.color || undefined,
        gsm: formData.gsm ? parseInt(formData.gsm) : undefined,
      },
      currentStock: parseInt(formData.currentStock),
      minStock: parseInt(formData.minStock),
      unit: formData.unit,
      supplier: formData.supplier,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: parseInt(formData.currentStock) <= parseInt(formData.minStock) 
        ? (parseInt(formData.currentStock) === 0 ? 'out-of-stock' : 'low-stock') 
        : 'in-stock',
      cost: parseFloat(formData.cost)
    };

    setMaterials([...materials, newMaterial]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "تم إضافة المادة الخام",
      description: "تم إضافة المادة الخام بنجاح إلى المخزون",
    });
  };

  const handleEditMaterial = () => {
    if (!selectedMaterial) return;

    const updatedMaterial: RawMaterial = {
      ...selectedMaterial,
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      specifications: {
        size: formData.size || undefined,
        type: formData.type || undefined,
        thickness: formData.thickness || undefined,
        color: formData.color || undefined,
        gsm: formData.gsm ? parseInt(formData.gsm) : undefined,
      },
      currentStock: parseInt(formData.currentStock),
      minStock: parseInt(formData.minStock),
      unit: formData.unit,
      supplier: formData.supplier,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: parseInt(formData.currentStock) <= parseInt(formData.minStock) 
        ? (parseInt(formData.currentStock) === 0 ? 'out-of-stock' : 'low-stock') 
        : 'in-stock',
      cost: parseFloat(formData.cost)
    };

    setMaterials(materials.map(m => m.id === selectedMaterial.id ? updatedMaterial : m));
    setIsEditDialogOpen(false);
    setSelectedMaterial(null);
    resetForm();
    toast({
      title: "تم تحديث المادة الخام",
      description: "تم تحديث بيانات المادة الخام بنجاح",
    });
  };

  const openEditDialog = (material: RawMaterial) => {
    setSelectedMaterial(material);
    fillForm(material);
    setIsEditDialogOpen(true);
  };

  const openDetailsDialog = (material: RawMaterial) => {
    setSelectedMaterial(material);
    setIsDetailsDialogOpen(true);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subcategory?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'default';
      case 'low-stock': return 'destructive';
      case 'out-of-stock': return 'secondary';
      default: return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryObj = categories.find(cat => cat.key === category);
    return categoryObj ? categoryObj.label : category;
  };

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(cat => cat.key === category);
    return categoryObj ? categoryObj.icon : Package;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'متوفر';
      case 'low-stock': return 'مخزون منخفض';
      case 'out-of-stock': return 'غير متوفر';
      default: return status;
    }
  };

  const totalMaterials = materials.length;
  const lowStockCount = materials.filter(m => m.status === 'low-stock').length;
  const outOfStockCount = materials.filter(m => m.status === 'out-of-stock').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المواد الخام</h1>
          <p className="text-muted-foreground mt-2">تتبع وإدارة المواد الخام والمخزون</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="w-4 h-4" />
              إضافة مادة خام
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-right">إضافة مادة خام جديدة</DialogTitle>
              <DialogDescription className="text-right">
                أدخل تفاصيل المادة الخام الجديدة
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">اسم المادة</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="text-right"
                  placeholder="مثال: ورق طباعة A4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-right block">الفئة</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paper">الورق</SelectItem>
                    <SelectItem value="inks">الأحبار والكيماويات</SelectItem>
                    <SelectItem value="metal-sheets">الصفائح المعدنية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory" className="text-right block">الفئة الفرعية</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  className="text-right"
                  placeholder="مثال: طباعة، لامع، ألومنيوم"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier" className="text-right block">المورد</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  className="text-right"
                  placeholder="اسم المورد"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-right block">الحجم</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="text-right"
                  placeholder="مثال: A4، 2×1 متر"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-right block">النوع</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="text-right"
                  placeholder="نوع المادة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thickness" className="text-right block">السُمك</Label>
                <Input
                  id="thickness"
                  value={formData.thickness}
                  onChange={(e) => setFormData({...formData, thickness: e.target.value})}
                  className="text-right"
                  placeholder="مثال: 3مم، 1.5مم"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color" className="text-right block">اللون</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="text-right"
                  placeholder="لون المادة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gsm" className="text-right block">الوزن (جم/م²)</Label>
                <Input
                  id="gsm"
                  type="number"
                  value={formData.gsm}
                  onChange={(e) => setFormData({...formData, gsm: e.target.value})}
                  placeholder="مثال: 80، 300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit" className="text-right block">الوحدة</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="text-right"
                  placeholder="مثال: رزمة، لوح، خرطوشة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentStock" className="text-right block">المخزون الحالي</Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                  placeholder="الكمية الحالية"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock" className="text-right block">الحد الأدنى للمخزون</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                  placeholder="الحد الأدنى"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost" className="text-right block">التكلفة (ر.س)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  placeholder="السعر"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddMaterial} className="gap-2">
                <Save className="w-4 h-4" />
                حفظ المادة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المواد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{totalMaterials}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">مخزون منخفض</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">{lowStockCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">غير متوفر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-2xl font-bold text-destructive">{outOfStockCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">متوفر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-green-500">{totalMaterials - lowStockCount - outOfStockCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في المواد الخام..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.key)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((material) => {
          const CategoryIcon = getCategoryIcon(material.category);
          return (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{material.name}</CardTitle>
                      <CardDescription>
                        {getCategoryLabel(material.category)}
                        {material.subcategory && ` - ${material.subcategory}`}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(material.status)}>
                    {getStatusText(material.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* المواصفات التقنية */}
                {Object.keys(material.specifications).length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      المواصفات التقنية
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {material.specifications.size && (
                        <div>
                          <span className="text-muted-foreground">الحجم:</span>
                          <p className="font-medium">{material.specifications.size}</p>
                        </div>
                      )}
                      {material.specifications.type && (
                        <div>
                          <span className="text-muted-foreground">النوع:</span>
                          <p className="font-medium">{material.specifications.type}</p>
                        </div>
                      )}
                      {material.specifications.thickness && (
                        <div>
                          <span className="text-muted-foreground">السُمك:</span>
                          <p className="font-medium">{material.specifications.thickness}</p>
                        </div>
                      )}
                      {material.specifications.color && (
                        <div>
                          <span className="text-muted-foreground">اللون:</span>
                          <p className="font-medium">{material.specifications.color}</p>
                        </div>
                      )}
                      {material.specifications.gsm && (
                        <div>
                          <span className="text-muted-foreground">الوزن:</span>
                          <p className="font-medium">{material.specifications.gsm} جم/م²</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">المخزون الحالي:</span>
                  <p className="font-semibold">{material.currentStock} {material.unit}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">الحد الأدنى:</span>
                  <p className="font-semibold">{material.minStock} {material.unit}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">المورد:</span>
                  <p className="font-semibold text-xs">{material.supplier}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">السعر:</span>
                  <p className="font-semibold">{material.cost} ر.س</p>
                </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>آخر تحديث: {material.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 gap-1"
                    onClick={() => openEditDialog(material)}
                  >
                    <Edit className="w-3 h-3" />
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 gap-1"
                    onClick={() => openDetailsDialog(material)}
                  >
                    <Eye className="w-3 h-3" />
                    تفاصيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">لا توجد مواد خام تطابق البحث</p>
          </CardContent>
        </Card>
      )}


      {/* Edit Material Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل المادة الخام</DialogTitle>
            <DialogDescription className="text-right">
              قم بتحديث بيانات المادة الخام
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-right block">اسم المادة</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-right block">الفئة</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paper">الورق</SelectItem>
                  <SelectItem value="inks">الأحبار والكيماويات</SelectItem>
                  <SelectItem value="metal-sheets">الصفائح المعدنية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-subcategory" className="text-right block">الفئة الفرعية</Label>
              <Input
                id="edit-subcategory"
                value={formData.subcategory}
                onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-supplier" className="text-right block">المورد</Label>
              <Input
                id="edit-supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-size" className="text-right block">الحجم</Label>
              <Input
                id="edit-size"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type" className="text-right block">النوع</Label>
              <Input
                id="edit-type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-thickness" className="text-right block">السُمك</Label>
              <Input
                id="edit-thickness"
                value={formData.thickness}
                onChange={(e) => setFormData({...formData, thickness: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-color" className="text-right block">اللون</Label>
              <Input
                id="edit-color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-gsm" className="text-right block">الوزن (جم/م²)</Label>
              <Input
                id="edit-gsm"
                type="number"
                value={formData.gsm}
                onChange={(e) => setFormData({...formData, gsm: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-unit" className="text-right block">الوحدة</Label>
              <Input
                id="edit-unit"
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-currentStock" className="text-right block">المخزون الحالي</Label>
              <Input
                id="edit-currentStock"
                type="number"
                value={formData.currentStock}
                onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-minStock" className="text-right block">الحد الأدنى للمخزون</Label>
              <Input
                id="edit-minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-cost" className="text-right block">التكلفة (ر.س)</Label>
              <Input
                id="edit-cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditMaterial} className="gap-2">
              <Save className="w-4 h-4" />
              حفظ التعديلات
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Material Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-right">تفاصيل المادة الخام</DialogTitle>
            <DialogDescription className="text-right">
              عرض تفاصيل المادة الخام الكاملة
            </DialogDescription>
          </DialogHeader>
          {selectedMaterial && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">اسم المادة:</Label>
                  <p className="font-semibold">{selectedMaterial.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">الفئة:</Label>
                  <p className="font-semibold">{getCategoryLabel(selectedMaterial.category)}</p>
                </div>
                {selectedMaterial.subcategory && (
                  <div>
                    <Label className="text-muted-foreground">الفئة الفرعية:</Label>
                    <p className="font-semibold">{selectedMaterial.subcategory}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground">المورد:</Label>
                  <p className="font-semibold">{selectedMaterial.supplier}</p>
                </div>
              </div>

              {Object.keys(selectedMaterial.specifications).length > 0 && (
                <div>
                  <Label className="text-muted-foreground block mb-2">المواصفات التقنية:</Label>
                  <div className="bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                    {selectedMaterial.specifications.size && (
                      <div>
                        <span className="text-muted-foreground">الحجم:</span>
                        <p className="font-medium">{selectedMaterial.specifications.size}</p>
                      </div>
                    )}
                    {selectedMaterial.specifications.type && (
                      <div>
                        <span className="text-muted-foreground">النوع:</span>
                        <p className="font-medium">{selectedMaterial.specifications.type}</p>
                      </div>
                    )}
                    {selectedMaterial.specifications.thickness && (
                      <div>
                        <span className="text-muted-foreground">السُمك:</span>
                        <p className="font-medium">{selectedMaterial.specifications.thickness}</p>
                      </div>
                    )}
                    {selectedMaterial.specifications.color && (
                      <div>
                        <span className="text-muted-foreground">اللون:</span>
                        <p className="font-medium">{selectedMaterial.specifications.color}</p>
                      </div>
                    )}
                    {selectedMaterial.specifications.gsm && (
                      <div>
                        <span className="text-muted-foreground">الوزن:</span>
                        <p className="font-medium">{selectedMaterial.specifications.gsm} جم/م²</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">المخزون الحالي:</Label>
                  <p className="font-semibold text-lg">{selectedMaterial.currentStock} {selectedMaterial.unit}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">الحد الأدنى:</Label>
                  <p className="font-semibold text-lg">{selectedMaterial.minStock} {selectedMaterial.unit}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">التكلفة:</Label>
                  <p className="font-semibold text-lg">{selectedMaterial.cost} ر.س</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">الحالة:</Label>
                  <Badge variant={getStatusColor(selectedMaterial.status)} className="text-sm">
                    {getStatusText(selectedMaterial.status)}
                  </Badge>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Label className="text-muted-foreground">آخر تحديث:</Label>
                <p className="font-semibold">{selectedMaterial.lastUpdated}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RawMaterials;