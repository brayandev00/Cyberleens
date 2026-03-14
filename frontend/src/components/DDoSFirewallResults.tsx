import { ShieldCheck, ShieldOff, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const DDoSFirewallResults = ({ ddosFirewall, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="DDoS Firewall" icon={ddosFirewall?.firewallDetected ? ShieldCheck : ShieldOff} moduleError={moduleError} hasData={!!ddosFirewall?.tested} headerActions={<CORSBypassIndicator metadata={ddosFirewall?.corsMetadata} />}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-muted rounded-lg"><span>Detected</span><Badge variant={ddosFirewall?.firewallDetected ? "default" : "secondary"}>{ddosFirewall?.firewallDetected ? "YES" : "NO"}</Badge></div>
        <div className="p-3 bg-muted rounded-lg"><span>Requests</span><p className="font-bold">{ddosFirewall?.totalRequests}</p></div>
      </div>
      {ddosFirewall?.wafDetected && <div className="text-xs p-2 bg-blue-500/10 text-blue-500 rounded">WAF: {ddosFirewall.wafDetected}</div>}
    </ModuleCardWrapper>
  );
};
export default DDoSFirewallResults;
