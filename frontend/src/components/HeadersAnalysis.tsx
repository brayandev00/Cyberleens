import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import CORSBypassIndicator from './CORSBypassIndicator';
import ModuleCardWrapper from './ModuleCardWrapper';

const HeadersAnalysis = ({ headersAnalysis, isTested, moduleError }: any) => {
  if (!isTested) return null;
  const analysis = headersAnalysis || { headers: {}, securityHeaders: { present: [], missing: [], score: 0, grade: 'N/A' } };
  return (
    <ModuleCardWrapper title="HTTP Headers" icon={Shield} moduleError={moduleError} hasData={!!headersAnalysis} headerActions={<CORSBypassIndicator metadata={analysis.corsMetadata} />}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-muted p-3 px-4 rounded-lg"><span>Code</span><p className="font-bold text-xl">{analysis.statusCode}</p></div>
        <div className="bg-muted p-3 px-4 rounded-lg"><span>Grade</span><p className="font-bold text-xl">{analysis.securityHeaders.grade}</p></div>
        <div className="bg-muted p-3 px-4 rounded-lg"><span>Score</span><p className="font-bold text-xl">{analysis.securityHeaders.score}</p></div>
      </div>
      <div className="space-y-2">
        {analysis.securityHeaders.present.map((h: any, i: number) => (
          <div key={i} className="p-2 bg-green-500/5 border-l-4 border-green-500 rounded text-sm"><span className="font-bold">{h.name}</span>: <span className="font-mono text-xs">{h.value}</span></div>
        ))}
        {analysis.securityHeaders.missing.map((h: any, i: number) => (
          <div key={i} className="p-2 bg-red-500/5 border-l-4 border-red-500 rounded text-sm"><span className="font-bold text-red-500">Missing: {h.name}</span></div>
        ))}
      </div>
    </ModuleCardWrapper>
  );
};
export default HeadersAnalysis;
