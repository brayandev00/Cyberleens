import React, { useState, useEffect } from 'react';
import { X, Rocket, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const LaunchAnnouncementPopup = ({ shouldShow = false }: { shouldShow?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (shouldShow && !localStorage.getItem('announcement-seen')) {
      setTimeout(() => setIsOpen(true), 2000);
    }
  }, [shouldShow]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('announcement-seen', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white text-center">
          <Rocket className="mx-auto mb-4 h-12 w-12" />
          <h2 className="text-2xl font-bold">NetProbe is Live!</h2>
          <p className="opacity-90">Advanced Network Reconnaissance is here.</p>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">Discover what's hidden with our new open-source tool. Advanced port scanning, service detection, and more.</p>
          <Button onClick={() => window.open('https://github.com/zanesense/netprobe', '_blank')} className="w-full bg-primary"><Github className="mr-2 h-4 w-4" /> View on GitHub</Button>
          <Button variant="ghost" onClick={handleClose} className="w-full">Dismiss</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LaunchAnnouncementPopup;
