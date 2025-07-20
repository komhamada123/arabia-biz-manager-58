import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Search, Shield, Edit, Trash2, Eye, Settings } from "lucide-react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const users = [
    { 
      id: 1, 
      name: "أحمد محمد", 
      email: "ahmed@company.com", 
      role: "مدير عام", 
      status: "نشط", 
      lastLogin: "2024-01-15",
      permissions: ["قراءة", "كتابة", "حذف", "إدارة"]
    },
    { 
      id: 2, 
      name: "فاطمة علي", 
      email: "fatima@company.com", 
      role: "محاسب", 
      status: "نشط", 
      lastLogin: "2024-01-14",
      permissions: ["قراءة", "كتابة"]
    },
    { 
      id: 3, 
      name: "محمد السعيد", 
      email: "mohammed@company.com", 
      role: "مصمم", 
      status: "نشط", 
      lastLogin: "2024-01-13",
      permissions: ["قراءة", "كتابة"]
    },
    { 
      id: 4, 
      name: "سارة أحمد", 
      email: "sara@company.com", 
      role: "مسؤول مبيعات", 
      status: "غير نشط", 
      lastLogin: "2024-01-10",
      permissions: ["قراءة"]
    },
    { 
      id: 5, 
      name: "عبدالله خالد", 
      email: "abdullah@company.com", 
      role: "مطور ويب", 
      status: "نشط", 
      lastLogin: "2024-01-15",
      permissions: ["قراءة", "كتابة", "إدارة"]
    }
  ];

  const roles = [
    { value: "all", label: "جميع الأدوار" },
    { value: "مدير عام", label: "مدير عام" },
    { value: "محاسب", label: "محاسب" },
    { value: "مصمم", label: "مصمم" },
    { value: "مسؤول مبيعات", label: "مسؤول مبيعات" },
    { value: "مطور ويب", label: "مطور ويب" }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "مدير عام": return "bg-creative-magenta/10 text-creative-magenta border-creative-magenta/20 shadow-creative";
      case "محاسب": return "bg-creative-cyan/10 text-creative-cyan border-creative-cyan/20 shadow-creative";
      case "مصمم": return "bg-creative-purple/10 text-creative-purple border-creative-purple/20 shadow-creative";
      case "مسؤول مبيعات": return "bg-creative-green/10 text-creative-green border-creative-green/20 shadow-creative";
      case "مطور ويب": return "bg-creative-orange/10 text-creative-orange border-creative-orange/20 shadow-creative";
      default: return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">إدارة حسابات المستخدمين والصلاحيات</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient" className="shadow-colorful hover:shadow-glow">
              <UserPlus className="w-4 h-4 ml-2" />
              إضافة مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات المستخدم الجديد والصلاحيات المطلوبة
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  الاسم
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  البريد الإلكتروني
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  الدور
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="محاسب">محاسب</SelectItem>
                    <SelectItem value="مصمم">مصمم</SelectItem>
                    <SelectItem value="مسؤول مبيعات">مسؤول مبيعات</SelectItem>
                    <SelectItem value="مطور ويب">مطور ويب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="creative" type="submit" className="shadow-creative hover:shadow-glow">إضافة المستخدم</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستخدمين النشطين</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === "نشط").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المديرين</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === "مدير عام").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">آخر تسجيل دخول</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">اليوم</div>
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
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب الدور" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* قائمة المستخدمين */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
          <CardDescription>إدارة وتعديل بيانات المستخدمين</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-accent/50 bg-gradient-to-r from-card to-accent/20 hover:shadow-colorful hover:border-primary/30 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-glow">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex gap-2 mt-1">
                      {user.permissions.slice(0, 3).map((permission, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs bg-accent/30 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
                        >
                          {permission}
                        </Badge>
                      ))}
                      {user.permissions.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-creative-orange/10 text-creative-orange border-creative-orange/20"
                        >
                          +{user.permissions.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      آخر دخول: {user.lastLogin}
                    </p>
                  </div>
                  <Badge 
                    variant={user.status === "نشط" ? "default" : "secondary"}
                    className={user.status === "نشط" ? 
                      "bg-creative-green/10 text-creative-green border-creative-green/20 shadow-sm" : 
                      "bg-danger/10 text-danger border-danger/20 shadow-sm"
                    }
                  >
                    {user.status}
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
                      variant="purple" 
                      size="sm" 
                      className="hover:scale-110 transition-all duration-300"
                    >
                      <Settings className="w-4 h-4" />
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

export default Users;