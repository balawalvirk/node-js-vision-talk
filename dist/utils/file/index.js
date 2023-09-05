"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterFileUpload = exports.AllowedImageFiles = void 0;
const multer = require("multer");
exports.AllowedImageFiles = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp', 'image/svg'];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.MulterFileUpload = multer({ storage: storage });
//# sourceMappingURL=index.js.map