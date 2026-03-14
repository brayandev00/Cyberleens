import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, CheckCircle, Zap, AlertTriangle, StopCircle } from 'lucide-react';
import { Scan } from '@/services/scanService';

interface ScanOverviewCardsProps { scans: Scan[]; }
const ScanOverviewCards = ({ scans }: ScanOverviewCardsProps) => {
  const stats = {
    total: scans.length,
    completed: scans.filter(s => s.status === 'completed').length,
    active: scans.filter(s => s.status === 'running').length,
    failed: scans.filter(s => s.status === 'failed').length,
    stopped: scans.filter(s => s.status === 'stopped').length,
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="bg-blue-500/5 border-none"><CardHeader className="pb-2"><CardTitle className="text-sm">Total</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
      <Card className="bg-emerald-500/5 border-none"><CardHeader className="pb-2"><CardTitle className="text-sm">Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-emerald-500">{stats.completed}</div></CardContent></Card>
      <Card className="bg-amber-500/5 border-none"><CardHeader className="pb-2"><CardTitle className="text-sm">Active</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-amber-500">{stats.active}</div></CardContent></Card>
      <Card className="bg-rose-500/5 border-none"><CardHeader className="pb-2"><CardTitle className="text-sm">Failed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-rose-500">{stats.failed}</div></CardContent></Card>
      <Card className="bg-orange-500/5 border-none"><CardHeader className="pb-2"><CardTitle className="text-sm">Stopped</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-orange-500">{stats.stopped}</div></CardContent></Card>
    </div>
  );
};
export default ScanOverviewCards;
