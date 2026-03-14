import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Settings, History, FileText } from 'lucide-react';
import AppHeader from './AppHeader';

const ScanHeader = ({ isScanning, selectedModules = 0, totalModules = 0 }: any) => {
  const navigate = useNavigate();
  return (
    <AppHeader title="New Scan" subtitle="Intelligent security reconnaissance">
      <div className="flex gap-2">
        <div className="px-3 py-1 bg-muted rounded-md text-sm font-medium border flex items-center gap-2">
          <Settings size={14} className="text-muted-foreground" /> {selectedModules}/{totalModules} modules
        </div>
        <Button disabled={isScanning || selectedModules === 0} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <Zap size={16} className="mr-2" /> {isScanning ? "Scanning..." : "Start Scan"}
        </Button>
        <Button variant="outline" size="icon" onClick={() => navigate('/history')}><History size={16} /></Button>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}><FileText size={16} className="mr-2" /> Dashboard</Button>
      </div>
    </AppHeader>
  );
};
export default ScanHeader;
