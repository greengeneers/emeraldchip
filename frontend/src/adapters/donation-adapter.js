import { fetchHandler, patchRequest } from '../utils/fetchingUtils.js';

const baseUrl = '/api/donations';

export const listDonations = async () => {
  return await fetchHandler(baseUrl);
};

export const updateDonation = async (id, updatedData) => {
  return await patchRequest(`${baseUrl}/${id}`, updatedData);
};
