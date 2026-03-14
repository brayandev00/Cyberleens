export interface Settings {
  discordWebhook: string;
  proxyList: string;
  defaultThreads: number;
  timeout: number;
}

const defaultSettings: Settings = {
  discordWebhook: '',
  proxyList: '',
  defaultThreads: 20,
  timeout: 30,
};

const STORAGE_KEY = 'cyberleens_settings';

export const getSettings = async (): Promise<Settings> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch (error: any) {
    console.error('[Settings] Failed to load from LocalStorage:', error.message);
    return defaultSettings;
  }
};

export const saveSettings = async (settings: Settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const isValidDiscordWebhookUrl = (url: string): boolean => {
  if (!url) return false;
  const discordWebhookRegex = /^https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[a-zA-Z0-9_-]+$/;
  return discordWebhookRegex.test(url);
};

export const testDiscordWebhook = async (webhookUrl: string) => {
  if (!isValidDiscordWebhookUrl(webhookUrl)) throw new Error('Invalid format');
  const payload = {
    embeds: [{
      title: '✅ Webhook Test Successful',
      description: 'Your Discord webhook is configured correctly!',
      color: 0x10B981,
    }],
    username: 'CyberLeens Recon',
  };
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Status ${response.status}`);
  return true;
};
