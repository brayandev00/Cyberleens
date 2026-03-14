import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Settings, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function UserConfigPanel() {
  const [userData, setUserData] = useState<any>(null);
  const [language, setLanguage] = useState(localStorage.getItem('app-language') || 'es');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserData(user);
        setUsername(user.user_metadata?.username || '');
      }
    });
  }, []);

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    localStorage.setItem('app-language', val);
    toast({
      title: "Idioma Cambiado",
      description: val === 'es' ? "Idioma configurado a Español (Predeterminado)." : "Language set to English (Solo a nivel de preferencia).",
    });
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { username }
      });
      if (error) throw error;
      toast({
        title: "Perfil Actualizado",
        description: "Tus datos de usuario fueron guardados correctamente.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Error actualizando perfil.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Configuración y Perfil
        </CardTitle>
        <CardDescription>Visualiza tu usuario y cambia preferencias del sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 text-left">
          
          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-4">
              <User className="h-4 w-4" />
              Datos del Usuario
            </h3>
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="emailInput">Correo Electrónico (No editable)</Label>
                <Input id="emailInput" value={userData?.email || ''} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usernameInput">Nombre de Usuario</Label>
                <div className="flex gap-2">
                  <Input 
                    id="usernameInput"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Tu alias" 
                  />
                  <Button onClick={handleUpdateProfile} disabled={loading}>
                    {loading ? "..." : "Guardar"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground mb-4">
              <Globe className="h-4 w-4" />
              Preferencias del Sistema
            </h3>
            <div className="grid gap-2">
              <Label>Idioma de la Interfaz</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español (Predeterminado)</SelectItem>
                  <SelectItem value="en">English (Inglés)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Cambia el idioma general de las preferencias de tu sesión.</p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
