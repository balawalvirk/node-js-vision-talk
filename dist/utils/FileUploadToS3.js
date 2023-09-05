"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");
const AWS = require("aws-sdk");
require('dotenv').config();
class FileUploadToS3 {
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
                        cb(null, `${file.originalname}`);
                    },
                    transform: function (req, file, cb) {
                        cb(null, sharp().png());
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
        });
    }
}
exports.default = FileUploadToS3;
//# sourceMappingURL=FileUploadToS3.js.map