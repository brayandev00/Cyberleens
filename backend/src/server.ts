import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
  startScan, 
  getScanHistory, 
  getScanById, 
  pauseScan, 
  resumeScan, 
  stopScan, 
  deleteScan, 
  deleteAllScans, 
  cleanupStuckScans 
} from './services/scanService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

import { supabase } from './supabaseClient';

// Auth Middleware
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(`[Auth] Header present: ${!!authHeader}`);
  if (!authHeader || Array.isArray(authHeader)) {
    console.log('[Auth] Missing or invalid header');
    return res.status(401).json({ error: 'No authorization header or invalid format' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.error('[Auth] Token verification failed:', error?.message || 'No user found');
    return res.status(401).json({ error: 'Invalid token' });
  }

  (req as any).user = { ...user, token };
  console.log(`[Auth] User authenticated: ${user.email}`);
  next();
};

// Main Scanning Endpoint
app.post('/api/scans', authMiddleware, async (req, res) => {
  try {
    const config = req.body;
    const { id: userId, token } = (req as any).user;
    config.user_id = userId;
    const scanId = await startScan(config, token);
    res.json({ success: true, scanId });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Scan History Endpoint
app.get('/api/scans', authMiddleware, async (req, res) => {
  try {
    const { id: userId, token } = (req as any).user;
    const history = await getScanHistory(token);
    // Filter by user ID if necessary in backend scan service
    res.json({ success: true, history: history.filter((s:any) => s.user_id === userId) });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Scan Details Endpoint
app.get('/api/scans/:id', authMiddleware, async (req, res) => {
  try {
    const scanId = req.params.id as string;
    const { id: userId, token } = (req as any).user;
    const scan = await getScanById(scanId, token);
    if (!scan || scan.user_id !== userId) return res.status(404).json({ success: false, error: 'Scan not found' });
    res.json({ success: true, scan });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/scans/:id/pause', authMiddleware, async (req, res) => {
  try {
    const scanId = req.params.id as string;
    const { id: userId, token } = (req as any).user;
    const scan = await getScanById(scanId, token);
    if (!scan || scan.user_id !== userId) return res.status(404).json({ success: false, error: 'Scan not found' });
    await pauseScan(scanId, token);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/scans/:id/resume', authMiddleware, async (req, res) => {
  try {
    const scanId = req.params.id as string;
    const { id: userId, token } = (req as any).user;
    const scan = await getScanById(scanId, token);
    if (!scan || scan.user_id !== userId) return res.status(404).json({ success: false, error: 'Scan not found' });
    await resumeScan(scanId, token);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/scans/:id/stop', authMiddleware, async (req, res) => {
  try {
    const scanId = req.params.id as string;
    const { id: userId, token } = (req as any).user;
    const scan = await getScanById(scanId, token);
    if (!scan || scan.user_id !== userId) return res.status(404).json({ success: false, error: 'Scan not found' });
    await stopScan(scanId, token);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/scans/:id', authMiddleware, async (req, res) => {
  try {
    const scanId = req.params.id as string;
    const { id: userId, token } = (req as any).user;
    const scan = await getScanById(scanId, token);
    if (!scan || scan.user_id !== userId) return res.status(404).json({ success: false, error: 'Scan not found' });
    await deleteScan(scanId, token);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/scans', authMiddleware, async (req, res) => {
  try {
    // Only delete scans for the current user
    const { supabase } = require('./supabaseClient');
    await supabase.from('user_scans').delete().eq('user_id', (req as any).user.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/scans/cleanup', authMiddleware, async (req, res) => {
  try {
    await cleanupStuckScans();
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CORS Proxy Endpoint
app.all('/api/proxy', async (req, res) => {
  const urlParam = req.query.url;
  const targetUrl = (Array.isArray(urlParam) ? urlParam[0] : urlParam) as string;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  try {
    new URL(targetUrl); // Validate URL
    
    const fetchHeaders = new Headers();
    const allowedHeaders = ['accept', 'accept-encoding', 'accept-language', 'user-agent', 'authorization', 'content-type'];
    
    Object.entries(req.headers).forEach(([key, value]) => {
      if (allowedHeaders.includes(key.toLowerCase()) && typeof value === 'string') {
        fetchHeaders.set(key, value);
      }
    });

    if (!fetchHeaders.has('user-agent')) {
      fetchHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36');
    }

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: fetchHeaders,
      redirect: 'follow',
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    };

    const response = await fetch(targetUrl, fetchOptions);
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.status(response.status).send(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch target URL', details: error.message });
  }
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ success: false, error: err.message, stack: err.stack });
});

app.listen(PORT, () => {
  console.log(`Backend Scanner API up and running on port ${PORT}`);
});
