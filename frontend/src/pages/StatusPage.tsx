import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Activity, Shield, Zap } from 'lucide-react';
import { getCachedAppStatus } from '@/services/statusService';

const StatusPage = () => {
  const { data: status, isLoading } = useQuery({ queryKey: ['appStatus'], queryFn: getCachedAppStatus });
  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading Status...</div>;
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <Shield className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="text-4xl font-bold">System Status</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full">
            <div className={`w-3 h-3 rounded-full ${status.overall === 'operational' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="font-bold">Global: {status.overall.toUpperCase()}</span>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle className="text-sm uppercase text-slate-500">Uptime</CardTitle><p className="text-3xl font-bold">{status.metrics.uptime}%</p></CardHeader></Card>
          <Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle className="text-sm uppercase text-slate-500">Total Scans</CardTitle><p className="text-3xl font-bold">{status.metrics.totalScans}</p></CardHeader></Card>
          <Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle className="text-sm uppercase text-slate-500">Error Rate</CardTitle><p className="text-3xl font-bold">{status.metrics.errorRate}%</p></CardHeader></Card>
        </div>
        <div className="grid gap-4">
          {status.services.map((s: any, i: number) => (
            <Card key={i} className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6 flex items-center justify-between">
                <div><h3 className="font-bold">{s.name}</h3><p className="text-sm text-slate-500">{s.details}</p></div>
                <Badge variant={s.status === 'operational' ? 'default' : 'destructive'} className={s.status === 'operational' ? 'bg-emerald-500' : 'bg-red-500'}>{s.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StatusPage;
