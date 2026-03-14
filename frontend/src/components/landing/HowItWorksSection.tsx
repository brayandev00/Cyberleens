import { Search, Zap, FileText, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    { icon: Search, title: 'Enter Domain', step: '01' },
    { icon: Zap, title: 'Auto Scan', step: '02' },
    { icon: FileText, title: 'Analyze', step: '03' },
    { icon: CheckCircle, title: 'Export', step: '04' }
  ];
  return (
    <section id="how-it-works" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative p-8 bg-background rounded-xl border hover:border-primary transition-all group">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold group-hover:scale-110 transition-transform">{s.step}</div>
              <s.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
