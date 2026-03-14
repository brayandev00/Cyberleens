import { TrendingUp, Image, Link as LinkIcon } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const SEOInfo = ({ seo, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="SEO Analysis" icon={TrendingUp} moduleError={moduleError} hasData={!!seo}>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2 bg-muted rounded text-center"><span>Score</span><p className="font-bold text-lg">{seo?.httpCode}</p></div>
        <div className="p-2 bg-muted rounded text-center"><span>Links</span><p className="font-bold text-lg">{seo?.linkCount?.total}</p></div>
        <div className="p-2 bg-muted rounded text-center"><span>Images</span><p className="font-bold text-lg">{seo?.imageCount}</p></div>
      </div>
      <div className="p-2 bg-muted/50 rounded text-xs italic truncate">{seo?.title}</div>
    </ModuleCardWrapper>
  );
};
export default SEOInfo;
