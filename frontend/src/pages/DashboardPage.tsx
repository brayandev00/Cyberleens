import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, LayoutDashboard, History, FileText, Settings, Shield } from 'lucide-react';
import { RecentScans } from '@/components/RecentScans';
import { ScanOverviewCards } from '@/components/ScanOverviewCards';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Bienvenido, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-slate-400">Resumen del estado de seguridad de tus proyectos.</p>
        </div>
        <Button 
          onClick={() => navigate('/new-scan')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-lg shadow-cyan-900/20"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Escaneo
        </Button>
      </div>

      <ScanOverviewCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <History className="h-5 w-5 text-cyan-500" /> Escaneos Recientes
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/scans')} className="text-cyan-500 hover:text-cyan-400 underline-offset-4 hover:underline">
              Ver todos
            </Button>
          </div>
          <RecentScans />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-500" /> Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Plus, label: 'Lanzar escaneo rápido', path: '/new-scan', color: 'text-emerald-500' },
              { icon: FileText, label: 'Generar reporte PDF', path: '/reports', color: 'text-rose-500' },
              { icon: Settings, label: 'Configurar Webhooks', path: '/settings', color: 'text-amber-500' },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all text-left group"
              >
                <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
