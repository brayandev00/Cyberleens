import { Badge } from '@/components/ui/badge';
import { Mail, Shield } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const MXInfo = ({ mx, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Mail Servers" icon={Mail} moduleError={moduleError} hasData={!!mx}>
      <div className="space-y-4">
        {mx?.mxRecords?.map((r: any, i: number) => (
          <div key={i} className="p-3 bg-muted rounded-lg flex justify-between">
            <span className="font-mono text-xs break-all">{r.exchange}</span>
            <Badge variant="outline">Prio: {r.priority}</Badge>
          </div>
        ))}
        {mx?.spfRecord && <div className="p-3 bg-muted/50 rounded-lg text-xs break-all font-mono">SPF: {mx.spfRecord}</div>}
        {mx?.dmarcRecord && <div className="p-3 bg-muted/50 rounded-lg text-xs break-all font-mono">DMARC: {mx.dmarcRecord}</div>}
      </div>
    </ModuleCardWrapper>
  );
};
export default MXInfo;
