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
            transforms: [
                {
                    id: 'original',
                    key: function (req, file, cb) {
                        cb(null, `${file.originalname}`)
                    },
                    transform: function (req, file, cb) {
                        cb(null, sharp().png())
                    }
                },
                {
                    id: 'large',
                    key: (req, file, cb) => cb(null, new Date().getTime() + `_large_${file.originalname}`),
                    transform: (req, file, cb) => cb(null, sharp().resize(1200, 900).png())
                },
                {
                    id: 'small',
                    key: (req, file, cb) => cb(null, new Date().getTime() + `_small_${file.originalname}`),
                    transform: (req, file, cb) => cb(null, sharp().resize(400, 300).png())
                }
            ]
        })
    }
}
