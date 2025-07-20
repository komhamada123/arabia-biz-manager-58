import { useToast as useToastOriginal } from "@/hooks/use-toast";

export const useToast = useToastOriginal;

// تصدير دالة toast للاستخدام المباشر
export const showToast = {
  success: (message: string) => {
    const { toast } = useToastOriginal();
    toast({
      title: "نجح العملية",
      description: message,
      variant: "default",
    });
  },
  error: (message: string) => {
    const { toast } = useToastOriginal();
    toast({
      title: "خطأ",
      description: message,
      variant: "destructive",
    });
  },
  warning: (message: string) => {
    const { toast } = useToastOriginal();
    toast({
      title: "تحذير",
      description: message,
      variant: "default",
    });
  },
  info: (message: string) => {
    const { toast } = useToastOriginal();
    toast({
      title: "معلومة",
      description: message,
      variant: "default",
    });
  }
};