import { Globe, Shield, Search, Activity, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    { icon: Globe, title: 'Subdomain Discovery', desc: 'Uncover hidden subdomains with 15+ data sources.' },
    { icon: Shield, title: 'Security Analysis', desc: 'Comprehensive scanning for SQLi, XSS, and more.' },
    { icon: Search, title: 'Tech Stack Detection', desc: 'Identify frameworks and servers powering any site.' },
    { icon: Activity, title: 'Port Scanning', desc: 'Detect running services and potential vectors.' },
    { icon: FileText, title: 'Detailed Reports', desc: 'Generate professional security reports in seconds.' },
    { icon: Zap, title: 'Smart Scanning', desc: 'AI-powered payload adjustment for reliable results.' }
  ];
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-16">Powerful Features for <span className="text-primary">Complete Recon</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Card key={i} className="bg-muted/50 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader><f.icon className="h-10 w-10 text-primary mb-2 mx-auto" /><CardTitle>{f.title}</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground text-sm">{f.desc}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
