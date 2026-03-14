import { Globe, Server, Shield, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';
import CORSBypassIndicator from './CORSBypassIndicator';

const SiteInfo = ({ siteInfo, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Site Info" icon={Globe} moduleError={moduleError} hasData={!!siteInfo} headerActions={<CORSBypassIndicator metadata={siteInfo?.corsMetadata} />}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-muted rounded-lg"><span>Title</span><p className="font-bold truncate text-sm">{siteInfo?.title || 'N/A'}</p></div>
        <div className="p-3 bg-muted rounded-lg"><span>Server</span><p className="font-bold truncate text-sm">{siteInfo?.webServer || 'N/A'}</p></div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2"><Shield size={14} className={siteInfo?.cloudflare ? "text-green-500" : "text-muted-foreground"} /> Cloudflare</div>
        <div className="flex items-center gap-2"><Clock size={14} /> {siteInfo?.responseTime}ms</div>
      </div>
    </ModuleCardWrapper>
  );
};
export default SiteInfo;
