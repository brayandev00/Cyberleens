export const calculateSecurityGrade = (results: any): number => {
  let score = 100;
  if (results.headers?.securityHeaders?.grade === 'F') score -= 30;
  if (results.sqlinjection?.vulnerable) score -= 40;
  if (results.xss?.vulnerable) score -= 30;
  return Math.max(0, score);
};
