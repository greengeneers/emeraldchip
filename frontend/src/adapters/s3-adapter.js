import { fetchHandler } from '../utils/fetchingUtils.js';

const baseUrl = `/api/s3`;

export const getSignature = async () => {
  const [response, error] = await fetchHandler(`${baseUrl}`);

  if (error) {
    console.error('Error getting S3 Signature:', error);
    return;
  }

  return response.url;
};
