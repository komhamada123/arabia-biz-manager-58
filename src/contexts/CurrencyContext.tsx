import { createContext, useContext, useState, ReactNode } from 'react';

// العملات المدعومة
export const currencies = [
  { code: "SAR", name: "ريال سعودي", symbol: "ر.س", rate: 1 },
  { code: "AED", name: "درهم إماراتي", symbol: "د.إ", rate: 1.02 },
  { code: "EGP", name: "جنيه مصري", symbol: "ج.م", rate: 8.12 },
  { code: "JOD", name: "دينار أردني", symbol: "د.أ", rate: 0.27 },
  { code: "KWD", name: "دينار كويتي", symbol: "د.ك", rate: 0.12 },
  { code: "QAR", name: "ريال قطري", symbol: "ر.ق", rate: 1.37 },
  { code: "BHD", name: "دينار بحريني", symbol: "د.ب", rate: 0.14 },
  { code: "OMR", name: "ريال عماني", symbol: "ر.ع", rate: 0.14 },
  { code: "LBP", name: "ليرة لبنانية", symbol: "ل.ل", rate: 5650 },
  { code: "SYP", name: "ليرة سورية", symbol: "ل.س", rate: 943 },
  { code: "IQD", name: "دينار عراقي", symbol: "د.ع", rate: 491 },
  { code: "LYD", name: "دينار ليبي", symbol: "د.ل", rate: 1.8 },
  { code: "TND", name: "دينار تونسي", symbol: "د.ت", rate: 1.17 },
  { code: "DZD", name: "دينار جزائري", symbol: "د.ج", rate: 50.2 },
  { code: "MAD", name: "درهم مغربي", symbol: "د.م", rate: 3.7 },
  { code: "MRU", name: "أوقية موريتانية", symbol: "أ.م", rate: 14.1 },
  { code: "SDG", name: "جنيه سوداني", symbol: "ج.س", rate: 225 },
  { code: "SOS", name: "شلن صومالي", symbol: "ش.ص", rate: 215 },
  { code: "DJF", name: "فرنك جيبوتي", symbol: "ف.ج", rate: 66.7 },
  { code: "KMF", name: "فرنك جزر القمر", symbol: "ف.ق", rate: 165 }
];

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  convertAmount: (amount: number, fromCurrency?: Currency) => number;
  formatAmount: (amount: number, fromCurrency?: Currency) => string;
  getCurrencyByCode: (code: string) => Currency | undefined;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  // تحميل العملة المحفوظة من localStorage أو استخدام الافتراضية
  const getInitialCurrency = (): Currency => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const parsedCurrency = JSON.parse(savedCurrency);
      const foundCurrency = currencies.find(c => c.code === parsedCurrency.code);
      if (foundCurrency) return foundCurrency;
    }
    return currencies[0]; // الريال السعودي كعملة افتراضية
  };

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(getInitialCurrency);

  // حفظ العملة في localStorage عند تغييرها
  const handleSetSelectedCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
  };

  const getCurrencyByCode = (code: string): Currency | undefined => {
    return currencies.find(currency => currency.code === code);
  };

  const convertAmount = (amount: number, fromCurrency: Currency = currencies[0]): number => {
    // تحويل من العملة الأساسية (SAR) إلى العملة المختارة
    const amountInSAR = amount / fromCurrency.rate;
    return amountInSAR * selectedCurrency.rate;
  };

  const formatAmount = (amount: number, fromCurrency: Currency = currencies[0]): string => {
    const convertedAmount = convertAmount(amount, fromCurrency);
    return `${convertedAmount.toLocaleString('ar-SA', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 2 
    })} ${selectedCurrency.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency: handleSetSelectedCurrency,
      convertAmount,
      formatAmount,
      getCurrencyByCode,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};