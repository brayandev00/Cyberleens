export const getSmartScanConfig = (responseTime: number) => {
  if (responseTime < 200) return { speed: 'fast', payloads: 50 };
  if (responseTime < 500) return { speed: 'moderate', payloads: 20 };
  return { speed: 'stealth', payloads: 5 };
};
