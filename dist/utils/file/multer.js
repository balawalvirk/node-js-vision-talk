"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.imageFilter = exports.bankFileName = exports.editFileName = exports.imageFileFilter = exports.destinationImageFile = void 0;
const path = require("path");
const multer_1 = require("multer");
const destinationImageFile = (req, file, callback) => {
    return callback(null, path.join("public", "images"));
};
exports.destinationImageFile = destinationImageFile;
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        callback(new Error('Only image files are allowed!'), false);
    }
    else
        callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path.extname(file.originalname);
    callback(null, `${Date.now()}${fileExtName}`);
};
exports.editFileName = editFileName;
const bankFileName = (req, file, callback) => {
    const name = req.body.bank_id;
    const fileExtName = path.extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};
exports.bankFileName = bankFileName;
const imageFilter = (req, file, callback) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/))
        callback(null, true);
    else
        callback(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
};
exports.imageFilter = imageFilter;
const fileFilter = (req, file, callback) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif|webp|mp3|wav|mp4|docx|doc|pdf)$/))
        callback(null, true);
    else
        callback(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=multer.js.map