import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, TrendingUp, DollarSign, BarChart3, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ProjectCost {
  id: string;
  name: string;
  materialCost: number;
  laborCost: number;
  overheadCost: number;
  totalCost: number;
  sellingPrice: number;
  profitMargin: number;
  status: 'قيد التحضير' | 'معتمد' | 'مكتمل';
  date: string;
}

interface CompetitivePricing {
  id: string;
  competitor: string;
  service: string;
  price: number;
  ourPrice: number;
  difference: number;
  status: 'أعلى' | 'أقل' | 'مساوي';
}

const CostPricing = () => {
  const [projectCosts, setProjectCosts] = useState<ProjectCost[]>([
    {
      id: "1",
      name: "مشروع طباعة كتالوج تجاري",
      materialCost: 500,
      laborCost: 300,
      overheadCost: 100,
      totalCost: 900,
      sellingPrice: 1350,
      profitMargin: 50,
      status: 'معتمد',
      date: '2024-01-15'
    },
    {
      id: "2", 
      name: "تصميم هوية بصرية متكاملة",
      materialCost: 200,
      laborCost: 800,
      overheadCost: 150,
      totalCost: 1150,
      sellingPrice: 1840,
      profitMargin: 60,
      status: 'قيد التحضير',
      date: '2024-01-20'
    }
  ]);

  const [competitivePricing, setCompetitivePricing] = useState<CompetitivePricing[]>([
    {
      id: "1",
      competitor: "شركة الإبداع للدعاية",
      service: "تصميم لوجو",
      price: 800,
      ourPrice: 750,
      difference: -50,
      status: 'أقل'
    },
    {
      id: "2",
      competitor: "مطبعة الأهرام",
      service: "طباعة كتالوج A4 ملون",
      price: 1200,
      ourPrice: 1350,
      difference: 150,
      status: 'أعلى'
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: '',
    materialCost: 0,
    laborCost: 0,
    overheadCost: 0,
    profitMarginPercent: 50
  });

  const calculateTotalCost = () => {
    return newProject.materialCost + newProject.laborCost + newProject.overheadCost;
  };

  const calculateSellingPrice = () => {
    const totalCost = calculateTotalCost();
    return totalCost * (1 + newProject.profitMarginPercent / 100);
  };

  const addNewProject = () => {
    const totalCost = calculateTotalCost();
    const sellingPrice = calculateSellingPrice();
    
    const project: ProjectCost = {
      id: Date.now().toString(),
      name: newProject.name,
      materialCost: newProject.materialCost,
      laborCost: newProject.laborCost,
      overheadCost: newProject.overheadCost,
      totalCost,
      sellingPrice,
      profitMargin: newProject.profitMarginPercent,
      status: 'قيد التحضير',
      date: new Date().toISOString().split('T')[0]
    };

    setProjectCosts([...projectCosts, project]);
    setNewProject({ name: '', materialCost: 0, laborCost: 0, overheadCost: 0, profitMarginPercent: 50 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'معتمد': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'قيد التحضير': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'مكتمل': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriceStatusColor = (status: string) => {
    switch (status) {
      case 'أعلى': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'أقل': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'مساوي': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 rtl">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-3xl font-bold text-foreground mb-2">التكاليف والتسعير</h1>
        <p className="text-muted-foreground">إدارة تكاليف المشاريع والتسعير التنافسي</p>
      </div>

      <Tabs defaultValue="project-costs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="project-costs" className="gap-2">
            <Calculator className="w-4 h-4" />
            حساب تكلفة المشاريع
          </TabsTrigger>
          <TabsTrigger value="competitive-pricing" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            التسعير التنافسي
          </TabsTrigger>
          <TabsTrigger value="profit-margins" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            هوامش الربح
          </TabsTrigger>
        </TabsList>

        {/* حساب تكلفة المشاريع */}
        <TabsContent value="project-costs" className="space-y-6">
          {/* إضافة مشروع جديد */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <PlusCircle className="w-5 h-5" />
                إضافة مشروع جديد
              </CardTitle>
              <CardDescription className="text-right">
                احسب تكلفة مشروع جديد وحدد السعر النهائي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name" className="text-right block">اسم المشروع</Label>
                  <Input
                    id="project-name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="أدخل اسم المشروع"
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="material-cost" className="text-right block">تكلفة المواد</Label>
                  <Input
                    id="material-cost"
                    type="number"
                    value={newProject.materialCost}
                    onChange={(e) => setNewProject({...newProject, materialCost: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="labor-cost" className="text-right block">تكلفة العمالة</Label>
                  <Input
                    id="labor-cost"
                    type="number"
                    value={newProject.laborCost}
                    onChange={(e) => setNewProject({...newProject, laborCost: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="overhead-cost" className="text-right block">التكاليف الإضافية</Label>
                  <Input
                    id="overhead-cost"
                    type="number"
                    value={newProject.overheadCost}
                    onChange={(e) => setNewProject({...newProject, overheadCost: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profit-margin" className="text-right block">هامش الربح (%)</Label>
                  <Input
                    id="profit-margin"
                    type="number"
                    value={newProject.profitMarginPercent}
                    onChange={(e) => setNewProject({...newProject, profitMarginPercent: Number(e.target.value)})}
                    placeholder="50"
                  />
                </div>
              </div>
              
              {/* عرض الحسابات */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">إجمالي التكلفة</p>
                    <p className="text-2xl font-bold text-orange-600">{calculateTotalCost().toLocaleString()} ر.س</p>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">سعر البيع المقترح</p>
                    <p className="text-2xl font-bold text-green-600">{calculateSellingPrice().toLocaleString()} ر.س</p>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">الربح المتوقع</p>
                    <p className="text-2xl font-bold text-blue-600">{(calculateSellingPrice() - calculateTotalCost()).toLocaleString()} ر.س</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button 
                onClick={addNewProject} 
                className="w-full"
                disabled={!newProject.name || calculateTotalCost() === 0}
              >
                إضافة المشروع
              </Button>
            </CardContent>
          </Card>

          {/* قائمة المشاريع */}
          <Card>
            <CardHeader>
              <CardTitle className="text-right">المشاريع المحفوظة</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المشروع</TableHead>
                    <TableHead className="text-right">تكلفة المواد</TableHead>
                    <TableHead className="text-right">تكلفة العمالة</TableHead>
                    <TableHead className="text-right">إجمالي التكلفة</TableHead>
                    <TableHead className="text-right">سعر البيع</TableHead>
                    <TableHead className="text-right">هامش الربح</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectCosts.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium text-right">{project.name}</TableCell>
                      <TableCell className="text-right">{project.materialCost.toLocaleString()} ر.س</TableCell>
                      <TableCell className="text-right">{project.laborCost.toLocaleString()} ر.س</TableCell>
                      <TableCell className="text-right">{project.totalCost.toLocaleString()} ر.س</TableCell>
                      <TableCell className="text-right">{project.sellingPrice.toLocaleString()} ر.س</TableCell>
                      <TableCell className="text-right">{project.profitMargin}%</TableCell>
                      <TableCell className="text-right">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التسعير التنافسي */}
        <TabsContent value="competitive-pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-right">مقارنة الأسعار مع المنافسين</CardTitle>
              <CardDescription className="text-right">
                تتبع أسعار المنافسين وحافظ على قدرتك التنافسية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المنافس</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">سعرهم</TableHead>
                    <TableHead className="text-right">سعرنا</TableHead>
                    <TableHead className="text-right">الفرق</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitivePricing.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-right">{item.competitor}</TableCell>
                      <TableCell className="text-right">{item.service}</TableCell>
                      <TableCell className="text-right">{item.price.toLocaleString()} ر.س</TableCell>
                      <TableCell className="text-right">{item.ourPrice.toLocaleString()} ر.س</TableCell>
                      <TableCell className="text-right">
                        <span className={item.difference > 0 ? 'text-red-600' : 'text-green-600'}>
                          {item.difference > 0 ? '+' : ''}{item.difference.toLocaleString()} ر.س
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={getPriceStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* هوامش الربح */}
        <TabsContent value="profit-margins" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-lg">متوسط هامش الربح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 mb-2">52%</p>
                  <p className="text-sm text-muted-foreground">من إجمالي المشاريع</p>
                  <Progress value={52} className="mt-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-lg">أعلى هامش ربح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-2">60%</p>
                  <p className="text-sm text-muted-foreground">تصميم هوية بصرية</p>
                  <Progress value={60} className="mt-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-right text-lg">أقل هامش ربح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600 mb-2">50%</p>
                  <p className="text-sm text-muted-foreground">طباعة كتالوج تجاري</p>
                  <Progress value={50} className="mt-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-right">توزيع هوامش الربح حسب نوع المشروع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-right flex-1">
                    <p className="font-medium">تصميم الهوية البصرية</p>
                    <p className="text-sm text-muted-foreground">60% هامش ربح</p>
                  </div>
                  <Progress value={60} className="w-1/3" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-right flex-1">
                    <p className="font-medium">خدمات الطباعة</p>
                    <p className="text-sm text-muted-foreground">45% هامش ربح</p>
                  </div>
                  <Progress value={45} className="w-1/3" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-right flex-1">
                    <p className="font-medium">التصميم الجرافيكي</p>
                    <p className="text-sm text-muted-foreground">55% هامش ربح</p>
                  </div>
                  <Progress value={55} className="w-1/3" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-right flex-1">
                    <p className="font-medium">اللافتات والإعلانات</p>
                    <p className="text-sm text-muted-foreground">40% هامش ربح</p>
                  </div>
                  <Progress value={40} className="w-1/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostPricing;