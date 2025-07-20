import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Search, Phone, Mail, MapPin, Edit, Trash2, Eye, Calendar } from "lucide-react";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const employees = [
    { 
      id: 1, 
      name: "أحمد محمد السعيد", 
      email: "ahmed.saeed@company.com", 
      phone: "01012345678",
      department: "التصميم", 
      position: "مصمم جرافيك أول",
      salary: "8000",
      hireDate: "2022-03-15",
      status: "نشط",
      address: "الرياض، المملكة العربية السعودية"
    },
    { 
      id: 2, 
      name: "فاطمة علي أحمد", 
      email: "fatima.ali@company.com", 
      phone: "01087654321",
      department: "المحاسبة", 
      position: "محاسب مالي",
      salary: "7500",
      hireDate: "2021-09-10",
      status: "نشط",
      address: "جدة، المملكة العربية السعودية"
    },
    { 
      id: 3, 
      name: "محمد عبدالله الأحمد", 
      email: "mohammed.ahmed@company.com", 
      phone: "01055566677",
      department: "المبيعات", 
      position: "مندوب مبيعات",
      salary: "6000",
      hireDate: "2023-01-20",
      status: "نشط",
      address: "الدمام، المملكة العربية السعودية"
    },
    { 
      id: 4, 
      name: "سارة أحمد محمد", 
      email: "sara.ahmed@company.com", 
      phone: "01099887766",
      department: "التسويق", 
      position: "مسؤول تسويق رقمي",
      salary: "7000",
      hireDate: "2022-07-05",
      status: "إجازة",
      address: "مكة المكرمة، المملكة العربية السعودية"
    },
    { 
      id: 5, 
      name: "عبدالله خالد السلمان", 
      email: "abdullah.salman@company.com", 
      phone: "01044332211",
      department: "تقنية المعلومات", 
      position: "مطور ويب",
      salary: "9000",
      hireDate: "2020-11-12",
      status: "نشط",
      address: "الرياض، المملكة العربية السعودية"
    }
  ];

  const departments = [
    { value: "all", label: "جميع الأقسام" },
    { value: "التصميم", label: "التصميم" },
    { value: "المحاسبة", label: "المحاسبة" },
    { value: "المبيعات", label: "المبيعات" },
    { value: "التسويق", label: "التسويق" },
    { value: "تقنية المعلومات", label: "تقنية المعلومات" }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "التصميم": return "bg-creative-purple/10 text-creative-purple border-creative-purple/20 shadow-creative";
      case "المحاسبة": return "bg-creative-cyan/10 text-creative-cyan border-creative-cyan/20 shadow-creative";
      case "المبيعات": return "bg-creative-green/10 text-creative-green border-creative-green/20 shadow-creative";
      case "التسويق": return "bg-creative-orange/10 text-creative-orange border-creative-orange/20 shadow-creative";
      case "تقنية المعلومات": return "bg-creative-magenta/10 text-creative-magenta border-creative-magenta/20 shadow-creative";
      default: return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الموظفين</h1>
          <p className="text-muted-foreground">إدارة بيانات الموظفين والرواتب</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient" className="shadow-colorful hover:shadow-glow">
              <UserPlus className="w-4 h-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة موظف جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات الموظف الجديد ومعلومات العمل
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">الاسم الكامل</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">القسم</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="التصميم">التصميم</SelectItem>
                    <SelectItem value="المحاسبة">المحاسبة</SelectItem>
                    <SelectItem value="المبيعات">المبيعات</SelectItem>
                    <SelectItem value="التسويق">التسويق</SelectItem>
                    <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">المنصب</Label>
                <Input id="position" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">الراتب</Label>
                <Input id="salary" type="number" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="creative" type="submit" className="shadow-creative hover:shadow-glow">إضافة الموظف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الموظفين النشطين</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.filter(e => e.status === "نشط").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرواتب</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.reduce((sum, emp) => sum + parseInt(emp.salary), 0).toLocaleString()} ر.س
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد الأقسام</CardTitle>
            <UserPlus className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(employees.map(e => e.department)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* البحث والفلترة */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والفلترة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو المنصب أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب القسم" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الموظفين */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الموظفين</CardTitle>
          <CardDescription>إدارة وتعديل بيانات الموظفين</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg border border-accent/50 bg-gradient-to-r from-card to-accent/20 hover:shadow-colorful hover:border-primary/30 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-glow">
                    {employee.name.split(' ')[0].charAt(0)}{employee.name.split(' ')[1]?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {employee.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {employee.hireDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {employee.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <Badge className={getDepartmentColor(employee.department)}>
                      {employee.department}
                    </Badge>
                    <p className="text-lg font-bold mt-1">
                      {parseInt(employee.salary).toLocaleString()} ر.س
                    </p>
                  </div>
                  <Badge 
                    variant={employee.status === "نشط" ? "default" : "secondary"}
                    className={employee.status === "نشط" ? 
                      "bg-creative-green/10 text-creative-green border-creative-green/20 shadow-sm" : 
                      "bg-creative-yellow/10 text-creative-yellow border-creative-yellow/20 shadow-sm"
                    }
                  >
                    {employee.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button 
                      variant="cyan" 
                      size="sm" 
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="orange" 
                      size="sm" 
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="hover:scale-110 transition-all duration-300 shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;