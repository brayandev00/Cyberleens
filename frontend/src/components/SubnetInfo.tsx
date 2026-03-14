import { Network } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const SubnetInfo = ({ subnet, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Subnet Calc" icon={Network} moduleError={moduleError} hasData={!!subnet}>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2 bg-muted rounded"><span>IP/CIDR</span><p className="font-mono">{subnet?.ip}/{subnet?.cidr}</p></div>
        <div className="p-2 bg-muted rounded"><span>Mask</span><p className="font-mono">{subnet?.subnetMask}</p></div>
        <div className="p-2 bg-muted rounded"><span>Network</span><p className="font-mono">{subnet?.networkAddress}</p></div>
        <div className="p-2 bg-muted rounded"><span>Hosts</span><p className="font-mono">{subnet?.usableHosts}</p></div>
      </div>
    </ModuleCardWrapper>
  );
};
export default SubnetInfo;
