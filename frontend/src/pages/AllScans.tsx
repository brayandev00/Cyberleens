import { useQuery } from '@tanstack/react-query';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { History, Bug, AlertTriangle, Search, Filter, Trash2, Loader2 } from 'lucide-react';
import RecentScans from '@/components/RecentScans';
import { getScanHistory, deleteAllScans } from '@/services/scanService';
import ScanOverviewCards from '@/components/ScanOverviewCards';
import VulnerabilitySummaryCard from '@/components/VulnerabilitySummaryCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

const AllScans = () => {
  const [filterTarget, setFilterTarget] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const { data: scans = [], refetch } = useQuery({
    queryKey: ['scanHistory'],
    queryFn: getScanHistory,
    refetchInterval: 3000,
  });

  const filteredScans = useMemo(() => {
    return scans.filter(scan => {
      const matchesTarget = scan.target.toLowerCase().includes(filterTarget.toLowerCase());
      const matchesStatus = filterStatus === 'all' || scan.status === filterStatus;
      return matchesTarget && matchesStatus;
    });
  }, [scans, filterTarget, filterStatus]);

  const handleDeleteAllScans = async () => {
    setIsDeleting(true);
    try {
      await deleteAllScans();
      toast({
        title: "Éxito",
        description: "Todo el historial de escaneos ha sido eliminado permanentemente.",
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error al eliminar",
        description: error.message || "Ocurrió un error al eliminar los escaneos.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex flex-col sticky top-0 z-10 gap-4 border-b border-border bg-background/95 backdrop-blur-md px-6 py-4 dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
                <Bug className="h-7 w-7 text-blue-600 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                Historial de Escaneos
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Vista completa de todos tus escaneos de reconocimiento</p>
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                disabled={scans.length === 0 || isDeleting}
                className="flex-shrink-0"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Todo
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> ¿Estás completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Esta acción no se puede deshacer. Eliminará permanentemente los {scans.length} escaneos de tu historial y base de datos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-border text-foreground hover:bg-muted/50">Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAllScans} 
                  disabled={isDeleting}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar Todo'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filtrar por URL objetivo..."
              value={filterTarget}
              onChange={(e) => setFilterTarget(e.target.value)}
              className="pl-9 bg-muted/30 border-border focus:border-primary focus:ring-primary"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px] bg-muted/30 border-border focus:ring-primary">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="running">En ejecución</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
              <SelectItem value="failed">Fallido</SelectItem>
              <SelectItem value="paused">Pausado</SelectItem>
              <SelectItem value="stopped">Detenido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto space-y-8">
          <ScanOverviewCards scans={filteredScans} />
          <VulnerabilitySummaryCard scans={filteredScans} />
          <RecentScans scans={filteredScans} onScanDeleted={refetch} />
        </div>
      </main>
    </div>
  );
};

export default AllScans;
