import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Star } from 'lucide-react';

const CTASection = () => (
  <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center">
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <Star className="mx-auto h-12 w-12 text-yellow-400 animate-pulse" />
      <h2 className="text-4xl md:text-5xl font-bold">Ready to Uncover Hidden Intelligence?</h2>
      <p className="text-xl opacity-90">Start your first comprehensive web reconnaissance scan today in under 30 seconds.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-slate-50"><Link to="/login"><Zap className="mr-2" /> Start Free Scan Now <ArrowRight className="ml-2" /></Link></Button>
        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">View Demo</Button>
      </div>
    </div>
  </section>
);
export default CTASection;
