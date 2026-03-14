import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Database, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

interface DatabaseStatusCardProps { isLoading: boolean; isError: boolean; }
const DatabaseStatusCard = ({ isLoading, isError }: DatabaseStatusCardProps) => {
  return (
    <Card className="bg-emerald-500/5 border-none shadow-lg">
      <CardHeader><CardTitle className="flex items-center gap-2"><Database />Database Status</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
          <span>Status</span>
          <Badge className={isError ? "bg-red-500" : "bg-green-500"}>
            {isLoading ? <Loader2 className="animate-spin" /> : (isError ? "Error" : "Connected")}
          </Badge>
        </div>
        {isError && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Connection Error</AlertTitle><AlertDescription>Failed to connect to Supabase.</AlertDescription></Alert>}
      </CardContent>
    </Card>
  );
};
export default DatabaseStatusCard;
