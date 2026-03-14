import { Bug, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingFooter = () => (
  <footer className="bg-background border-t py-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2 font-bold text-xl text-primary"><Bug /> CyberLeens</div>
      <div className="flex gap-6">
        <a href="#" className="text-muted-foreground hover:text-primary"><Github /></a>
        <a href="#" className="text-muted-foreground hover:text-primary"><Twitter /></a>
        <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
        <a href="#" className="text-muted-foreground hover:text-primary"><Mail /></a>
      </div>
      <p className="text-sm text-muted-foreground">© 2024 CyberLeens. All rights reserved.</p>
    </div>
  </footer>
);
export default LandingFooter;
