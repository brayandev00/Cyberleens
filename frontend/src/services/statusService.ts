import { fetchWithBypass } from './corsProxy';

export const getStatus = async () => {
  try {
    const res = await fetch('/api/status');
    return await res.json();
  } catch (error) {
    return { status: 'error' };
  }
};
