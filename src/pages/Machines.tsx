import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Settings as SettingsIcon, 
  Zap,
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  Activity,
  Timer,
  Gauge
} from "lucide-react";

interface Machine {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  machineType: 'طباعة أفست' | 'طباعة ديجيتال' | 'تجليد' | 'تقطيع' | 'تجهيز' | 'أخرى';
  status: 'تعمل' | 'صيانة' | 'معطلة' | 'متوقفة';
  location: string;
  purchaseDate: Date;
  warrantyExpiry: Date;
  lastMaintenance: Date;
  nextMaintenance: Date;
  operatingHours: number;
  maxPrintSize: string;
  printSpeed: string;
  powerConsumption: string;
  maintenanceNotes: string;
  operatorName: string;
  costPerHour: number;
  createdAt: Date;
}

const mockMachines: Machine[] = [
  {
    id: "1",
    name: "ماكينة أفست هايدلبرغ",
    model: "Speedmaster SM 74",
    manufacturer: "Heidelberg",
    serialNumber: "HD-2019-001",
    machineType: "طباعة أفست",
    status: "تعمل",
    location: "القسم الأول - الطباعة",
    purchaseDate: new Date("2019-03-15"),
    warrantyExpiry: new Date("2024-03-15"),
    lastMaintenance: new Date("2024-01-10"),
    nextMaintenance: new Date("2024-04-10"),
    operatingHours: 12500,
    maxPrintSize: "52 x 74 cm",
    printSpeed: "15000 ورقة/ساعة",
    powerConsumption: "25 كيلو واط",
    maintenanceNotes: "تم تغيير الرولات وتنظيف النظام",
    operatorName: "أحمد محمد",
    costPerHour: 150,
    createdAt: new Date("2019-03-15")
  },
  {
    id: "2",
    name: "ماكينة تقطيع ورق",
    model: "Polar 115X",
    manufacturer: "Polar-Mohr",
    serialNumber: "PL-2020-002",
    machineType: "تقطيع",
    status: "صيانة",
    location: "قسم التجهيز",
    purchaseDate: new Date("2020-06-20"),
    warrantyExpiry: new Date("2025-06-20"),
    lastMaintenance: new Date("2024-01-20"),
    nextMaintenance: new Date("2024-03-20"),
    operatingHours: 8200,
    maxPrintSize: "115 cm عرض",
    printSpeed: "800 قطعة/ساعة",
    powerConsumption: "8 كيلو واط",
    maintenanceNotes: "إصلاح نظام الهيدروليك وتشحيم المحاور",
    operatorName: "محمود علي",
    costPerHour: 80,
    createdAt: new Date("2020-06-20")
  },
  {
    id: "3",
    name: "ماكينة تجليد",
    model: "Horizon BQ-470",
    manufacturer: "Horizon",
    serialNumber: "HR-2021-003",
    machineType: "تجليد",
    status: "تعمل",
    location: "قسم التجليد",
    purchaseDate: new Date("2021-08-10"),
    warrantyExpiry: new Date("2026-08-10"),
    lastMaintenance: new Date("2024-01-05"),
    nextMaintenance: new Date("2024-05-05"),
    operatingHours: 5600,
    maxPrintSize: "47 x 32 cm",
    printSpeed: "4500 كتاب/ساعة",
    powerConsumption: "12 كيلو واط",
    maintenanceNotes: "تنظيف عام وتشحيم الأجزاء المتحركة",
    operatorName: "سامح إبراهيم",
    costPerHour: 120,
    createdAt: new Date("2021-08-10")
  }
];

const statusColors = {
  'تعمل': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'صيانة': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'معطلة': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'متوقفة': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
};

const Machines = () => {
  const [machines, setMachines] = useState<Machine[]>(mockMachines);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("الكل");
  const [typeFilter, setTypeFilter] = useState<string>("الكل");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    manufacturer: "",
    serialNumber: "",
    machineType: "",
    status: "تعمل",
    location: "",
    purchaseDate: undefined as Date | undefined,
    warrantyExpiry: undefined as Date | undefined,
    lastMaintenance: undefined as Date | undefined,
    nextMaintenance: undefined as Date | undefined,
    operatingHours: "",
    maxPrintSize: "",
    printSpeed: "",
    powerConsumption: "",
    maintenanceNotes: "",
    operatorName: "",
    costPerHour: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      model: "",
      manufacturer: "",
      serialNumber: "",
      machineType: "",
      status: "تعمل",
      location: "",
      purchaseDate: undefined,
      warrantyExpiry: undefined,
      lastMaintenance: undefined,
      nextMaintenance: undefined,
      operatingHours: "",
      maxPrintSize: "",
      printSpeed: "",
      powerConsumption: "",
      maintenanceNotes: "",
      operatorName: "",
      costPerHour: ""
    });
    setSelectedMachine(null);
    setIsEditing(false);
  };

  const handleOpenDialog = (machine?: Machine) => {
    if (machine) {
      setSelectedMachine(machine);
      setFormData({
        name: machine.name,
        model: machine.model,
        manufacturer: machine.manufacturer,
        serialNumber: machine.serialNumber,
        machineType: machine.machineType,
        status: machine.status,
        location: machine.location,
        purchaseDate: machine.purchaseDate,
        warrantyExpiry: machine.warrantyExpiry,
        lastMaintenance: machine.lastMaintenance,
        nextMaintenance: machine.nextMaintenance,
        operatingHours: machine.operatingHours.toString(),
        maxPrintSize: machine.maxPrintSize,
        printSpeed: machine.printSpeed,
        powerConsumption: machine.powerConsumption,
        maintenanceNotes: machine.maintenanceNotes,
        operatorName: machine.operatorName,
        costPerHour: machine.costPerHour.toString()
      });
      setIsEditing(true);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.model || !formData.serialNumber) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const machineData: Machine = {
      id: isEditing ? selectedMachine!.id : Date.now().toString(),
      name: formData.name,
      model: formData.model,
      manufacturer: formData.manufacturer,
      serialNumber: formData.serialNumber,
      machineType: formData.machineType as any,
      status: formData.status as any,
      location: formData.location,
      purchaseDate: formData.purchaseDate || new Date(),
      warrantyExpiry: formData.warrantyExpiry || new Date(),
      lastMaintenance: formData.lastMaintenance || new Date(),
      nextMaintenance: formData.nextMaintenance || new Date(),
      operatingHours: parseInt(formData.operatingHours) || 0,
      maxPrintSize: formData.maxPrintSize,
      printSpeed: formData.printSpeed,
      powerConsumption: formData.powerConsumption,
      maintenanceNotes: formData.maintenanceNotes,
      operatorName: formData.operatorName,
      costPerHour: parseFloat(formData.costPerHour) || 0,
      createdAt: isEditing ? selectedMachine!.createdAt : new Date()
    };

    if (isEditing) {
      setMachines(machines.map(m => m.id === machineData.id ? machineData : m));
      toast({
        title: "تم بنجاح",
        description: "تم تحديث الماكينة بنجاح"
      });
    } else {
      setMachines([...machines, machineData]);
      toast({
        title: "تم بنجاح",
        description: "تم إضافة الماكينة بنجاح"
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
    toast({
      title: "تم بنجاح",
      description: "تم حذف الماكينة بنجاح"
    });
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "الكل" || machine.status === statusFilter;
    const matchesType = typeFilter === "الكل" || machine.machineType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'تعمل':
        return <CheckCircle className="w-4 h-4" />;
      case 'معطلة':
        return <XCircle className="w-4 h-4" />;
      case 'صيانة':
        return <Wrench className="w-4 h-4" />;
      case 'متوقفة':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getMachinesNeedingMaintenance = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return machines.filter(m => m.nextMaintenance <= nextWeek);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">إدارة الماكينات والمعدات</h1>
          <p className="text-muted-foreground mt-1">
            متابعة وإدارة جميع ماكينات ومعدات المطبعة
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              ماكينة جديدة
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "تعديل الماكينة" : "إضافة ماكينة جديدة"}
              </DialogTitle>
              <DialogDescription>
                {isEditing ? "قم بتعديل بيانات الماكينة" : "قم بإدخال بيانات الماكينة الجديدة"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">اسم الماكينة *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="أدخل اسم الماكينة"
                />
              </div>
              
              <div>
                <Label htmlFor="model">الطراز *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  placeholder="أدخل طراز الماكينة"
                />
              </div>
              
              <div>
                <Label htmlFor="manufacturer">الشركة المصنعة</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  placeholder="أدخل اسم الشركة المصنعة"
                />
              </div>
              
              <div>
                <Label htmlFor="serialNumber">الرقم التسلسلي *</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                  placeholder="أدخل الرقم التسلسلي"
                />
              </div>
              
              <div>
                <Label htmlFor="machineType">نوع الماكينة</Label>
                <Select value={formData.machineType} onValueChange={(value) => setFormData({...formData, machineType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الماكينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="طباعة أفست">طباعة أفست</SelectItem>
                    <SelectItem value="طباعة ديجيتال">طباعة ديجيتال</SelectItem>
                    <SelectItem value="تجليد">تجليد</SelectItem>
                    <SelectItem value="تقطيع">تقطيع</SelectItem>
                    <SelectItem value="تجهيز">تجهيز</SelectItem>
                    <SelectItem value="أخرى">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">حالة الماكينة</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تعمل">تعمل</SelectItem>
                    <SelectItem value="صيانة">صيانة</SelectItem>
                    <SelectItem value="معطلة">معطلة</SelectItem>
                    <SelectItem value="متوقفة">متوقفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="مكان تواجد الماكينة"
                />
              </div>
              
              <div>
                <Label htmlFor="operatorName">اسم المشغل</Label>
                <Input
                  id="operatorName"
                  value={formData.operatorName}
                  onChange={(e) => setFormData({...formData, operatorName: e.target.value})}
                  placeholder="اسم مشغل الماكينة"
                />
              </div>
              
              <div>
                <Label>تاريخ الشراء</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.purchaseDate ? (
                        format(formData.purchaseDate, "dd/MM/yyyy", { locale: ar })
                      ) : (
                        <span>اختر تاريخ الشراء</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.purchaseDate}
                      onSelect={(date) => setFormData({...formData, purchaseDate: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>انتهاء الضمان</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.warrantyExpiry ? (
                        format(formData.warrantyExpiry, "dd/MM/yyyy", { locale: ar })
                      ) : (
                        <span>اختر تاريخ انتهاء الضمان</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.warrantyExpiry}
                      onSelect={(date) => setFormData({...formData, warrantyExpiry: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>آخر صيانة</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastMaintenance ? (
                        format(formData.lastMaintenance, "dd/MM/yyyy", { locale: ar })
                      ) : (
                        <span>اختر تاريخ آخر صيانة</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastMaintenance}
                      onSelect={(date) => setFormData({...formData, lastMaintenance: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>الصيانة القادمة</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.nextMaintenance ? (
                        format(formData.nextMaintenance, "dd/MM/yyyy", { locale: ar })
                      ) : (
                        <span>اختر تاريخ الصيانة القادمة</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.nextMaintenance}
                      onSelect={(date) => setFormData({...formData, nextMaintenance: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="operatingHours">ساعات التشغيل</Label>
                <Input
                  id="operatingHours"
                  type="number"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                  placeholder="عدد ساعات التشغيل"
                />
              </div>
              
              <div>
                <Label htmlFor="maxPrintSize">أقصى مقاس طباعة</Label>
                <Input
                  id="maxPrintSize"
                  value={formData.maxPrintSize}
                  onChange={(e) => setFormData({...formData, maxPrintSize: e.target.value})}
                  placeholder="مثال: 70x100 سم"
                />
              </div>
              
              <div>
                <Label htmlFor="printSpeed">سرعة الطباعة</Label>
                <Input
                  id="printSpeed"
                  value={formData.printSpeed}
                  onChange={(e) => setFormData({...formData, printSpeed: e.target.value})}
                  placeholder="مثال: 15000 ورقة/ساعة"
                />
              </div>
              
              <div>
                <Label htmlFor="powerConsumption">استهلاك الطاقة</Label>
                <Input
                  id="powerConsumption"
                  value={formData.powerConsumption}
                  onChange={(e) => setFormData({...formData, powerConsumption: e.target.value})}
                  placeholder="مثال: 25 كيلو واط"
                />
              </div>
              
              <div>
                <Label htmlFor="costPerHour">تكلفة التشغيل/ساعة</Label>
                <Input
                  id="costPerHour"
                  type="number"
                  step="0.01"
                  value={formData.costPerHour}
                  onChange={(e) => setFormData({...formData, costPerHour: e.target.value})}
                  placeholder="التكلفة بالجنيه"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="maintenanceNotes">ملاحظات الصيانة</Label>
                <Textarea
                  id="maintenanceNotes"
                  value={formData.maintenanceNotes}
                  onChange={(e) => setFormData({...formData, maintenanceNotes: e.target.value})}
                  placeholder="ملاحظات حول آخر صيانة أو حالة الماكينة"
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2 flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {isEditing ? "تحديث الماكينة" : "إضافة الماكينة"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Maintenance Alert */}
      {getMachinesNeedingMaintenance().length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">
                تنبيه: {getMachinesNeedingMaintenance().length} ماكينة تحتاج صيانة خلال الأسبوع القادم
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الماكينات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="lg:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="تصفية بالحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الحالات</SelectItem>
                  <SelectItem value="تعمل">تعمل</SelectItem>
                  <SelectItem value="صيانة">صيانة</SelectItem>
                  <SelectItem value="معطلة">معطلة</SelectItem>
                  <SelectItem value="متوقفة">متوقفة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="تصفية بالنوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الأنواع</SelectItem>
                  <SelectItem value="طباعة أفست">طباعة أفست</SelectItem>
                  <SelectItem value="طباعة ديجيتال">طباعة ديجيتال</SelectItem>
                  <SelectItem value="تجليد">تجليد</SelectItem>
                  <SelectItem value="تقطيع">تقطيع</SelectItem>
                  <SelectItem value="تجهيز">تجهيز</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الماكينات</CardTitle>
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machines.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تعمل حاليًا</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {machines.filter(m => m.status === 'تعمل').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تحتاج صيانة</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {machines.filter(m => m.status === 'صيانة').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معطلة</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {machines.filter(m => m.status === 'معطلة').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Machines Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الماكينات والمعدات</CardTitle>
          <CardDescription>
            جميع الماكينات والمعدات مع تفاصيلها الكاملة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الماكينة</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>المشغل</TableHead>
                  <TableHead>ساعات التشغيل</TableHead>
                  <TableHead>آخر صيانة</TableHead>
                  <TableHead>الصيانة القادمة</TableHead>
                  <TableHead>التكلفة/ساعة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMachines.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{machine.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {machine.manufacturer} - {machine.model}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {machine.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{machine.machineType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[machine.status]} gap-1`}>
                        {getStatusIcon(machine.status)}
                        {machine.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{machine.operatorName || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4 text-muted-foreground" />
                        {machine.operatingHours.toLocaleString()} ساعة
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(machine.lastMaintenance, "dd/MM/yyyy", { locale: ar })}
                    </TableCell>
                    <TableCell>
                      <div className={`${
                        machine.nextMaintenance <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          ? 'text-red-600 font-medium' 
                          : ''
                      }`}>
                        {format(machine.nextMaintenance, "dd/MM/yyyy", { locale: ar })}
                      </div>
                    </TableCell>
                    <TableCell>{machine.costPerHour} ج.م</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(machine)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(machine.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Machines;