// import AWS from 'aws-sdk';
// import formidable from 'formidable';
// import fs from 'fs';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadToS3 = async (req, res) => {
//   try {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: 'File upload failed' });
//       }
//       const file = files.file;
//       // console.log('params: ', file);

//       // Check if the file type is PNG or JPEG
//       const allowedTypes = ['image/png', 'image/jpeg'];
//       const fileType = file?.mimetype || file?.type;
//       if (!allowedTypes.includes(fileType)) {
//         res.status(400).json({ message: 'File type not allowed' });
//         return;
//       }

//       const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: file.originalFilename + Date.now(),
//         Body: fs.createReadStream(file.filepath),
//         ACL: 'public-read',
//         ContentType: fileType,
//       };

//       const result = await s3.upload(params).promise();
//       res
//         .status(200)
//         .json({ message: 'File uploaded successfully', url: result.Location });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'File upload failed' });
//   }
// };

// export default uploadToS3;

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
    const form = formidable({
      multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'File upload failed' });
        return;
      }

      const allowedTypes = ['image/png', 'image/jpeg'];
      const urls = [];

      if (!files.file.length) {
        files.file = { key: files.file };
      }

      for (const file of Object.values(files.file)) {
        const fileType = file.mimetype || file.type;
        if (!allowedTypes.includes(fileType)) {
          res.status(400).json({ message: 'File type not allowed' });
          return;
        }

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.originalFilename + Date.now(),
          Body: fs.createReadStream(file.filepath),
          ACL: 'public-read',
          ContentType: fileType,
        };
        console.log('before');
        const result = await s3.upload(params).promise();
        console.log('result', result);

        urls.push(result.Location);
      }

      res.status(200).json({ message: 'Files uploaded successfully', urls });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'File upload failed' });
  }
};

export default uploadToS3;
