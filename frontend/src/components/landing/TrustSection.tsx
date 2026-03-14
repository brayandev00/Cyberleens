import { Shield, Server, Eye, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrustSection = () => (
  <section id="security" className="py-24 bg-background">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-16">Built for <span className="text-emerald-500">Enterprise Trust</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 compliant and fully encrypted.' },
          { icon: Server, title: 'Infrastructure', desc: '99.9% uptime SLA with global CDN.' },
          { icon: Eye, title: 'Privacy First', desc: 'We never store your sensitive data.' }
        ].map((t, i) => (
          <div key={i} className="p-8 bg-muted/30 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
            <t.icon className="h-12 w-12 text-emerald-500 mx-auto mb-6" />
            <h3 className="font-bold text-xl mb-4">{t.title}</h3>
            <p className="text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'CCPA Compliant'].map((c, i) => (
          <Badge key={i} variant="secondary" className="px-4 py-2"><CheckCircle className="mr-2 h-4 w-4" /> {c}</Badge>
        ))}
      </div>
    </div>
  </section>
);
export default TrustSection;
