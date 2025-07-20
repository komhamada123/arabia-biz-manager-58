import { toast } from "@/hooks/use-toast";

// دوال معالجة الأحداث العامة
export const handleAddNew = (type: string) => {
  toast({
    title: "إضافة جديد",
    description: `سيتم إضافة ${type} جديد قريباً`,
    variant: "default",
  });
};

export const handleEdit = (id: string, type: string) => {
  toast({
    title: "تعديل",
    description: `سيتم تعديل ${type} رقم: ${id}`,
    variant: "default",
  });
};

export const handleView = (id: string, type: string) => {
  toast({
    title: "عرض التفاصيل",
    description: `عرض تفاصيل ${type} رقم: ${id}`,
    variant: "default",
  });
};

export const handleDelete = (id: string, type: string) => {
  if (confirm(`هل أنت متأكد من حذف ${type} رقم: ${id}؟`)) {
    toast({
      title: "تم الحذف",
      description: `تم حذف ${type} رقم: ${id} بنجاح`,
      variant: "default",
    });
  }
};

export const handleExport = (type: string) => {
  toast({
    title: "تصدير البيانات",
    description: `سيتم تصدير بيانات ${type} إلى Excel`,
    variant: "default",
  });
};

export const handleImport = (type: string) => {
  toast({
    title: "استيراد البيانات",
    description: `سيتم استيراد بيانات ${type} من Excel`,
    variant: "default",
  });
};

export const handleSend = (id: string, type: string) => {
  toast({
    title: "إرسال",
    description: `تم إرسال ${type} رقم: ${id} بنجاح`,
    variant: "default",
  });
};

export const handleStart = (id: string) => {
  toast({
    title: "بدء المهمة",
    description: `تم بدء المهمة رقم: ${id}`,
    variant: "default",
  });
};

export const handleComplete = (id: string) => {
  toast({
    title: "إكمال المهمة",
    description: `تم إكمال المهمة رقم: ${id}`,
    variant: "default",
  });
};

export const handleStatusChange = (id: string, newStatus: string, type: string) => {
  toast({
    title: "تغيير الحالة",
    description: `تم تغيير حالة ${type} رقم: ${id} إلى ${newStatus}`,
    variant: "default",
  });
};