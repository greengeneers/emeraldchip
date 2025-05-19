const { S3 } = require('aws-sdk');
const { promisify } = require('util');
const crypto = require('crypto');

const randomBytes = promisify(crypto.randomBytes);

const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_S3_REGION;
const bucket = process.env.AWS_S3_BUCKET_NAME;

const s3 = new S3({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  signatureVersion: 'v4',
});

exports.generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucket,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
};
