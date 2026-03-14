import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { getStatus } from '@/services/statusService';

interface StatusIndicatorProps { showText?: boolean; size?: 'sm' | 'md' | 'lg'; className?: string; }
const StatusIndicator: React.FC<StatusIndicatorProps> = ({ showText = true, size = 'sm', className = '' }) => {
  const { data: status, isLoading } = useQuery({
    queryKey: ['appStatus'],
    queryFn: getStatus,
    refetchInterval: 60000,
  });
  if (isLoading) return <Badge variant="secondary" className={className}><Loader2 className="h-3 w-3 mr-1 animate-spin" />{showText && 'Checking...'}</Badge>;
  const overall = status?.overall || 'unknown';
  return (
    <Badge className={className}>
      {overall === 'operational' ? <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" /> : <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />}
      {showText && (overall === 'operational' ? 'Operational' : 'Issues Detected')}
    </Badge>
  );
};
export default StatusIndicator;
