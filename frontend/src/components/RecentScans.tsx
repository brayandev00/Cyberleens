import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink, Trash2 } from 'lucide-react';
import { Scan, deleteScan } from '@/services/scanService';
import { useToast } from '@/hooks/use-toast';

interface RecentScansProps { scans: Scan[]; onScanDeleted?: () => void; }
const RecentScans = ({ scans, onScanDeleted }: RecentScansProps) => {
  const { toast } = useToast();
  const handleDelete = async (id: string) => {
    try {
      await deleteScan(id);
      toast({ title: "Deleted", description: "Scan deleted successfully" });
      onScanDeleted?.();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };
  return (
    <Card className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-none shadow-lg">
      <CardHeader><CardTitle className="flex items-center gap-2"><Clock />Recent Scans</CardTitle><CardDescription>Latest activities</CardDescription></CardHeader>
      <CardContent className="space-y-4">
        {scans.map(scan => (
          <div key={scan.id} className="flex gap-2 items-center">
            <Link to={`/scan/${scan.id}`} className="flex-1 p-3 bg-muted/50 rounded-lg flex items-center justify-between border border-border">
              <div><span className="font-bold">{scan.target}</span><Badge className="ml-2" variant="secondary">{scan.status}</Badge></div>
              <ExternalLink size={14} />
            </Link>
            <button onClick={() => handleDelete(scan.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
          </div>
        ))}
        {scans.length === 0 && <p className="text-center text-muted-foreground py-8">No scans available</p>}
      </CardContent>
    </Card>
  );
};
export default RecentScans;
