import { Badge } from '@/components/ui/badge';
import { Globe, AlertTriangle } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const WordPressInfo = ({ wordpress, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="WordPress" icon={Globe} moduleError={moduleError} hasData={!!wordpress?.isWordPress} headerActions={<CORSBypassIndicator metadata={wordpress?.corsMetadata} />}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted rounded-lg"><span>Version</span><p className="font-bold">{wordpress?.version || 'Unknown'}</p></div>
          <div className="p-3 bg-muted rounded-lg"><span>Vulns</span><p className="font-bold text-red-500">{wordpress?.vulnerabilities?.length || 0}</p></div>
        </div>
        {wordpress?.vulnerabilities?.map((v: any, i: number) => (
          <div key={i} className="p-2 border border-red-500/20 bg-red-500/5 rounded text-xs">
            <Badge variant="destructive" className="mb-1 text-[10px]">{v.severity.toUpperCase()}</Badge>
            <p className="font-semibold">{v.title}</p>
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default WordPressInfo;
