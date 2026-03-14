import { ShieldAlert, Link, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';

const VirusTotalResults = ({ virustotal, isTested, moduleError }: any) => {
  if (!isTested) return null;
  const isMal = (virustotal?.maliciousVotes || 0) > 0;
  return (
    <ModuleCardWrapper title="VirusTotal" icon={ShieldAlert} moduleError={moduleError} hasData={!!virustotal?.tested}>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg"><span>Reputation</span><Badge variant={isMal ? "destructive" : "secondary"}>{virustotal?.reputation || 0}</Badge></div>
        <div className="p-3 bg-muted rounded-lg"><span>Votes</span><p className="text-xs"><span className="text-red-500">{virustotal?.maliciousVotes || 0}</span> / <span className="text-green-500">{virustotal?.harmlessVotes || 0}</span></p></div>
      </div>
    </ModuleCardWrapper>
  );
};
export default VirusTotalResults;
