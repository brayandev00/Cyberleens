import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Key, Settings, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface APIKeyStatusCardProps { configuredKeys: number; totalKeys: number; isLoading: boolean; }
const APIKeyStatusCard = ({ configuredKeys, totalKeys, isLoading }: APIKeyStatusCardProps) => {
  return (
    <Card className="bg-amber-500/5 border-none shadow-lg">
      <CardHeader><CardTitle className="flex items-center gap-2"><Key />API Keys</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
          <span>Configured</span>
          <Badge className={configuredKeys > 0 ? "bg-green-500" : "bg-red-500"}>{isLoading ? "..." : `${configuredKeys}/${totalKeys}`}</Badge>
        </div>
        <Button asChild variant="outline" className="w-full"><Link to="/settings"><Settings className="mr-2 h-4 w-4" />Manage</Link></Button>
      </CardContent>
    </Card>
  );
};
export default APIKeyStatusCard;
