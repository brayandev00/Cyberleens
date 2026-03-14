import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { username } });
      if (error) throw error;
      toast({ title: "Perfil Actualizado", description: "Tus datos fueron guardados." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally { setLoading(false); }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Settings size={20} /> Configuración</CardTitle>
        <CardDescription>Gestiona tu perfil y preferencias</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground"><User size={16} /> Perfil</h3>
            <Label>Email</Input><Input value={userData?.email || ''} readOnly className="bg-muted" />
            <Label>Username</Label>
            <div className="flex gap-2"><Input value={username} onChange={e => setUsername(e.target.value)} /><Button onClick={handleUpdateProfile} disabled={loading}>Guardar</Button></div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground"><Globe size={16} /> Preferencias</h3>
            <Label>Idioma</Label>
            <Select value={language} onValueChange={v => { setLanguage(v); localStorage.setItem('app-language', v); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="es">Español</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
