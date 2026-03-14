export interface APIKeys {
  shodan?: string;
  virustotal?: string;
  securitytrails?: string;
  builtwith?: string;
  clearbit?: string;
  opencage?: string;
  hunterio?: string;
}

import * as fs from 'fs';
import * as path from 'path';

const API_KEYS_FILE = path.join(__dirname, '..', '..', 'api_keys.json');

export const getAPIKeys = async (): Promise<APIKeys> => {
  try {
    if (!fs.existsSync(API_KEYS_FILE)) {
      return {};
    }
    const data = fs.readFileSync(API_KEYS_FILE, 'utf-8');
    return data ? JSON.parse(data) : {};
  } catch (error: any) {
    console.error('[API Keys] Failed to load from file:', error.message);
    return {};
  }
};

export const saveAPIKeys = async (keys: APIKeys) => {
  try {
    fs.writeFileSync(API_KEYS_FILE, JSON.stringify(keys, null, 2), 'utf-8');
    console.log('[API Keys] Saved successfully to file');
  } catch (error: any) {
    console.error('[API Keys] Failed to save to file:', error.message);
    throw new Error(`Failed to save API keys: ${error.message}`);
  }
};
