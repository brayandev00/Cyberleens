import { Network, ExternalLink, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';

const ReverseIPInfo = ({ reverseip, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Reverse IP" icon={Network} moduleError={moduleError} hasData={!!reverseip?.domains?.length}>
      <div className="space-y-2">
        {reverseip?.domains?.map((d: any, i: number) => (
          <div key={i} className="p-3 bg-muted rounded-lg border-l-4 border-indigo-500 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs">{d.domain}</span>
              <div className="flex gap-1">{d.cloudflare && <Shield size={12} className="text-orange-500" />}</div>
            </div>
            {d.title && <p className="text-[10px] text-muted-foreground truncate">{d.title}</p>}
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default ReverseIPInfo;
