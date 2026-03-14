import { normalizeUrl } from './apiUtils';
import { fetchWithBypass, CORSBypassMetadata } from './corsProxy';
import { RequestManager } from './requestManager';

export interface DDoSFirewallResult {
  tested: boolean;
  firewallDetected: boolean;
  indicators: string[];
  responseSummary: Array<{
    status: number;
    count: number;
    avgResponseTime: number;
  }>;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  wafDetected?: string;
  evidence?: string[];
  corsMetadata?: CORSBypassMetadata;
}

const DDoS_WAF_INDICATORS = {
  HEADERS: {
    'server': [
      'cloudflare', 'sucuri', 'akamai', 'incapsula', 'barracuda', 'mod_security',
      'gws', 'google front end', 'nginx', 'apache', 'microsoft-iis',
      'cloudfront', 'fastly', 'azure', 'aws', 'google',
      'akamai ghost', 'akamai edge',
      'imperva', 'f5 big-ip', 'palo alto',
    ],
    'x-waf-rule': [],
    'x-sucuri-id': [],
    'x-cdn': ['cloudflare', 'akamai', 'sucuri', 'google', 'cloudfront', 'fastly'],
    'cf-ray': ['cloudflare'],
    'cf-cache-status': ['cloudflare'],
    'x-protected-by': ['sucuri', 'imperva'],
    'x-cache': ['cloudflare', 'akamai', 'google', 'cloudfront', 'fastly'],
    'x-served-by': ['cloudflare', 'akamai', 'google', 'cloudfront', 'fastly'],
    'via': ['cloudflare', 'akamai', 'google', 'cloudfront', 'fastly'],
    'age': [],
    'alt-svc': ['google'],
    'x-goog-generation': ['google'],
    'x-akamai-transformed': ['akamai'],
    'x-envoy-upstream-service-time': ['envoy'],
    'x-powered-by': ['cloudflare', 'sucuri', 'akamai', 'google'],
    'set-cookie': ['__cf_bm', '_sucuri_waf_cookie', 'incap_ses', 'visid_incap'],
  },
  STATUS_CODES: [403, 429, 503, 504, 520, 521, 522, 524],
  BODY_PATTERNS: [
    /access denied/i,
    /rate limit exceeded/i,
    /captcha/i,
    /checking your browser/i,
    /ddos protection by/i,
    /bot management/i,
    /google/i,
    /sucuri/i,
    /akamai/i,
    /incapsula/i,
    /imperva/i,
    /f5 big-ip/i,
    /palo alto networks/i,
    /web application firewall/i,
  ],
};

export const performDDoSFirewallTest = async (
  target: string,
  numRequests: number = 20,
  intervalMs: number = 100,
  requestManager?: RequestManager
): Promise<DDoSFirewallResult> => {
  console.log(`[DDoS Firewall Test] Starting for ${target} with ${numRequests} requests`);

  const result: DDoSFirewallResult = {
    tested: true,
    firewallDetected: false,
    indicators: [],
    responseSummary: [],
    totalRequests: numRequests,
    successfulRequests: 0,
    failedRequests: 0,
  };

  try {
    const url = normalizeUrl(target);
    const responses: { status: number; duration: number; headers: Headers; text: string }[] = [];
    const statusCounts: { [key: number]: { count: number; totalDuration: number } } = {};
    const detectedWafs = new Set<string>();
    const evidenceSnippets = new Set<string>();

    for (let i = 0; i < numRequests; i++) {
      if (requestManager?.scanController?.signal.aborted) {
        throw new Error('Scan aborted by user');
      }

      const startTime = Date.now();
      try {
        let response: Response;
        let metadata: CORSBypassMetadata | undefined;

        if (requestManager) {
          response = await requestManager.fetch(url, { timeout: 5000 });
        } else {
          const fetchResult = await fetchWithBypass(url, { timeout: 5000 });
          response = fetchResult.response;
          metadata = fetchResult.metadata;
          if (!result.corsMetadata) result.corsMetadata = metadata;
        }

        const duration = Date.now() - startTime;
        const text = await response.text();

        responses.push({ status: response.status, duration, headers: response.headers, text });
        result.successfulRequests++;

        if (!statusCounts[response.status]) {
          statusCounts[response.status] = { count: 0, totalDuration: 0 };
        }
        statusCounts[response.status].count++;
        statusCounts[response.status].totalDuration += duration;

        for (const headerName in DDoS_WAF_INDICATORS.HEADERS) {
          const headerValue = response.headers.get(headerName);
          if (headerValue) {
            const patterns = (DDoS_WAF_INDICATORS.HEADERS as any)[headerName];
            
            if (patterns.length === 0 || patterns.some((p: string) => headerValue.toLowerCase().includes(p.toLowerCase()))) {
              result.firewallDetected = true;
              const indicatorText = `Header '${headerName}': ${headerValue}`;
              if (!result.indicators.includes(indicatorText)) {
                result.indicators.push(indicatorText);
                evidenceSnippets.add(indicatorText);
              }
              for (const p of patterns) {
                const lowerP = p.toLowerCase();
                if (headerValue.toLowerCase().includes(lowerP)) {
                  if (lowerP.includes('cloudflare')) detectedWafs.add('Cloudflare');
                  else if (lowerP.includes('sucuri')) detectedWafs.add('Sucuri');
                  else if (lowerP.includes('akamai')) detectedWafs.add('Akamai');
                  else if (lowerP.includes('google')) detectedWafs.add('Google Front End');
                  else if (lowerP.includes('incapsula')) detectedWafs.add('Incapsula');
                  else if (lowerP.includes('barracuda')) detectedWafs.add('Barracuda WAF');
                  else if (lowerP.includes('mod_security')) detectedWafs.add('ModSecurity WAF');
                  else if (lowerP.includes('imperva')) detectedWafs.add('Imperva WAF');
                  else if (lowerP.includes('f5 big-ip')) detectedWafs.add('F5 BIG-IP WAF');
                  else if (lowerP.includes('palo alto')) detectedWafs.add('Palo Alto WAF');
                  else if (lowerP.includes('cloudfront')) detectedWafs.add('AWS CloudFront');
                  else if (lowerP.includes('fastly')) detectedWafs.add('Fastly CDN');
                  else if (lowerP.includes('azure')) detectedWafs.add('Azure Front Door/WAF');
                  else if (lowerP.includes('aws')) detectedWafs.add('AWS WAF/CDN');
                  else if (lowerP.includes('envoy')) detectedWafs.add('Envoy Proxy/WAF');
                }
              }
              if (headerName === 'set-cookie') {
                if (headerValue.toLowerCase().includes('__cf_bm')) detectedWafs.add('Cloudflare');
                if (headerValue.toLowerCase().includes('_sucuri_waf_cookie')) detectedWafs.add('Sucuri');
                if (headerValue.toLowerCase().includes('incap_ses') || headerValue.toLowerCase().includes('visid_incap')) detectedWafs.add('Incapsula');
              }
            }
          }
        }

        for (const pattern of DDoS_WAF_INDICATORS.BODY_PATTERNS) {
          if (pattern.test(text)) {
            result.firewallDetected = true;
            const indicatorText = `Body pattern matched: '${pattern.source}'`;
            if (!result.indicators.includes(indicatorText)) {
              result.indicators.push(indicatorText);
              evidenceSnippets.add(`Body snippet: ${text.match(pattern)?.[0].substring(0, 100)}...`);
            }
            if (pattern.source.includes('google')) {
              detectedWafs.add('Google Front End');
            }
          }
        }

      } catch (error: any) {
        if (error.message === 'Request aborted') {
          throw error;
        }
        result.failedRequests++;
        console.warn(`[DDoS Firewall Test] Request failed: ${error.message}`);
        evidenceSnippets.add(`Request failed: ${error.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    for (const status in statusCounts) {
      result.responseSummary.push({
        status: parseInt(status),
        count: statusCounts[status].count,
        avgResponseTime: statusCounts[status].totalDuration / statusCounts[status].count,
      });
      if (DDoS_WAF_INDICATORS.STATUS_CODES.includes(parseInt(status))) {
        result.firewallDetected = true;
        const indicatorText = `HTTP Status Code ${status} detected`;
        if (!result.indicators.includes(indicatorText)) {
          result.indicators.push(indicatorText);
        }
      }
    }

    if (detectedWafs.size > 0) {
      result.wafDetected = Array.from(detectedWafs).join(', ');
    } else if (result.firewallDetected && !result.wafDetected) {
      result.wafDetected = 'Generic WAF/CDN';
    }
    result.evidence = Array.from(evidenceSnippets);

    console.log(`[DDoS Firewall Test] Complete. Firewall detected: ${result.firewallDetected}`);
    return result;
  } catch (error: any) {
    if (error.message === 'Request aborted') {
      throw error;
    }
    console.error('[DDoS Firewall Test] Critical error:', error);
    return {
      ...result,
      tested: false,
      firewallDetected: false,
      indicators: [...result.indicators, `Error: ${error.message}`],
    };
  }
};
