import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Code } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const XSSVulnerabilities = ({ xss, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="XSS Scan" icon={xss?.vulnerable ? AlertTriangle : Shield} moduleError={moduleError} hasData={!!xss}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted p-3 rounded-lg"><span>Status</span><Badge variant={xss?.vulnerable ? "destructive" : "secondary"}>{xss?.vulnerable ? "VULNERABLE" : "SECURE"}</Badge></div>
        <div className="bg-muted p-3 rounded-lg"><span>Payloads</span><p className="font-bold">{xss?.testedPayloads}</p></div>
      </div>
      {xss?.vulnerabilities?.map((v: any, i: number) => (
        <div key={i} className="p-3 border rounded-lg bg-red-500/5 border-red-500/20 mb-2">
          <Badge className="mb-2">{v.severity.toUpperCase()}</Badge>
          <p className="text-xs">Location: {v.location}</p>
          <p className="font-mono text-xs break-all mt-1">Payload: {v.payload}</p>
        </div>
      ))}
    </ModuleCardWrapper>
  );
};
export default XSSVulnerabilities;
