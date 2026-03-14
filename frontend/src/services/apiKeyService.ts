export interface APIKeys {
  shodan?: string;
  virustotal?: string;
  securitytrails?: string;
  builtwith?: string;
  clearbit?: string;
  opencage?: string;
  hunterio?: string;
}

const STORAGE_KEY = 'abspider_api_keys';

export const getAPIKeys = async (): Promise<APIKeys> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error: any) {
    console.error('[API Keys] Failed to load from LocalStorage:', error.message);
    return {};
  }
};

export const saveAPIKeys = async (keys: APIKeys) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
};
