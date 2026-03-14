interface ProxyConfig {
  url: string;
  enabled: boolean;
}

let currentProxyIndex = 0;
let proxyList: string[] = [];

export const setProxyList = (proxies: string[]) => {
  proxyList = proxies.filter(p => p.trim().length > 0);
  currentProxyIndex = 0;
};

export const getNextProxy = (): string | null => {
  if (proxyList.length === 0) return null;
  const proxy = proxyList[currentProxyIndex];
  currentProxyIndex = (currentProxyIndex + 1) % proxyList.length;
  return proxy;
};

export const makeRequest = async (
  url: string,
  options: RequestInit = {},
  useProxy: boolean = false,
  timeout: number = 30000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const requestUrl = useProxy && proxyList.length > 0 
    ? `${getNextProxy()}/${url}` 
    : url;

  const response = await fetch(requestUrl, {
    ...options,
    signal: controller.signal,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ...options.headers,
    },
  }).finally(() => {
    clearTimeout(timeoutId);
  });

  return response;
};

export const normalizeUrl = (target: string): string => {
  let url = target.trim();
  
  try {
    new URL(url);
    return url;
  } catch (e) {
    try {
      const prefixedUrl = `https://${url}`;
      new URL(prefixedUrl);
      return prefixedUrl;
    } catch (e2) {
      if (isIPv4(url) || isIPv6(url)) {
        return `https://${url}`;
      }
      if (url === 'localhost' || url.startsWith('localhost:')) {
        return `http://${url}`;
      }
      throw new Error(`Cannot normalize invalid URL string: ${target}`);
    }
  }
};

export const extractDomain = (target: string): string => {
  let url = target.trim();
  url = url.replace(/^https?:\/\//, '');
  url = url.replace(/\/.*$/, '');
  url = url.replace(/:\d+$/, '');
  return url;
};

export const extractHostname = (target: string): string => {
  if (!target) return '';
  try {
    const url = normalizeUrl(target);
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    if (!target.includes(' ') && (target.includes('.') || isIPv4(target) || isIPv6(target))) {
      return target;
    }
    return '';
  }
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const safeJsonParse = (text: string, fallback: any = null) => {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
};

const isIPv4 = (ip: string): boolean => {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
};

const isIPv6 = (ip: string): boolean => {
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|::((:[0-9a-fA-F]{1,7})|)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv6Regex.test(ip);
};

export const isInternalIP = (ip: string): boolean => {
  const isIpValid = isIPv4(ip) || isIPv6(ip);
  if (!isIpValid) return false;
  if (isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 127) return true;
  }
  if (isIPv6(ip)) {
    if (ip.startsWith('fc00:') || ip.startsWith('fd')) return true;
    if (ip === '::1') return true;
  }
  return false;
};
