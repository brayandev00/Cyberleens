import { Globe, Calendar, Building2 } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const WhoisInfo = ({ whois, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="WHOIS" icon={Globe} moduleError={moduleError} hasData={!!whois}>
      <div className="space-y-3 text-sm">
        <p><span className="text-muted-foreground mr-2">Registrar:</span> {whois?.registrar || 'N/A'}</p>
        <p><span className="text-muted-foreground mr-2">Created:</span> {whois?.created || 'N/A'}</p>
        <p><span className="text-muted-foreground mr-2">Expires:</span> {whois?.expires || 'N/A'}</p>
        <div className="mt-2 text-xs font-mono p-2 bg-muted rounded max-h-32 overflow-auto break-all whitespace-pre-wrap">{whois?.whoisRaw}</div>
      </div>
    </ModuleCardWrapper>
  );
};
export default WhoisInfo;
