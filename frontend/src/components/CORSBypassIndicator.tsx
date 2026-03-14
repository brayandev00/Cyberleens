import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, AlertCircle } from 'lucide-react';
import { CORSBypassMetadata } from '@/services/corsProxy';

const CORSBypassIndicator = ({ metadata }: { metadata?: CORSBypassMetadata }) => {
  if (!metadata) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={metadata.usedProxy ? "text-yellow-500 border-yellow-500" : "text-green-500 border-green-500"}>
            {metadata.usedProxy ? <><AlertCircle className="h-3 w-3 mr-1" />Proxy Used</> : <><Shield className="h-3 w-3 mr-1" />Direct</>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent><p>{metadata.usedProxy ? "Request routed via proxy" : "Direct connection established"}</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default CORSBypassIndicator;
