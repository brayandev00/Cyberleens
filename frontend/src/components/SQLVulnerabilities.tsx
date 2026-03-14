import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Code } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const SQLVulnerabilities = ({ sqlinjection, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="SQL Injection" icon={sqlinjection?.vulnerable ? AlertTriangle : Shield} moduleError={moduleError} hasData={!!sqlinjection} headerActions={<CORSBypassIndicator metadata={sqlinjection?.corsMetadata} />}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted p-3 rounded-lg"><span>Status</span><Badge variant={sqlinjection?.vulnerable ? "destructive" : "secondary"}>{sqlinjection?.vulnerable ? "VULNERABLE" : "SECURE"}</Badge></div>
        <div className="bg-muted p-3 rounded-lg"><span>Findings</span><p className="font-bold">{sqlinjection?.vulnerabilities?.length || 0}</p></div>
      </div>
      {sqlinjection?.vulnerabilities?.map((v: any, i: number) => (
        <div key={i} className="p-3 border rounded-lg bg-red-500/5 border-red-500/20 mb-2">
          <Badge className="mb-2" variant="destructive">{v.severity.toUpperCase()}</Badge>
          <p className="font-mono text-xs break-all">Payload: {v.payload}</p>
          <p className="text-xs text-muted-foreground mt-1">Indicator: {v.indicator}</p>
        </div>
      ))}
    </ModuleCardWrapper>
  );
};
export default SQLVulnerabilities;
