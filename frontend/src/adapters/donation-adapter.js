import { fetchHandler } from '../utils/fetchingUtils.js';

const baseUrl = `/api/donations`;

export const listDonations = async () => {
  return await fetchHandler(`${baseUrl}`);
};
