import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, ShieldAlert, Bug, Star, Clock } from 'lucide-react';

const ScanSummaryWidget = ({ scan, securityGrade }: any) => {
  const subdomains = scan.results.subdomains?.subdomains.length || 0;
  const ports = scan.results.ports?.filter((p: any) => p.status === 'open').length || 0;
  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-orange-500" /> Summary</CardTitle>
        {securityGrade != null && <div className="flex items-center gap-2 text-2xl font-bold text-primary"><Star /> {securityGrade.toFixed(1)}</div>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center"><Network className="mx-auto mb-1 text-primary" /><p className="text-xs text-muted-foreground">Subdomains</p><p className="text-xl font-bold">{subdomains}</p></div>
          <div className="p-4 bg-muted rounded-lg text-center"><Network className="mx-auto mb-1 text-primary" /><p className="text-xs text-muted-foreground">Open Ports</p><p className="text-xl font-bold">{ports}</p></div>
        </div>
        {scan.completedAt && <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1"><Clock size={10} /> {new Date(scan.completedAt).toLocaleString()}</p>}
      </CardContent>
    </Card>
  );
};
export default ScanSummaryWidget;
