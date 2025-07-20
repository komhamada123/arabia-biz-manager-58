import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Factory,
  ClipboardCheck,
  Settings,
  Eye,
  RefreshCw,
  Edit,
  Calendar,
  User
} from 'lucide-react';

interface ProductionOrder {
  id: string;
  orderNumber: string;
  projectName: string;
  customer: string;
  status: 'pending' | 'in-progress' | 'quality-check' | 'completed' | 'delayed';
  progress: number;
  startDate: string;
  expectedDate: string;
  assignedTeam: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface QualityCheck {
  id: string;
  orderNumber: string;
  projectName: string;
  inspector: string;
  checkDate: string;
  status: 'passed' | 'failed' | 'pending';
  score: number;
  issues: string[];
}

const mockProductionOrders: ProductionOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    projectName: 'طباعة بروشورات شركة النور',
    customer: 'شركة النور للتسويق',
    status: 'in-progress',
    progress: 65,
    startDate: '2024-01-15',
    expectedDate: '2024-01-20',
    assignedTeam: ['أحمد محمد', 'فاطمة علي'],
    priority: 'high'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    projectName: 'لافتات إعلانية مول الشرق',
    customer: 'مول الشرق التجاري',
    status: 'quality-check',
    progress: 90,
    startDate: '2024-01-12',
    expectedDate: '2024-01-18',
    assignedTeam: ['محمد سالم', 'نورا أحمد'],
    priority: 'urgent'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    projectName: 'كروت شخصية ومظاريف',
    customer: 'مكتب المحاماة الدولي',
    status: 'completed',
    progress: 100,
    startDate: '2024-01-10',
    expectedDate: '2024-01-16',
    assignedTeam: ['سارة محمد'],
    priority: 'medium'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    projectName: 'ستاند رول اب للمعرض',
    customer: 'شركة التقنية المتطورة',
    status: 'delayed',
    progress: 45,
    startDate: '2024-01-08',
    expectedDate: '2024-01-15',
    assignedTeam: ['علي حسن'],
    priority: 'high'
  }
];

const mockQualityChecks: QualityCheck[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-002',
    projectName: 'لافتات إعلانية مول الشرق',
    inspector: 'مراقب الجودة - خالد أحمد',
    checkDate: '2024-01-17',
    status: 'passed',
    score: 95,
    issues: []
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-005',
    projectName: 'كتالوج منتجات الشركة',
    inspector: 'مراقب الجودة - ليلى محمد',
    checkDate: '2024-01-16',
    status: 'failed',
    score: 70,
    issues: ['عدم وضوح الألوان', 'جودة الورق غير مطابقة للمواصفات']
  }
];

const Production = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);
  const [selectedQualityCheck, setSelectedQualityCheck] = useState<QualityCheck | null>(null);
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    projectName: '',
    customer: '',
    description: '',
    priority: 'medium',
    expectedDate: '',
    assignedTeam: [] as string[],
    newTeamMember: ''
  });
  const { toast } = useToast();

  const statuses = ['all', 'pending', 'in-progress', 'quality-check', 'completed', 'delayed'];

  const filteredOrders = mockProductionOrders.filter(order => {
    const matchesSearch = order.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in-progress': return 'default';
      case 'quality-check': return 'outline';
      case 'completed': return 'default';
      case 'delayed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'in-progress': return 'قيد التنفيذ';
      case 'quality-check': return 'فحص الجودة';
      case 'completed': return 'مكتمل';
      case 'delayed': return 'متأخر';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'secondary';
      case 'medium': return 'outline';
      case 'high': return 'default';
      case 'urgent': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'منخفضة';
      case 'medium': return 'متوسطة';
      case 'high': return 'عالية';
      case 'urgent': return 'عاجلة';
      default: return priority;
    }
  };

  // Handler functions
  const handleNewProductionOrder = () => {
    setShowNewOrderDialog(true);
  };

  const handleSaveNewOrder = () => {
    if (!newOrderData.projectName || !newOrderData.customer || !newOrderData.expectedDate) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Generate new order number
    const orderNumber = `ORD-2024-${String(mockProductionOrders.length + 1).padStart(3, '0')}`;
    
    const newOrder: ProductionOrder = {
      id: String(mockProductionOrders.length + 1),
      orderNumber,
      projectName: newOrderData.projectName,
      customer: newOrderData.customer,
      status: 'pending',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      expectedDate: newOrderData.expectedDate,
      assignedTeam: newOrderData.assignedTeam,
      priority: newOrderData.priority as 'low' | 'medium' | 'high' | 'urgent'
    };

    // Add to mock data (in real app, this would be an API call)
    mockProductionOrders.push(newOrder);

    toast({
      title: "تم إنشاء أمر الإنتاج",
      description: `تم إنشاء أمر الإنتاج ${orderNumber} بنجاح`,
    });

    // Reset form and close dialog
    setNewOrderData({
      projectName: '',
      customer: '',
      description: '',
      priority: 'medium',
      expectedDate: '',
      assignedTeam: [],
      newTeamMember: ''
    });
    setShowNewOrderDialog(false);
  };

  const handleAddTeamMember = () => {
    if (newOrderData.newTeamMember.trim() && !newOrderData.assignedTeam.includes(newOrderData.newTeamMember.trim())) {
      setNewOrderData(prev => ({
        ...prev,
        assignedTeam: [...prev.assignedTeam, prev.newTeamMember.trim()],
        newTeamMember: ''
      }));
    }
  };

  const handleRemoveTeamMember = (member: string) => {
    setNewOrderData(prev => ({
      ...prev,
      assignedTeam: prev.assignedTeam.filter(m => m !== member)
    }));
  };

  const handleUpdateOrder = (orderId: string) => {
    const order = mockProductionOrders.find(o => o.id === orderId);
    if (order) {
      toast({
        title: "تحديث الأمر",
        description: `سيتم تحديث حالة أمر الإنتاج ${order.orderNumber}`,
      });
    }
  };

  const handleViewOrderDetails = (orderId: string) => {
    const order = mockProductionOrders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const handleRequalityCheck = (checkId: string) => {
    const check = mockQualityChecks.find(c => c.id === checkId);
    if (check) {
      toast({
        title: "إعادة فحص الجودة",
        description: `سيتم إعادة فحص المشروع ${check.projectName}`,
      });
    }
  };

  const handleViewQualityDetails = (checkId: string) => {
    const check = mockQualityChecks.find(c => c.id === checkId);
    if (check) {
      setSelectedQualityCheck(check);
    }
  };

  const totalOrders = mockProductionOrders.length;
  const inProgressCount = mockProductionOrders.filter(o => o.status === 'in-progress').length;
  const completedCount = mockProductionOrders.filter(o => o.status === 'completed').length;
  const delayedCount = mockProductionOrders.filter(o => o.status === 'delayed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الإنتاج</h1>
          <p className="text-muted-foreground mt-2">تتبع مراحل الإنتاج والتحكم في الجودة</p>
        </div>
        <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleNewProductionOrder} className="gap-2">
              <Plus className="w-4 h-4" />
              أمر إنتاج جديد
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الأوامر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Factory className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{totalOrders}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">قيد التنفيذ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-blue-500">{inProgressCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">مكتمل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-green-500">{completedCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">متأخر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-2xl font-bold text-destructive">{delayedCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="production" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="production">تتبع الإنتاج</TabsTrigger>
          <TabsTrigger value="quality">التحكم في الجودة</TabsTrigger>
          <TabsTrigger value="reports">تقارير الإنتاجية</TabsTrigger>
        </TabsList>

        {/* Production Tracking Tab */}
        <TabsContent value="production" className="space-y-4">
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
                    placeholder="البحث في أوامر الإنتاج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <div className="flex gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status === 'all' ? 'الكل' : getStatusText(status)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Production Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.projectName}</CardTitle>
                      <CardDescription>{order.orderNumber}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                      <Badge variant={getPriorityColor(order.priority)}>
                        {getPriorityText(order.priority)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>التقدم</span>
                      <span>{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">العميل:</span>
                      <p className="font-semibold text-xs">{order.customer}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">تاريخ البدء:</span>
                      <p className="font-semibold">{order.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">التاريخ المتوقع:</span>
                      <p className="font-semibold">{order.expectedDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الفريق:</span>
                      <p className="font-semibold text-xs">{order.assignedTeam.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleUpdateOrder(order.id)}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      تحديث
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewOrderDetails(order.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      تفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quality Control Tab */}
        <TabsContent value="quality" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockQualityChecks.map((check) => (
              <Card key={check.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{check.projectName}</CardTitle>
                      <CardDescription>{check.orderNumber}</CardDescription>
                    </div>
                    <Badge variant={check.status === 'passed' ? 'default' : check.status === 'failed' ? 'destructive' : 'secondary'}>
                      {check.status === 'passed' ? 'مجاز' : check.status === 'failed' ? 'مرفوض' : 'قيد المراجعة'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">المفتش:</span>
                      <p className="font-semibold text-xs">{check.inspector}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">تاريخ الفحص:</span>
                      <p className="font-semibold">{check.checkDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>النتيجة</span>
                      <span>{check.score}/100</span>
                    </div>
                    <Progress value={check.score} className="h-2" />
                  </div>

                  {check.issues.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-destructive">الملاحظات:</span>
                      <ul className="text-xs space-y-1">
                        {check.issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleRequalityCheck(check.id)}
                    >
                      <ClipboardCheck className="w-4 h-4 mr-1" />
                      إعادة فحص
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewQualityDetails(check.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      تفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  الإنتاجية اليومية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">مشروع مكتمل اليوم</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+15% من الأمس</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  متوسط وقت الإنتاج
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2</div>
                <p className="text-sm text-muted-foreground">أيام لكل مشروع</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">-8% تحسن</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  معدل نجاح الجودة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-sm text-muted-foreground">نسبة النجاح</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+2% تحسن</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقرير الإنتاجية الشهرية</CardTitle>
              <CardDescription>نظرة عامة على أداء الإنتاج لهذا الشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">156</div>
                    <p className="text-sm text-muted-foreground">مشروع مكتمل</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">28</div>
                    <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">92%</div>
                    <p className="text-sm text-muted-foreground">في الموعد</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">4.8</div>
                    <p className="text-sm text-muted-foreground">تقييم الجودة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Production Order Dialog */}
      <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>إنشاء أمر إنتاج جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل المشروع الجديد لإنشاء أمر إنتاج
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">اسم المشروع *</Label>
                <div className="relative">
                  <Factory className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="projectName"
                    placeholder="أدخل اسم المشروع"
                    value={newOrderData.projectName}
                    onChange={(e) => setNewOrderData(prev => ({ ...prev, projectName: e.target.value }))}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customer">العميل *</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="customer"
                    placeholder="أدخل اسم العميل"
                    value={newOrderData.customer}
                    onChange={(e) => setNewOrderData(prev => ({ ...prev, customer: e.target.value }))}
                    className="pr-10"
                  />
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="description">وصف المشروع</Label>
              <Textarea
                id="description"
                placeholder="أدخل وصف تفصيلي للمشروع"
                value={newOrderData.description}
                onChange={(e) => setNewOrderData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Priority and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">الأولوية</Label>
                <Select value={newOrderData.priority} onValueChange={(value) => setNewOrderData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="urgent">عاجلة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedDate">التاريخ المتوقع للتسليم *</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="expectedDate"
                    type="date"
                    value={newOrderData.expectedDate}
                    onChange={(e) => setNewOrderData(prev => ({ ...prev, expectedDate: e.target.value }))}
                    className="pr-10"
                  />
                </div>
              </div>
            </div>

            {/* Team Assignment */}
            <div className="space-y-4">
              <Label>الفريق المعين</Label>
              
              {/* Add team member */}
              <div className="flex gap-2">
                <Input
                  placeholder="أدخل اسم عضو الفريق"
                  value={newOrderData.newTeamMember}
                  onChange={(e) => setNewOrderData(prev => ({ ...prev, newTeamMember: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTeamMember()}
                />
                <Button type="button" onClick={handleAddTeamMember} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Team members list */}
              {newOrderData.assignedTeam.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">أعضاء الفريق المعينين:</Label>
                  <div className="flex flex-wrap gap-2">
                    {newOrderData.assignedTeam.map((member, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {member}
                        <button
                          type="button"
                          onClick={() => handleRemoveTeamMember(member)}
                          className="ml-1 text-muted-foreground hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveNewOrder} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                إنشاء أمر الإنتاج
              </Button>
              <Button variant="outline" onClick={() => setShowNewOrderDialog(false)} className="flex-1">
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Production Order Details Dialog */}
      <Dialog open={selectedOrder !== null} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل أمر الإنتاج</DialogTitle>
            <DialogDescription>
              عرض التفاصيل الكاملة لأمر الإنتاج
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">رقم الأمر</label>
                  <p className="font-semibold">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">اسم المشروع</label>
                  <p className="font-semibold">{selectedOrder.projectName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">العميل</label>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">الحالة</label>
                  <Badge variant={getStatusColor(selectedOrder.status)}>
                    {getStatusText(selectedOrder.status)}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">الأولوية</label>
                  <Badge variant={getPriorityColor(selectedOrder.priority)}>
                    {getPriorityText(selectedOrder.priority)}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">التقدم</label>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{selectedOrder.progress}%</span>
                    </div>
                    <Progress value={selectedOrder.progress} className="h-2" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">تاريخ البدء</label>
                  <p className="font-semibold">{selectedOrder.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">التاريخ المتوقع</label>
                  <p className="font-semibold">{selectedOrder.expectedDate}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">الفريق المعين</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedOrder.assignedTeam.map((member, index) => (
                    <Badge key={index} variant="secondary">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quality Check Details Dialog */}
      <Dialog open={selectedQualityCheck !== null} onOpenChange={() => setSelectedQualityCheck(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل فحص الجودة</DialogTitle>
            <DialogDescription>
              عرض التفاصيل الكاملة لفحص الجودة
            </DialogDescription>
          </DialogHeader>
          {selectedQualityCheck && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">رقم الأمر</label>
                  <p className="font-semibold">{selectedQualityCheck.orderNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">اسم المشروع</label>
                  <p className="font-semibold">{selectedQualityCheck.projectName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">المفتش</label>
                  <p className="font-semibold">{selectedQualityCheck.inspector}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">تاريخ الفحص</label>
                  <p className="font-semibold">{selectedQualityCheck.checkDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">الحالة</label>
                  <Badge variant={selectedQualityCheck.status === 'passed' ? 'default' : selectedQualityCheck.status === 'failed' ? 'destructive' : 'secondary'}>
                    {selectedQualityCheck.status === 'passed' ? 'مجاز' : selectedQualityCheck.status === 'failed' ? 'مرفوض' : 'قيد المراجعة'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">النتيجة</label>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{selectedQualityCheck.score}/100</span>
                    </div>
                    <Progress value={selectedQualityCheck.score} className="h-2" />
                  </div>
                </div>
              </div>
              {selectedQualityCheck.issues.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">الملاحظات والمشاكل</label>
                  <ul className="mt-2 space-y-2">
                    {selectedQualityCheck.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2 p-2 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Production;