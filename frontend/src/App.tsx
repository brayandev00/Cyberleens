import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import StatusPage from "@/pages/StatusPage";
import NewScan from "@/pages/NewScan";
import ScanResults from "@/pages/ScanResults";
import AppSettings from "@/pages/AppSettings";
import AllScans from "@/pages/AllScans";
import DashboardPage from "@/pages/DashboardPage";
import ReportsPage from "@/pages/ReportsPage";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect } from "react";
import { cleanupStuckScans, getRunningScanCount } from "@/services/scanService";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    cleanupStuckScans();
    const handleBefore = (e: any) => {
      if (getRunningScanCount() > 0) {
        e.returnValue = "Scan in progress. Exit?";
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBefore);
    return () => window.removeEventListener('beforeunload', handleBefore);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NotificationProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Toaster /><Sonner />
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/status" element={<StatusPage />} />
                  <Route path="/app" element={<Index />} />
                  <Route path="*" element={
                    <ProtectedRoute>
                      <LegalDisclaimer />
                      <SidebarProvider>
                        <div className="flex min-h-screen w-full bg-background dark:bg-slate-950">
                          <AppSidebar />
                          <SidebarInset className="flex-1 flex flex-col">
                            <div className="flex-1">
                              <Routes>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/new-scan" element={<NewScan />} />
                                <Route path="/all-scans" element={<AllScans />} />
                                <Route path="/reports" element={<ReportsPage />} />
                                <Route path="/scan/:id" element={<ScanResults />} />
                                <Route path="/settings" element={<AppSettings />} />
                                <Route path="*" element={<DashboardPage />} />
                              </Routes>
                            </div>
                            <Footer />
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </NotificationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
export default App;
