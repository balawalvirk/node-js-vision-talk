import * as multerS3 from 'multer-s3-transform'
import * as sharp from 'sharp'
import * as AWS from 'aws-sdk'

require('dotenv').config()

export default class FileUploadToS3 {


    static uploadFile() {
        return multerS3({
            s3: new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }),
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.originalname});
            },
            key: function (req, file, cb) {
                cb(null, Date.now().toString()+"_"+file.originalname)
            }
        })
    }
}
