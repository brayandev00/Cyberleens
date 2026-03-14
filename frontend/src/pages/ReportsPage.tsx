import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getScanHistory } from '@/services/scanService';
import { generatePdfReport } from '@/services/reportService';

const Reports = () => {
  const { data: scans = [] } = useQuery({ queryKey: ['scanHistory'], queryFn: getScanHistory });
  const completedScans = scans.filter(s => s.status === 'completed');
  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center sticky top-0 bg-background/95 backdrop-blur px-6 py-4 border-b">
        <SidebarTrigger className="mr-4" /><h1 className="text-2xl font-bold">Reports</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {completedScans.map(scan => (
            <Card key={scan.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div><CardTitle>{scan.target}</CardTitle><CardDescription>{new Date(scan.timestamp).toLocaleString()}</CardDescription></div>
                <Button onClick={() => generatePdfReport(scan)} className="bg-cyan-600 hover:bg-cyan-700"><Download className="mr-2" /> Download PDF</Button>
              </CardHeader>
            </Card>
          ))}
          {completedScans.length === 0 && <div className="text-center py-20 text-muted-foreground"><FileText className="mx-auto h-12 w-12 mb-4 opacity-20" /> No reports available.</div>}
        </div>
      </main>
    </div>
  );
};
export default Reports;
