import { Badge } from '@/components/ui/badge';
import { Fingerprint } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const TechStackInfo = ({ techStack, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="Tech Stack" icon={Fingerprint} moduleError={moduleError} hasData={!!techStack?.technologies?.length}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {techStack?.technologies?.map((t: any, i: number) => (
          <div key={i} className="p-2 bg-muted rounded-lg flex justify-between items-center">
            <span className="text-xs font-medium">{t.name}</span>
            <Badge variant="outline" className="text-[10px]">{t.category}</Badge>
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default TechStackInfo;
