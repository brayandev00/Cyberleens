import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bug, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const LandingHeader = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary"><Bug /> CyberLeens</Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</Button>
          <Button variant="ghost" asChild><Link to="/login">Sign In</Link></Button>
          <Button asChild className="bg-primary text-primary-foreground"><Link to="/login">Get Started</Link></Button>
        </div>
      </div>
    </header>
  );
};
export default LandingHeader;
