import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle, Loader2, Timer, AlertTriangle, Star } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ScanStatus = ({ scan }: any) => {
  const [elapsed, setElapsed] = useState(scan.elapsedMs || 0);
  useEffect(() => {
    if (scan.status === 'running') {
      const interval = setInterval(() => setElapsed(Date.now() - scan.timestamp), 1000);
      return () => clearInterval(interval);
    }
  }, [scan.status, scan.timestamp]);

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">Scan Details</CardTitle>
        <div className="flex gap-2">
          {scan.securityGrade != null && <Badge variant="outline">Grade: {scan.securityGrade}/10</Badge>}
          <Badge>{scan.status.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="text-muted-foreground">Target</p><p className="font-bold truncate">{scan.target}</p></div>
          <div><p className="text-muted-foreground">Elapsed</p><p className="font-mono">{formatTime(elapsed)}</p></div>
          <div><p className="text-muted-foreground">Payloads</p><p className="font-bold">{scan.progress?.current || 0} / {scan.progress?.total || 0}</p></div>
          <div><p className="text-muted-foreground">Status</p><p className="font-bold">{scan.status}</p></div>
        </div>
        {scan.status === 'running' && <Progress value={((scan.progress?.current || 0) / (scan.progress?.total || 1)) * 100} className="h-2" />}
      </CardContent>
    </Card>
  );
};
export default ScanStatus;
