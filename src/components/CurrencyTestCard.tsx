import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react";

const CurrencyTestCard = () => {
  const { selectedCurrency, formatAmount } = useCurrency();

  const testAmounts = [
    { label: "قيمة فاتورة", amount: 2500, icon: DollarSign },
    { label: "إجمالي المبيعات", amount: 45000, icon: TrendingUp },
    { label: "قيمة طلب", amount: 1800, icon: ShoppingCart },
    { label: "رصيد العميل", amount: 12300, icon: Users }
  ];

  return (
    <Card className="arabic-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          اختبار تبديل العملات
        </CardTitle>
        <CardDescription>
          العملة المختارة حالياً: {selectedCurrency.name} ({selectedCurrency.symbol})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testAmounts.map((item, index) => (
            <div 
              key={index} 
              className="p-4 border border-border rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-bold text-primary">
                    {formatAmount(item.amount)}
                  </p>
                </div>
                <item.icon className="w-8 h-8 text-primary/60" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
          <p className="text-sm text-info">
            💡 <strong>لاختبار تبديل العملات:</strong> استخدم قائمة العملات في الجهة العلوية من الصفحة وشاهد كيف تتغير القيم تلقائياً في جميع أنحاء النظام.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyTestCard;