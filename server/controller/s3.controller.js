import { v4 as uuidv4 } from 'uuid';
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
  
    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: uuidv4(),
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
  

}
