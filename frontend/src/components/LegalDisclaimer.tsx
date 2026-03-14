import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Scale, Shield, AlertTriangle } from 'lucide-react';

const LegalDisclaimer = () => {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  useEffect(() => { if (!localStorage.getItem('cyberleens-legal-agreed')) setOpen(true); }, []);
  const handleAgree = () => { if (agreed) { localStorage.setItem('cyberleens-legal-agreed', 'true'); setOpen(false); } };
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><Scale className="text-red-500" />Legal Disclaimer</DialogTitle><DialogDescription>Authorized use only.</DialogDescription></DialogHeader>
        <div className="space-y-4 py-4 text-sm">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"><p className="font-bold text-red-600">WARNING: You must only scan systems you own or have permission to test.</p></div>
          <p>By using this tool, you accept full responsibility for your actions. The developers are not liable for any misuse or damage caused.</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2"><Checkbox id="agree" checked={agreed} onCheckedChange={(c) => setAgreed(c as boolean)} /><label htmlFor="agree">I agree to these terms</label></div>
          <Button onClick={handleAgree} disabled={!agreed} className="bg-primary text-white">Accept & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default LegalDisclaimer;
