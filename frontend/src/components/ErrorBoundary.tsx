import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };
  public static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error(error, errorInfo); }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <Card className="max-w-lg w-full border-destructive">
            <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle />Error</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p>Something went wrong.</p>
              <Button onClick={() => window.location.reload()} className="w-full">Refresh</Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
