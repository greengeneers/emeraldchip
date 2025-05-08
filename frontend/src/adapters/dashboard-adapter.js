import { fetchHandler } from '../utils/fetchingUtils.js';

const baseUrl = '/api/dashboard';

export const getOverview = async () => {
  return await fetchHandler(baseUrl);
};
