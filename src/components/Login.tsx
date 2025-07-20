import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Lock, Building2 } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center">
              <Building2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              نظام إدارة مكاتب الدعاية والإعلان
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              قم بتسجيل الدخول للوصول إلى النظام
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  اسم المستخدم
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary h-12 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
            
            {/* Enhanced Developer Credits */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="relative group">
                {/* Animated Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-all duration-700 animate-pulse"></div>
                
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
                  {/* Top Decoration */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">م</span>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-3 mt-2">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        تطوير وتصميم
                      </h3>
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                        محمد حرفوش
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        مطور ومصمم محترف
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <div className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                          <p className="text-sm font-bold text-white">
                            01096215170
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 mt-4">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      جميع الحقوق محفوظة © {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;