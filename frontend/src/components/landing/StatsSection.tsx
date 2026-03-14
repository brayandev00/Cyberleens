import { Users, Globe, Shield, Zap } from 'lucide-react';

const StatsSection = () => (
  <section className="py-24 bg-muted/30">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { icon: Users, val: '1.2K+', label: 'Active Users' },
          { icon: Globe, val: '28K+', label: 'Scans Done' },
          { icon: Shield, val: '4.5K+', label: 'Vulns Found' },
          { icon: Zap, val: '99.9%', label: 'Uptime' }
        ].map((s, i) => (
          <div key={i} className="space-y-2">
            <s.icon className="h-8 w-8 text-primary mx-auto opacity-50" />
            <div className="text-3xl font-bold text-foreground">{s.val}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default StatsSection;
