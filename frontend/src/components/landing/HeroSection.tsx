import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap, Shield, Eye } from 'lucide-react';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
    <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        <span className="block text-foreground">Discover Hidden</span>
        <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Web Intelligence</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Uncover comprehensive insights about any website with our advanced reconnaissance platform. Subdomains, tech stacks, and vulnerabilities in minutes.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:scale-105 transition-all shadow-lg shadow-blue-500/20"><Link to="/login">Start Free Scan <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
        <Button size="lg" variant="outline" className="px-8 border-2 hover:bg-muted/50"><Play className="mr-2 h-5 w-5" /> Watch Demo</Button>
      </div>
    </div>
  </section>
);
export default HeroSection;
