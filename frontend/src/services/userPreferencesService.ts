export interface UserPreferences {
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  auto_save: boolean;
  scan_history_limit: number;
  max_concurrent_scans: number;
  enable_notifications: boolean;
  enable_sounds: boolean;
  default_scan_profile: 'quick' | 'balanced' | 'comprehensive' | 'stealth';
  export_format: 'json' | 'csv' | 'pdf';
  retry_attempts: number;
  user_agent: string;
}

const STORAGE_KEY = 'cyberleens_user_preferences';

export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const saveUserPreferences = async (preferences: UserPreferences): Promise<UserPreferences> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  return preferences;
};

export const getDefaultPreferences = (userId: string): UserPreferences => {
  return {
    user_id: userId,
    theme: 'system',
    language: 'en',
    auto_save: true,
    scan_history_limit: 100,
    max_concurrent_scans: 3,
    enable_notifications: true,
    enable_sounds: false,
    default_scan_profile: 'balanced',
    export_format: 'json',
    retry_attempts: 3,
    user_agent: 'CyberLeens/1.0 (Security Scanner)'
  };
};
