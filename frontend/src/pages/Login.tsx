import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    
    if (pass.length < minLength) return "La contraseña debe tener al menos 8 caracteres.";
    if (!hasUpper) return "La contraseña debe incluir al menos una letra mayúscula.";
    if (!hasLower) return "La contraseña debe incluir al menos una letra minúscula.";
    if (!hasNumber) return "La contraseña debe incluir al menos un número.";
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const passError = validatePassword(password);
        if (passError) throw new Error(passError);
        if (!username.trim()) throw new Error("El nombre de usuario es requerido.");

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            }
          }
        });
        
        if (error) throw error;
        toast({
          title: "Registro en progreso",
          description: "Revisa tu bandeja de correo para verificar tu cuenta, o inicia sesión si las conformaciones están desactivadas.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: error.message || "Ha ocurrido un error durante la autenticación.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Card className="w-full max-w-md border shadow-2xl relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <CardHeader className="text-center pt-8">
          <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            <span className="text-blue-600 dark:text-blue-400">CyberLeens</span> Recon
          </CardTitle>
          <CardDescription className="text-sm mt-2 text-slate-500">
            {isLogin ? "Inicia sesión para entrar al panel de reconocimiento" : "Crea una cuenta nueva para empezar a escanear"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario o Alias</Label>
                <Input
                  id="username"
                  placeholder="ej. hacker_anonimo"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isLogin && (
                <p className="text-xs text-muted-foreground mt-1">
                  Mínimo 8 caracteres, incluyendo mayúscula, minúscula y número.
                </p>
              )}
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md mt-4" disabled={loading}>
              {loading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Registrar Cuenta")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 border-t border-slate-100 dark:border-slate-800 pt-6 mt-2">
          <Button variant="ghost" onClick={() => { setIsLogin(!isLogin); setPassword(""); setEmail(""); setUsername(""); }} className="text-sm text-slate-500 hover:text-blue-600">
            {isLogin ? "¿No tienes cuenta? Regístrate aquí." : "¿Ya tienes cuenta? Inicia sesión aquí."}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
