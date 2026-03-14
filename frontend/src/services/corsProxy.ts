const CLOUDFLARE_BYPASS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'DNT': '1',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Cache-Control': 'max-age=0',
};

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
}

export interface CORSBypassMetadata {
  usedProxy: boolean;
  proxyUrl?: string;
  attemptsDirect: boolean;
  attemptsViaProxy: number;
}

export interface FetchWithBypassResult {
  response: Response;
  metadata: CORSBypassMetadata;
}

export async function fetchWithBypass(
  url: string,
  options: FetchOptions & { signal?: AbortSignal } = {}
): Promise<FetchWithBypassResult> {
  const { method = 'GET', headers = {}, body, timeout = 20000, signal } = options;
  const errors: string[] = [];
  const metadata: CORSBypassMetadata = {
    usedProxy: false,
    attemptsDirect: true,
    attemptsViaProxy: 0,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const response = await fetch(url, {
      method,
      headers: { ...CLOUDFLARE_BYPASS_HEADERS, ...headers },
      body,
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit',
    });

    clearTimeout(timeoutId);

    if (response.ok || (response.status >= 200 && response.status < 400)) {
      return { response, metadata };
    }
  } catch (error: any) {
    errors.push(`Direct: ${error.message}`);
  }

  metadata.attemptsViaProxy++;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl, {
      method,
      headers: headers,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      metadata.usedProxy = true;
      metadata.proxyUrl = '/api/proxy';
      return { response, metadata };
    } else {
      const errorText = await response.text();
      throw new Error(`Proxy status ${response.status}: ${errorText}`);
    }
  } catch (error: any) {
    errors.push(`Proxy: ${error.message}`);
  }

  throw new Error(`All attempts failed. Errors: ${errors.join(' | ')}`);
}

export async function fetchTextWithBypass(url: string, options?: any) {
  const result = await fetchWithBypass(url, options);
  return { text: await result.response.text(), metadata: result.metadata };
}

export async function fetchJSONWithBypass(url: string, options?: any) {
  const result = await fetchWithBypass(url, options);
  return { data: await result.response.json(), metadata: result.metadata };
}
