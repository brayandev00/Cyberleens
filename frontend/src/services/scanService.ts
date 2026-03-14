import { supabase } from '@/integrations/supabase/client';

export interface ScanConfig {
  target: string;
  siteInfo: boolean;
  headers: boolean;
  whois: boolean;
  geoip: boolean;
  dns: boolean;
  mx: boolean;
  subnet: boolean;
  ports: boolean;
  subdomains: boolean;
  reverseip: boolean;
  sqlinjection: boolean;
  xss: boolean;
  lfi: boolean;
  wordpress: boolean;
  seo: boolean;
  ddosFirewall: boolean;
  virustotal: boolean;
  sslTls: boolean;
  techStack: boolean;
  brokenLinks: boolean;
  corsMisconfig: boolean;
  xssPayloads: number;
  sqliPayloads: number;
  lfiPayloads: number;
  ddosRequests: number;
  useProxy: boolean;
  threads: number;
  smartScanEnabled: boolean;
}

export interface Scan {
  id: string;
  user_id: string;
  target: string;
  timestamp: number;
  status: 'running' | 'completed' | 'failed' | 'paused' | 'stopped';
  progress?: {
    current: number;
    total: number;
    stage: string;
  };
  config: ScanConfig;
  results: any;
  errors: string[];
  elapsedMs?: number;
  completedAt?: number;
  securityGrade?: number;
  smartScanLevel: number;
}

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token || ''}`
  };
};

export const getScanHistory = async (): Promise<Scan[]> => {
  try {
    const res = await fetch('/api/scans', { headers: await getAuthHeaders() });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    return data.history || [];
  } catch (error) {
    console.error('Failed to get scan history from backend', error);
    return [];
  }
};

export const getScanById = async (id: string): Promise<Scan | undefined> => {
  try {
    const res = await fetch(`/api/scans/${id}`, { headers: await getAuthHeaders() });
    if (res.status === 404) return undefined;
    const data = await res.json();
    return data.scan;
  } catch (error) {
    console.error(`Failed to fetch scan by id: ${id}`, error);
    return undefined;
  }
};

export const startScan = async (config: ScanConfig): Promise<string> => {
  const res = await fetch('/api/scans', {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(config)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.scanId;
};

export const pauseScan = async (id: string) => {
  const res = await fetch(`/api/scans/${id}/pause`, { 
    method: 'POST',
    headers: await getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
};

export const resumeScan = async (id: string) => {
  const res = await fetch(`/api/scans/${id}/resume`, { 
    method: 'POST',
    headers: await getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
};

export const stopScan = async (id: string) => {
  const res = await fetch(`/api/scans/${id}/stop`, { 
    method: 'POST',
    headers: await getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
};

export const deleteScan = async (id: string): Promise<void> => {
  const res = await fetch(`/api/scans/${id}`, { 
    method: 'DELETE',
    headers: await getAuthHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
};

export const cleanupStuckScans = async (): Promise<void> => {
  try {
    await fetch('/api/scans/cleanup', { 
      method: 'POST',
      headers: await getAuthHeaders()
    });
  } catch (error) {
    console.error('Failed to cleanup stuck scans', error);
  }
};

export const getRunningScanCount = (): number => {
  return 0; // Simplified
};
