import { MapPin, Globe, Clock, Building2, DollarSign } from 'lucide-react';
import ModuleCardWrapper from './ModuleCardWrapper';

const GeoIPInfo = ({ geoip, isTested, moduleError }: any) => {
  if (!isTested) return null;
  const fields = [
    { label: 'IP Address', value: geoip?.ip, icon: Globe },
    { label: 'Country', value: geoip?.country, icon: Globe },
    { label: 'City', value: geoip?.city, icon: MapPin },
    { label: 'ISP', value: geoip?.isp || geoip?.org, icon: Building2 },
    { label: 'ASN', value: geoip?.asn, icon: Globe },
    { label: 'Timezone', value: geoip?.timezone, icon: Clock },
  ].filter(f => !!f.value);
  return (
    <ModuleCardWrapper title="GeoIP" icon={MapPin} moduleError={moduleError} hasData={!!geoip}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f, i) => (
          <div key={i} className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">{f.label}</p>
            <p className="font-mono text-sm break-all">{f.value}</p>
          </div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default GeoIPInfo;
