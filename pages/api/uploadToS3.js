import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadToS3 = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'File upload failed' });
      }
      const file = files.file;
      // console.log('params: ', file);

      // Check if the file type is PNG or JPEG
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.mimetype)) {
        res.status(400).json({ message: 'File type not allowed' });
        return;
      }

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalFilename + Date.now(),
        Body: fs.createReadStream(file.filepath),
        ACL: 'public-read',
        ContentType: file.mimetype,
      };

      const result = await s3.upload(params).promise();
      res
        .status(200)
        .json({ message: 'File uploaded successfully', url: result.Location });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'File upload failed' });
  }
};

export default uploadToS3;
