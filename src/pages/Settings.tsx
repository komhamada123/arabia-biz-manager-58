import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Building, Bell, Shield, Palette, Database, Mail, Phone } from "lucide-react";
import CurrencyTestCard from "@/components/CurrencyTestCard";
import { handleAddNew } from "@/utils/handlers";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orders: true,
    payments: true,
    reports: false
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: "مكاتب الدعاية والإعلان",
    email: "info@company.com",
    phone: "01096215170",
    address: "الرياض، المملكة العربية السعودية",
    taxNumber: "123456789",
    website: "www.company.com"
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة إعدادات النظام والشركة</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">معلومات الشركة</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="system">النظام</TabsTrigger>
        </TabsList>

        {/* معلومات الشركة */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                معلومات الشركة الأساسية
              </CardTitle>
              <CardDescription>تحديث بيانات الشركة الظاهرة في النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input 
                    id="company-name" 
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">البريد الإلكتروني</Label>
                  <Input 
                    id="company-email" 
                    type="email" 
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">رقم الهاتف</Label>
                  <Input 
                    id="company-phone" 
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-number">الرقم الضريبي</Label>
                  <Input 
                    id="tax-number" 
                    value={companyInfo.taxNumber}
                    onChange={(e) => setCompanyInfo({...companyInfo, taxNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">الموقع الإلكتروني</Label>
                  <Input 
                    id="website" 
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">العنوان</Label>
                <Textarea 
                  id="company-address" 
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  rows={3}
                />
              </div>
              <Button variant="gradient" onClick={() => handleAddNew("إعدادات الشركة")} className="shadow-colorful hover:shadow-glow">حفظ التغييرات</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الفواتير</CardTitle>
              <CardDescription>تخصيص شكل ومحتوى الفواتير</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">بادئة رقم الفاتورة</Label>
                  <Input id="invoice-prefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-currency">العملة الافتراضية</Label>
                  <Select defaultValue="SAR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (ر.س)</SelectItem>
                      <SelectItem value="AED">درهم إماراتي (د.إ)</SelectItem>
                      <SelectItem value="EGP">جنيه مصري (ج.م)</SelectItem>
                      <SelectItem value="JOD">دينار أردني (د.أ)</SelectItem>
                      <SelectItem value="KWD">دينار كويتي (د.ك)</SelectItem>
                      <SelectItem value="QAR">ريال قطري (ر.ق)</SelectItem>
                      <SelectItem value="BHD">دينار بحريني (د.ب)</SelectItem>
                      <SelectItem value="OMR">ريال عماني (ر.ع)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-terms">شروط وأحكام الفاتورة</Label>
                <Textarea 
                  id="invoice-terms" 
                  defaultValue="يرجى سداد المبلغ خلال 30 يوم من تاريخ إصدار الفاتورة"
                  rows={3}
                />
              </div>
              <Button variant="creative" className="shadow-creative hover:shadow-glow">حفظ إعدادات الفواتير</Button>
            </CardContent>
          </Card>

          {/* Currency Test Card */}
          <CurrencyTestCard />
        </TabsContent>

        {/* الإشعارات */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>تخصيص أنواع الإشعارات التي تريد تلقيها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">طرق الإشعار</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات البريد الإلكتروني</Label>
                      <p className="text-sm text-muted-foreground">تلقي الإشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات الرسائل النصية</Label>
                      <p className="text-sm text-muted-foreground">تلقي الإشعارات عبر الرسائل النصية</p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الإشعارات الفورية</Label>
                      <p className="text-sm text-muted-foreground">تلقي الإشعارات الفورية في المتصفح</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">أنواع الإشعارات</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات الطلبات الجديدة</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند وصول طلب جديد</p>
                    </div>
                    <Switch 
                      checked={notifications.orders}
                      onCheckedChange={(checked) => setNotifications({...notifications, orders: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات المدفوعات</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند تلقي دفعة جديدة</p>
                    </div>
                    <Switch 
                      checked={notifications.payments}
                      onCheckedChange={(checked) => setNotifications({...notifications, payments: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات التقارير</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند إنتاج تقرير جديد</p>
                    </div>
                    <Switch 
                      checked={notifications.reports}
                      onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
                    />
                  </div>
                </div>
              </div>

              <Button variant="purple" className="shadow-creative hover:shadow-glow">حفظ إعدادات الإشعارات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأمان */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إعدادات الأمان
              </CardTitle>
              <CardDescription>إدارة إعدادات الأمان وكلمات المرور</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">تغيير كلمة المرور</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button variant="orange" className="shadow-creative hover:shadow-glow">تغيير كلمة المرور</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">إعدادات الأمان المتقدمة</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>المصادقة الثنائية</Label>
                      <p className="text-sm text-muted-foreground">تفعيل المصادقة بخطوتين للحماية الإضافية</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>تسجيل الخروج التلقائي</Label>
                      <p className="text-sm text-muted-foreground">تسجيل الخروج بعد فترة من عدم النشاط</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">سجل الأنشطة</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded bg-muted">
                    <span>تسجيل دخول من الرياض</span>
                    <span className="text-muted-foreground">اليوم، 09:30 ص</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-muted">
                    <span>تغيير كلمة المرور</span>
                    <span className="text-muted-foreground">أمس، 03:15 م</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-muted">
                    <span>تسجيل دخول من جدة</span>
                    <span className="text-muted-foreground">02/01/2024، 11:45 ص</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المظهر */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                إعدادات المظهر
              </CardTitle>
              <CardDescription>تخصيص شكل ومظهر النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>السمة (Theme)</Label>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">فاتح</SelectItem>
                      <SelectItem value="dark">داكن</SelectItem>
                      <SelectItem value="system">تلقائي حسب النظام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>اللغة</Label>
                  <Select defaultValue="ar">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>اتجاه النص</Label>
                  <Select defaultValue="rtl">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rtl">من اليمين لليسار</SelectItem>
                      <SelectItem value="ltr">من اليسار لليمين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>العملة الافتراضية</Label>
                  <Select defaultValue="SAR">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (ر.س)</SelectItem>
                      <SelectItem value="AED">درهم إماراتي (د.إ)</SelectItem>
                      <SelectItem value="EGP">جنيه مصري (ج.م)</SelectItem>
                      <SelectItem value="JOD">دينار أردني (د.أ)</SelectItem>
                      <SelectItem value="KWD">دينار كويتي (د.ك)</SelectItem>
                      <SelectItem value="QAR">ريال قطري (ر.ق)</SelectItem>
                      <SelectItem value="BHD">دينار بحريني (د.ب)</SelectItem>
                      <SelectItem value="OMR">ريال عماني (ر.ع)</SelectItem>
                      <SelectItem value="LBP">ليرة لبنانية (ل.ل)</SelectItem>
                      <SelectItem value="SYP">ليرة سورية (ل.س)</SelectItem>
                      <SelectItem value="IQD">دينار عراقي (د.ع)</SelectItem>
                      <SelectItem value="LYD">دينار ليبي (د.ل)</SelectItem>
                      <SelectItem value="TND">دينار تونسي (د.ت)</SelectItem>
                      <SelectItem value="DZD">دينار جزائري (د.ج)</SelectItem>
                      <SelectItem value="MAD">درهم مغربي (د.م)</SelectItem>
                      <SelectItem value="MRU">أوقية موريتانية (أ.م)</SelectItem>
                      <SelectItem value="SDG">جنيه سوداني (ج.س)</SelectItem>
                      <SelectItem value="SOS">شلن صومالي (ش.ص)</SelectItem>
                      <SelectItem value="DJF">فرنك جيبوتي (ف.ج)</SelectItem>
                      <SelectItem value="KMF">فرنك جزر القمر (ف.ق)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>المنطقة الزمنية</Label>
                  <Select defaultValue="asia/riyadh">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia/riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="asia/dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="africa/cairo">القاهرة (GMT+2)</SelectItem>
                      <SelectItem value="asia/amman">عمّان (GMT+3)</SelectItem>
                      <SelectItem value="asia/kuwait">الكويت (GMT+3)</SelectItem>
                      <SelectItem value="asia/qatar">الدوحة (GMT+3)</SelectItem>
                      <SelectItem value="asia/bahrain">المنامة (GMT+3)</SelectItem>
                      <SelectItem value="asia/muscat">مسقط (GMT+4)</SelectItem>
                      <SelectItem value="asia/beirut">بيروت (GMT+2)</SelectItem>
                      <SelectItem value="asia/damascus">دمشق (GMT+3)</SelectItem>
                      <SelectItem value="asia/baghdad">بغداد (GMT+3)</SelectItem>
                      <SelectItem value="africa/tripoli">طرابلس (GMT+2)</SelectItem>
                      <SelectItem value="africa/tunis">تونس (GMT+1)</SelectItem>
                      <SelectItem value="africa/algiers">الجزائر (GMT+1)</SelectItem>
                      <SelectItem value="africa/casablanca">الدار البيضاء (GMT+1)</SelectItem>
                      <SelectItem value="africa/nouakchott">نواكشوط (GMT+0)</SelectItem>
                      <SelectItem value="africa/khartoum">الخرطوم (GMT+2)</SelectItem>
                      <SelectItem value="africa/mogadishu">مقديشو (GMT+3)</SelectItem>
                      <SelectItem value="africa/djibouti">جيبوتي (GMT+3)</SelectItem>
                      <SelectItem value="indian/comoro">كومورو (GMT+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">إعدادات العرض</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>ضغط الشريط الجانبي</Label>
                      <p className="text-sm text-muted-foreground">إظهار الشريط الجانبي مضغوطاً افتراضياً</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إظهار التلميحات</Label>
                      <p className="text-sm text-muted-foreground">إظهار نصائح التلميحات للأزرار والعناصر</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button variant="cyan" className="shadow-colorful hover:shadow-glow">حفظ إعدادات المظهر</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* النظام */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                إعدادات النظام
              </CardTitle>
              <CardDescription>إعدادات النظام والصيانة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">النسخ الاحتياطي</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>النسخ الاحتياطي التلقائي</Label>
                      <p className="text-sm text-muted-foreground">إنشاء نسخة احتياطية يومياً</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="green" className="shadow-creative hover:shadow-glow hover:scale-105 transition-all duration-300">إنشاء نسخة احتياطية الآن</Button>
                    <Button variant="yellow" className="shadow-creative hover:shadow-glow hover:scale-105 transition-all duration-300">استرداد النسخة الاحتياطية</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">التخزين والأداء</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">245 MB</div>
                    <div className="text-sm text-muted-foreground">مساحة مستخدمة</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground">إجمالي الملفات</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-sm text-muted-foreground">وقت التشغيل</div>
                  </div>
                </div>
                <Button variant="magenta" className="shadow-creative hover:shadow-glow hover:scale-105 transition-all duration-300">تنظيف الملفات المؤقتة</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">معلومات النظام</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>إصدار النظام:</span>
                    <span className="font-mono">v2.1.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>آخر تحديث:</span>
                    <span>15 يناير 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المطور:</span>
                    <span>محمد حرفوش</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رقم الهاتف:</span>
                    <span>01096215170</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;