import { getSignature } from '../adapters/s3-adapter.js';
import { fetchHandler } from './fetchingUtils.js';

const handleS3Upload = async (url, file) => {
  const [_, error] = await fetchHandler(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  });

  if (error) {
    console.error('Error uploading to S3:', error);
    return false;
  }

  return true;
};

const handleUpload = async (e) => {
  const file = e.target.files[0];
  const url = await getSignature();
  const uploaded = await handleS3Upload(url, file);

  if (!file || !url || !uploaded) return;

  return url.split('?')[0];
};

export default handleUpload;
