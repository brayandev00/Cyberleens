import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const DNSInfo = ({ dns, isTested, moduleError }: any) => {
  if (!isTested) return null;
  const types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA'];
  const hasData = !!dns && types.some(t => dns.records[t]?.length > 0);
  return (
    <ModuleCardWrapper title="DNS Records" icon={Network} moduleError={moduleError} hasData={hasData}>
      <div className="space-y-4">
        {types.map(t => {
          const res = dns?.records[t];
          if (!res?.length) return null;
          return (
            <div key={t} className="p-3 bg-muted rounded-lg">
              <Badge className="mb-2">{t}</Badge>
              {res.map((r: any, i: number) => <p key={i} className="font-mono text-xs break-all">{r.value}</p>)}
            </div>
          );
        })}
      </div>
    </ModuleCardWrapper>
  );
};
export default DNSInfo;
