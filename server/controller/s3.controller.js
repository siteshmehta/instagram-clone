import fs from "fs";
import AWS from "aws-sdk";
import {config} from "dotenv";
config();


const bucketName = process.env.AWS_BUCKET_NAME;

AWS.config.update({ 
  "accessKeyId":  process.env.AWS_ACCESS_KEY_ID, 
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, 
  "region": process.env.AWS_BUCKET_REGION 
});
const s3 = new AWS.S3();


export async function uploadFile( file ) {
  
    const fileStream =  fs.createReadStream(file.path);
    
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file?.filename,
        ContentType: file.mimetype
    }
    
    const response = await s3.upload(uploadParams).promise();

    if (response.error) {
      console.log(response.error);
      return {
        status: false,
        message: 'Failed to upload the file'
      };
    } else {
      const awsImageName = response.Key;
      return {
        status: true,
        message: 'File uploaded',
        awsImageName: awsImageName
      };
    }
    
    // return Promise.resolve(s3.upload(uploadParams)).then(function(response) {
    //   if (response.error) {
    //       console.log(response.error);
    //       return {
    //         status : false,
    //         message : "failed to upload the file"
    //       }
    //   } else {
    //       return {
    //         status : true ,
    //         message : "file uploaded"
    //       }
    //   }
    // });

}



export function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}



export async function  fileUpload (req, res) {
    try {
      // Get the image data from the request body
      const img = req.body.img;
  
      // Configure AWS credentials and region
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_BUCKET_REGION
      });
  
      // Create a new S3 client
      const s3 = new AWS.S3();
  
      // Specify the bucket name and file details
      const bucketName = process.env.AWS_BUCKET_NAME;
      const fileName = "post/testingfile";
  
      // Decode the base64 data into a Buffer
      const fileData = Buffer.from(img, "base64");
  
      // Create the parameters for the S3 upload
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileData
      };
  
      // Upload the file to S3
      
      await s3.upload(params, (err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          console.log('File uploaded successfully:', data.Location);
        }
      });
  
      // Return a success response
      res.send({
        status: true
      });
    } catch (err) {
      // Return an error response
      res.send({
        status: false,
        message: err.message
      });
    }
  };