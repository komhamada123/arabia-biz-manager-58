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
  CheckSquare,
  Calendar,
  User,
  Clock,
  AlertCircle,
  Flag,
  Play,
  Pause,
  Check
} from "lucide-react";
import { 
  handleAddNew, 
  handleEdit, 
  handleView, 
  handleDelete, 
  handleExport, 
  handleImport,
  handleStart,
  handleComplete 
} from "@/utils/handlers";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const tasks = [
    {
      id: "TSK-001",
      title: "تصميم شعار شركة النور",
      description: "إنشاء تصميم شعار احترافي لشركة النور للإعلان",
      assignedTo: "أحمد محمد الصالح",
      priority: "عالي",
      status: "قيد التنفيذ",
      startDate: "2024-01-15",
      dueDate: "2024-01-20",
      progress: 65,
      category: "تصميم",
      client: "شركة النور للإعلان",
      estimatedHours: 8,
      actualHours: 5.5
    },
    {
      id: "TSK-002",
      title: "طباعة بروشورات مؤسسة الفجر",
      description: "طباعة 1000 نسخة من البروشور الترويجي",
      assignedTo: "سارة أحمد العلي",
      priority: "متوسط",
      status: "مكتملة",
      startDate: "2024-01-18",
      dueDate: "2024-01-22",
      progress: 100,
      category: "طباعة",
      client: "مؤسسة الفجر التجارية",
      estimatedHours: 4,
      actualHours: 3.8
    },
    {
      id: "TSK-003",
      title: "تطوير موقع إلكتروني",
      description: "بناء موقع إلكتروني تفاعلي مع نظام إدارة المحتوى",
      assignedTo: "محمد خالد الرشيد",
      priority: "عالي",
      status: "جديدة",
      startDate: "2024-01-25",
      dueDate: "2024-02-15",
      progress: 0,
      category: "تطوير",
      client: "مكتب الإبداع الإعلاني",
      estimatedHours: 40,
      actualHours: 0
    },
    {
      id: "TSK-004",
      title: "حملة إعلانية لوسائل التواصل",
      description: "إنشاء وإدارة حملة إعلانية شاملة على منصات التواصل الاجتماعي",
      assignedTo: "فاطمة عبدالله السالم",
      priority: "عالي",
      status: "قيد التنفيذ",
      startDate: "2024-01-20",
      dueDate: "2024-02-10",
      progress: 30,
      category: "تسويق",
      client: "شركة الأمل للطباعة",
      estimatedHours: 25,
      actualHours: 8
    },
    {
      id: "TSK-005",
      title: "صيانة معدات الطباعة",
      description: "إجراء صيانة دورية لجميع معدات الطباعة في المكتب",
      assignedTo: "عبدالرحمن محمد القحطاني",
      priority: "منخفض",
      status: "متأخرة",
      startDate: "2024-01-10",
      dueDate: "2024-01-15",
      progress: 20,
      category: "صيانة",
      client: "داخلي",
      estimatedHours: 6,
      actualHours: 1.2
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مكتملة":
        return "status-active";
      case "قيد التنفيذ":
        return "bg-info/10 text-info border border-info/20";
      case "جديدة":
        return "status-pending";
      case "متأخرة":
        return "status-inactive";
      case "معلقة":
        return "bg-warning/10 text-warning border border-warning/20";
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
      case "منخفض":
        return "bg-success/10 text-success border border-success/20";
      default:
        return "bg-muted/10 text-muted-foreground border border-muted/20";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "عالي":
        return <Flag className="w-4 h-4 text-danger" />;
      case "متوسط":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "منخفض":
        return <Flag className="w-4 h-4 text-success" />;
      default:
        return <Flag className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مكتملة":
        return <Check className="w-4 h-4 text-success" />;
      case "قيد التنفيذ":
        return <Play className="w-4 h-4 text-info" />;
      case "جديدة":
        return <Clock className="w-4 h-4 text-warning" />;
      case "متأخرة":
        return <AlertCircle className="w-4 h-4 text-danger" />;
      case "معلقة":
        return <Pause className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المهام</h1>
          <p className="text-muted-foreground">
            تتبع وإدارة مهام الفريق والمشاريع
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
                  placeholder="البحث في المهام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="gradient"
                onClick={() => handleAddNew("مهمة")}
                className="shadow-glow"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مهمة جديدة
              </Button>
              <Button 
                variant="cyan"
                onClick={() => handleImport("المهام")}
              >
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
              <Button 
                variant="purple"
                onClick={() => handleExport("المهام")}
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="arabic-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <CardTitle className="text-xl">{task.title}</CardTitle>
                  <Badge className={getStatusBadge(task.status)}>
                    {getStatusIcon(task.status)}
                    <span className="mr-1">{task.status}</span>
                  </Badge>
                  <Badge className={getPriorityBadge(task.priority)}>
                    {getPriorityIcon(task.priority)}
                    <span className="mr-1">{task.priority}</span>
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    size="sm" 
                    variant="green"
                    onClick={() => handleView(task.id, "المهمة")}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    عرض
                  </Button>
                  <Button 
                    size="sm" 
                    variant="orange"
                    onClick={() => handleEdit(task.id, "المهمة")}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(task.id, "المهمة")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Task Description */}
              <p className="text-muted-foreground">{task.description}</p>

              {/* Task Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-2 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{task.assignedTo}</p>
                    <p className="text-sm text-muted-foreground">المكلف بالمهمة</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-2 text-info" />
                  <div>
                    <p className="font-medium text-foreground">{task.dueDate}</p>
                    <p className="text-sm text-muted-foreground">تاريخ التسليم</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CheckSquare className="w-4 h-4 ml-2 text-warning" />
                  <div>
                    <p className="font-medium text-foreground">{task.category}</p>
                    <p className="text-sm text-muted-foreground">نوع المهمة</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-2 text-success" />
                  <div>
                    <p className="font-medium text-foreground">{task.actualHours}/{task.estimatedHours} ساعة</p>
                    <p className="text-sm text-muted-foreground">الساعات المستغرقة/المقدرة</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">تقدم العمل</span>
                  <span className="text-sm text-muted-foreground">{task.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-between p-3 bg-info/10 rounded-lg border border-info/20">
                <div>
                  <p className="text-sm text-info font-medium">العميل</p>
                  <p className="font-semibold text-info">{task.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-info font-medium">تاريخ البدء</p>
                  <p className="font-semibold text-info">{task.startDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tasks Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <CheckSquare className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{tasks.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي المهام</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Check className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">
              {tasks.filter(t => t.status === "مكتملة").length}
            </p>
            <p className="text-sm text-muted-foreground">مهام مكتملة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Play className="w-8 h-8 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold text-info">
              {tasks.filter(t => t.status === "قيد التنفيذ").length}
            </p>
            <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">
              {tasks.filter(t => t.status === "جديدة").length}
            </p>
            <p className="text-sm text-muted-foreground">مهام جديدة</p>
          </CardContent>
        </Card>
        
        <Card className="arabic-card">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-8 h-8 text-danger mx-auto mb-2" />
            <p className="text-2xl font-bold text-danger">
              {tasks.filter(t => t.status === "متأخرة").length}
            </p>
            <p className="text-sm text-muted-foreground">مهام متأخرة</p>
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

export default Tasks;