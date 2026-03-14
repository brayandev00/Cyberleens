import { Badge } from "@/components/ui/badge";
import { FileWarning, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const LFIVulnerabilities = ({ lfi, isTested, moduleError, configLfiPayloads }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="LFI Scan" icon={FileWarning} moduleError={moduleError} hasData={!!lfi} headerActions={<CORSBypassIndicator metadata={lfi?.corsMetadata} />}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted p-3 rounded-lg"><span>Status</span><Badge variant={lfi?.vulnerable ? "destructive" : "secondary"}>{lfi?.vulnerable ? "VULNERABLE" : "SECURE"}</Badge></div>
        <div className="bg-muted p-3 rounded-lg"><span>Payloads</span><p className="font-bold">{lfi?.testedPayloads} / {configLfiPayloads}</p></div>
      </div>
      {lfi?.vulnerabilities?.map((v: any, i: number) => (
        <div key={i} className="p-3 border rounded-lg bg-red-500/5 border-red-500/20 mb-2">
          <Badge className="mb-2">{v.severity.toUpperCase()}</Badge>
          <p className="font-mono text-xs break-all">Payload: {v.payload}</p>
          <p className="text-xs text-muted-foreground mt-1">Indicator: {v.indicator}</p>
        </div>
      ))}
    </ModuleCardWrapper>
  );
};
export default LFIVulnerabilities;
