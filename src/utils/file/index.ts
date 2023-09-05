import multer = require("multer");

export const AllowedImageFiles=['image/jpeg', 'image/png','image/gif','image/bmp','image/tiff','image/webp','image/svg']

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const MulterFileUpload = multer({ storage: storage });
