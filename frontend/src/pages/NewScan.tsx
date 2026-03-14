// Dummy check for NewScan
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Globe, Shield, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const NewScan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return toast.error("Por favor ingresa una URL");
    
    setLoading(true);
    try {
      // Logic for starting scan would go here
      // For now just redirect
      navigate("/scans");
      toast.info("Escaneo iniciado correctamente");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white italic">
          Nueva <span className="text-cyan-500">Auditoría</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Ingresa la URL del objetivo para comenzar el análisis de seguridad profundo.
        </p>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden border-t-2 border-t-cyan-500/50">
        <CardHeader className="pb-4">
          <CardTitle>Configuración del Objetivo</CardTitle>
          <CardDescription>Análisis automatizado de vulnerabilidades y reconocimiento.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStartScan} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
              </div>
              <Input
                placeholder="https://ejemplo.com"
                className="pl-12 h-14 bg-slate-950/50 border-slate-800 text-lg focus-visible:ring-cyan-500/50 focus-visible:ring-offset-0"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Search, label: "Reconocimiento", desc: "Subdominios, Whois, DNS" },
                { icon: Shield, label: "Vulnerabilidades", desc: "SQLi, XSS, LFI, CORS" },
                { icon: Zap, label: "Performance", desc: "SEO, Headers, SSL" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col items-center text-center space-y-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 mb-1">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-slate-200">{item.label}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold bg-cyan-600 hover:bg-cyan-700 shadow-xl shadow-cyan-900/20" disabled={loading}>
              {loading ? "Preparando motor de escaneo..." : "Lanzar Auditoría Completa"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewScan;
