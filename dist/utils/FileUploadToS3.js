"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multerS3 = require("multer-s3-transform");
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
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.originalname });
            },
            key: function (req, file, cb) {
                cb(null, Date.now().toString() + "_" + file.originalname);
            }
        });
    }
}
exports.default = FileUploadToS3;
//# sourceMappingURL=FileUploadToS3.js.map