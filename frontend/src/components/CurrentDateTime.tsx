import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentDateTimeProps { className?: string; }
const CurrentDateTime: React.FC<CurrentDateTimeProps> = ({ className }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
      <Clock className="h-4 w-4 text-primary" />
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{format(currentDateTime, 'p')}</span>
        <span className="text-xs">{format(currentDateTime, 'PPP')}</span>
      </div>
    </div>
  );
};
export default CurrentDateTime;
