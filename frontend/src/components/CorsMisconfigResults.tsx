import { Bug, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const CorsMisconfigResults = ({ corsMisconfig, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="CORS Misconfig" icon={Bug} moduleError={moduleError} hasData={!!corsMisconfig?.vulnerable} headerActions={<CORSBypassIndicator metadata={corsMisconfig?.corsMetadata} />}>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg"><span>Status</span><Badge variant={corsMisconfig?.vulnerable ? "destructive" : "secondary"}>{corsMisconfig?.vulnerable ? "VULNERABLE" : "SECURE"}</Badge></div>
        <div className="p-3 bg-muted rounded-lg"><span>Findings</span><p className="font-bold">{corsMisconfig?.vulnerabilities?.length || 0}</p></div>
      </div>
    </ModuleCardWrapper>
  );
};
export default CorsMisconfigResults;
