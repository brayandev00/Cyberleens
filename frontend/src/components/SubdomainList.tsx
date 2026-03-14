import { Network, ExternalLink } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const SubdomainList = ({ subdomains, isTested, moduleError }: any) => {
  if (!isTested) return null;
  const list = subdomains?.subdomains || [];
  return (
    <ModuleCardWrapper title="Subdomains" icon={Network} moduleError={moduleError} hasData={list.length > 0}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {list.map((s: string, i: number) => (
          <div key={i} className="p-2 bg-muted rounded-lg flex justify-between items-center group">
            <span className="text-xs font-mono truncate">{s}</span>
            <ExternalLink size={12} className="group-hover:text-primary transition-colors cursor-pointer" />
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default SubdomainList;
