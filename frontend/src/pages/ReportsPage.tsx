import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getScanHistory } from '@/services/scanService';
import { generatePdfReport } from '@/services/reportService';

const Reports = () => {
  const { data: scans = [] } = useQuery({
    queryKey: ['scanHistory'],
    queryFn: getScanHistory,
  });

  const completedScans = scans.filter(s => s.status === 'completed');

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center sticky top-0 z-10 gap-4 border-b border-border bg-background/95 backdrop-blur-md px-6 py-4 dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-2xl">
        <SidebarTrigger className="text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reportes de Escaneos</h1>
          <p className="text-sm text-muted-foreground">Descarga y gestiona los reportes de tus escaneos</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Reportes disponibles: {completedScans.length}</p>
              <p className="text-sm text-muted-foreground">Genera informes PDF completos de cada escaneo terminado</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {completedScans.map((scan) => (
              <Card key={scan.id} className="bg-card border-border transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-foreground">{scan.target}</CardTitle>
                      <CardDescription className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(scan.timestamp).toLocaleString('es-ES')}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => generatePdfReport(scan)}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>ID: {scan.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {scan.config.siteInfo && <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs border border-blue-500/20">Info del Sitio</span>}
                      {scan.config.headers && <span className="px-2 py-1 bg-muted rounded text-xs">Cabeceras</span>}
                      {scan.config.whois && <span className="px-2 py-1 bg-muted rounded text-xs">WHOIS</span>}
                      {scan.config.dns && <span className="px-2 py-1 bg-muted rounded text-xs">DNS</span>}
                      {scan.config.subdomains && <span className="px-2 py-1 bg-muted rounded text-xs">Subdominios</span>}
                      {scan.config.sqlinjection && <span className="px-2 py-1 bg-red-500/10 text-red-600 rounded text-xs border border-red-500/20">SQLi</span>}
                      {scan.config.xss && <span className="px-2 py-1 bg-orange-500/10 text-orange-600 rounded text-xs border border-orange-500/20">XSS</span>}
                      {scan.config.ports && <span className="px-2 py-1 bg-muted rounded text-xs">Puertos</span>}
                    </div>
                  </div>
                  {scan.securityGrade !== undefined && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Calificación de seguridad:</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        scan.securityGrade >= 80 ? 'bg-green-500/20 text-green-600' :
                        scan.securityGrade >= 60 ? 'bg-yellow-500/20 text-yellow-600' :
                        'bg-red-500/20 text-red-600'
                      }`}>{scan.securityGrade}/100</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {completedScans.length === 0 && (
              <Card className="bg-card border-border transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground font-medium">Aún no hay reportes disponibles</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Completa un escaneo para generar reportes descargables</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
