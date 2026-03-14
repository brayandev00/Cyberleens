import { Lock, Calendar, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ModuleCardWrapper from './ModuleCardWrapper';

const SslTlsResults = ({ sslTls, isTested, moduleError }: any) => {
  if (!isTested) return null;
  return (
    <ModuleCardWrapper title="SSL/TLS" icon={Lock} moduleError={moduleError} hasData={!!sslTls?.tested}>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm font-medium"><span>{sslTls?.daysUntilExpiry} days left</span><Badge variant={sslTls?.isExpired ? "destructive" : "default"}>{sslTls?.isExpired ? "Expired" : "Valid"}</Badge></div>
        <div className="text-xs text-muted-foreground p-2 bg-muted rounded"><p>Issuer: {sslTls?.certificateIssuer}</p><p className="truncate">Subject: {sslTls?.certificateSubject}</p></div>
      </div>
    </ModuleCardWrapper>
  );
};
export default SslTlsResults;
