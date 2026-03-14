import { Network, Bug } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';

const PortScanResults = ({ ports, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Port Scan" icon={Network} moduleError={moduleError} hasData={!!ports?.length}>
      <div className="space-y-2">
        {ports?.map((p: any, i: number) => (
          <div key={i} className="p-3 bg-muted rounded-lg flex justify-between items-center group">
            <div className="flex items-center gap-3">
              <span className="font-bold text-primary">{p.port}</span>
              <span className="text-xs text-muted-foreground">{p.service}</span>
            </div>
            <Badge className={p.status === 'open' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}>{p.status}</Badge>
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default PortScanResults;
