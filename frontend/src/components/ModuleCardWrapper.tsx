import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardWrapperProps {
  title: string;
  icon: React.ElementType;
  iconColorClass?: string;
  description?: string;
  isLoading?: boolean;
  moduleError?: string;
  noDataMessage?: string;
  children: React.ReactNode;
  hasData: boolean;
  className?: string;
  headerActions?: React.ReactNode;
}

const ModuleCardWrapper: React.FC<ModuleCardWrapperProps> = ({
  title, icon: Icon, iconColorClass = 'text-blue-600', description, isLoading = false, moduleError, noDataMessage, children, hasData, className, headerActions,
}) => {
  return (
    <Card className={cn("group overflow-hidden bg-background border-border shadow-lg transition-all", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Icon className={cn("h-5 w-5", iconColorClass)} />
            <span>{title}</span>
          </CardTitle>
          {headerActions}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8"><Loader2 className="animate-spin" /></div>
        ) : moduleError ? (
          <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{moduleError}</AlertDescription></Alert>
        ) : !hasData ? (
          <Alert><Info className="h-4 w-4" /><AlertTitle>No data</AlertTitle><AlertDescription>{noDataMessage || 'No information found.'}</AlertDescription></Alert>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};
export default ModuleCardWrapper;
