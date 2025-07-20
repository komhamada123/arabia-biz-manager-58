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
  Eye, 
  Printer, 
  FileText,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  Package,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface PrintingProject {
  id: string;
  title: string;
  description: string;
  clientName: string;
  projectType: 'كتب' | 'مجلات' | 'بروشورات' | 'كتالوجات' | 'فلايرز' | 'أخرى';
  printingType: 'أفست' | 'ديجيتال' | 'حفر' | 'سلك سكرين';
  paperSize: string;
  paperType: string;
  colors: string;
  quantity: number;
  totalCost: number;
  status: 'جديد' | 'قيد التصميم' | 'جاهز للطباعة' | 'قيد الطباعة' | 'مكتمل' | 'ملغي';
  priority: 'عادي' | 'مهم' | 'عاجل';
  startDate: Date;
  deadline: Date;
  createdAt: Date;
}

const mockProjects: PrintingProject[] = [
  {
    id: "1",
    title: "طباعة كتاب الرياضيات",
    description: "كتاب مدرسي للصف الثالث الثانوي",
    clientName: "دار النشر الحديثة",
    projectType: "كتب",
    printingType: "أفست",
    paperSize: "A4",
    paperType: "ورق شاموا 80 جرام",
    colors: "ألوان كاملة",
    quantity: 5000,
    totalCost: 25000,
    status: "قيد الطباعة",
    priority: "مهم",
    startDate: new Date("2024-01-15"),
    deadline: new Date("2024-02-15"),
    createdAt: new Date("2024-01-10")
  },
  {
    id: "2", 
    title: "مجلة الأزياء الشهرية",
    description: "العدد الشهري لمجلة الأزياء والموضة",
    clientName: "مجموعة الإعلام المتطور",
    projectType: "مجلات",
    printingType: "أفست",
    paperSize: "A4",
    paperType: "ورق مطبعي فاخر 120 جرام",
    colors: "ألوان كاملة + ورنيش",
    quantity: 10000,
    totalCost: 45000,
    status: "جاهز للطباعة",
    priority: "عاجل",
    startDate: new Date("2024-01-20"),
    deadline: new Date("2024-02-10"),
    createdAt: new Date("2024-01-18")
  }
];

const statusColors = {
  'جديد': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'قيد التصميم': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'جاهز للطباعة': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  'قيد الطباعة': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'مكتمل': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'ملغي': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

const priorityColors = {
  'عادي': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  'مهم': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', 
  'عاجل': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

const PrintingProjects = () => {
  const [projects, setProjects] = useState<PrintingProject[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("الكل");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PrintingProject | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    projectType: "",
    printingType: "",
    paperSize: "",
    paperType: "",
    colors: "",
    quantity: "",
    totalCost: "",
    status: "جديد",
    priority: "عادي",
    deadline: undefined as Date | undefined
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      clientName: "",
      projectType: "",
      printingType: "",
      paperSize: "",
      paperType: "",
      colors: "",
      quantity: "",
      totalCost: "",
      status: "جديد",
      priority: "عادي",
      deadline: undefined
    });
    setSelectedProject(null);
    setIsEditing(false);
  };

  const handleOpenDialog = (project?: PrintingProject) => {
    if (project) {
      setSelectedProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        clientName: project.clientName,
        projectType: project.projectType,
        printingType: project.printingType,
        paperSize: project.paperSize,
        paperType: project.paperType,
        colors: project.colors,
        quantity: project.quantity.toString(),
        totalCost: project.totalCost.toString(),
        status: project.status,
        priority: project.priority,
        deadline: project.deadline
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
    
    if (!formData.title || !formData.clientName || !formData.deadline) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const projectData: PrintingProject = {
      id: isEditing ? selectedProject!.id : Date.now().toString(),
      title: formData.title,
      description: formData.description,
      clientName: formData.clientName,
      projectType: formData.projectType as any,
      printingType: formData.printingType as any,
      paperSize: formData.paperSize,
      paperType: formData.paperType,
      colors: formData.colors,
      quantity: parseInt(formData.quantity) || 0,
      totalCost: parseFloat(formData.totalCost) || 0,
      status: formData.status as any,
      priority: formData.priority as any,
      startDate: isEditing ? selectedProject!.startDate : new Date(),
      deadline: formData.deadline!,
      createdAt: isEditing ? selectedProject!.createdAt : new Date()
    };

    if (isEditing) {
      setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
      toast({
        title: "تم بنجاح",
        description: "تم تحديث المشروع بنجاح"
      });
    } else {
      setProjects([...projects, projectData]);
      toast({
        title: "تم بنجاح",
        description: "تم إضافة المشروع بنجاح"
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "تم بنجاح",
      description: "تم حذف المشروع بنجاح"
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "الكل" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return <CheckCircle className="w-4 h-4" />;
      case 'ملغي':
        return <XCircle className="w-4 h-4" />;
      case 'قيد الطباعة':
        return <Printer className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">إدارة المشاريع الطباعية</h1>
          <p className="text-muted-foreground mt-1">
            متابعة وإدارة جميع مشاريع الطباعة الخاصة بالمطبعة
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              مشروع جديد
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "تعديل المشروع" : "إضافة مشروع جديد"}
              </DialogTitle>
              <DialogDescription>
                {isEditing ? "قم بتعديل بيانات المشروع" : "قم بإدخال بيانات المشروع الجديد"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">عنوان المشروع *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="أدخل عنوان المشروع"
                />
              </div>
              
              <div>
                <Label htmlFor="clientName">اسم العميل *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  placeholder="أدخل اسم العميل"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">وصف المشروع</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="أدخل وصف تفصيلي للمشروع"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="projectType">نوع المشروع</Label>
                <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المشروع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="كتب">كتب</SelectItem>
                    <SelectItem value="مجلات">مجلات</SelectItem>
                    <SelectItem value="بروشورات">بروشورات</SelectItem>
                    <SelectItem value="كتالوجات">كتالوجات</SelectItem>
                    <SelectItem value="فلايرز">فلايرز</SelectItem>
                    <SelectItem value="أخرى">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="printingType">نوع الطباعة</Label>
                <Select value={formData.printingType} onValueChange={(value) => setFormData({...formData, printingType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الطباعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="أفست">أفست</SelectItem>
                    <SelectItem value="ديجيتال">ديجيتال</SelectItem>
                    <SelectItem value="حفر">حفر</SelectItem>
                    <SelectItem value="سلك سكرين">سلك سكرين</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="paperSize">مقاس الورق</Label>
                <Input
                  id="paperSize"
                  value={formData.paperSize}
                  onChange={(e) => setFormData({...formData, paperSize: e.target.value})}
                  placeholder="مثال: A4, A3, 50x70"
                />
              </div>
              
              <div>
                <Label htmlFor="paperType">نوع الورق</Label>
                <Input
                  id="paperType"
                  value={formData.paperType}
                  onChange={(e) => setFormData({...formData, paperType: e.target.value})}
                  placeholder="مثال: شاموا 80 جرام"
                />
              </div>
              
              <div>
                <Label htmlFor="colors">الألوان</Label>
                <Input
                  id="colors"
                  value={formData.colors}
                  onChange={(e) => setFormData({...formData, colors: e.target.value})}
                  placeholder="مثال: ألوان كاملة، أسود، لونين"
                />
              </div>
              
              <div>
                <Label htmlFor="quantity">الكمية</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="عدد النسخ"
                />
              </div>
              
              <div>
                <Label htmlFor="totalCost">التكلفة الإجمالية</Label>
                <Input
                  id="totalCost"
                  type="number"
                  step="0.01"
                  value={formData.totalCost}
                  onChange={(e) => setFormData({...formData, totalCost: e.target.value})}
                  placeholder="التكلفة بالجنيه"
                />
              </div>
              
              <div>
                <Label htmlFor="status">حالة المشروع</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جديد">جديد</SelectItem>
                    <SelectItem value="قيد التصميم">قيد التصميم</SelectItem>
                    <SelectItem value="جاهز للطباعة">جاهز للطباعة</SelectItem>
                    <SelectItem value="قيد الطباعة">قيد الطباعة</SelectItem>
                    <SelectItem value="مكتمل">مكتمل</SelectItem>
                    <SelectItem value="ملغي">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority">الأولوية</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عادي">عادي</SelectItem>
                    <SelectItem value="مهم">مهم</SelectItem>
                    <SelectItem value="عاجل">عاجل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>تاريخ التسليم *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? (
                        format(formData.deadline, "dd/MM/yyyy", { locale: ar })
                      ) : (
                        <span>اختر تاريخ التسليم</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => setFormData({...formData, deadline: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="md:col-span-2 flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {isEditing ? "تحديث المشروع" : "إضافة المشروع"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في المشاريع..."
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
                  <SelectItem value="جديد">جديد</SelectItem>
                  <SelectItem value="قيد التصميم">قيد التصميم</SelectItem>
                  <SelectItem value="جاهز للطباعة">جاهز للطباعة</SelectItem>
                  <SelectItem value="قيد الطباعة">قيد الطباعة</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                  <SelectItem value="ملغي">ملغي</SelectItem>
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
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد التنفيذ</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => ['قيد التصميم', 'جاهز للطباعة', 'قيد الطباعة'].includes(p.status)).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.status === 'مكتمل').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي القيمة</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((sum, p) => sum + p.totalCost, 0).toLocaleString()} ج.م
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المشاريع</CardTitle>
          <CardDescription>
            جميع المشاريع الطباعية مع تفاصيلها الكاملة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المشروع</TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>التكلفة</TableHead>
                  <TableHead>تاريخ التسليم</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.description?.substring(0, 50)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{project.clientName}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{project.projectType}</div>
                        <div className="text-xs text-muted-foreground">
                          {project.printingType}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[project.status]} gap-1`}>
                        {getStatusIcon(project.status)}
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[project.priority]}>
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.quantity.toLocaleString()}</TableCell>
                    <TableCell>{project.totalCost.toLocaleString()} ج.م</TableCell>
                    <TableCell>
                      {format(project.deadline, "dd/MM/yyyy", { locale: ar })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(project)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
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

export default PrintingProjects;