import { Link as LinkIcon, XCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const BrokenLinkResults = ({ brokenLinks, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Broken Links" icon={LinkIcon} moduleError={moduleError} hasData={!!brokenLinks?.totalLinksChecked} headerActions={<CORSBypassIndicator metadata={brokenLinks?.corsMetadata} />}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-muted rounded-lg"><span>Checked</span><p className="font-bold">{brokenLinks?.totalLinksChecked}</p></div>
        <div className="p-3 bg-muted rounded-lg"><span>Broken</span><p className="font-bold text-red-500">{brokenLinks?.brokenLinks?.length || 0}</p></div>
      </div>
      {brokenLinks?.brokenLinks?.slice(0, 3).map((l: any, i: number) => (
        <div key={i} className="text-[10px] font-mono p-1 bg-red-500/5 text-red-500 truncate">{l.url}</div>
      ))}
    </ModuleCardWrapper>
  );
};
export default BrokenLinkResults;
