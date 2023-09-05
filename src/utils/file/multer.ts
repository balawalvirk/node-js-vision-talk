import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import * as path from "path";
import { MulterCallback, MulterFile } from "../../utils/file/types/public";
import {MulterError} from "multer";

export const destinationImageFile = (req: Request, file: MulterFile, callback: (error: Error | null, fileDestination: string | null) => void) => {
    return callback(null, path.join("public", "images"));
};
export const imageFileFilter = (req: Request, file: MulterFile, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        callback(new Error('Only image files are allowed!'), false)
    } else callback(null, true);
};

export const editFileName = (req: Request, file: Express.Multer.File, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path.extname(file.originalname);
    callback(null, `${Date.now()}${fileExtName}`);
};


export const bankFileName = (req: Request, file: Express.Multer.File, callback) => {
    const name = req.body.bank_id;
    const fileExtName = path.extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};



export const imageFilter = (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) callback(null, true);
    else callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
}



export const fileFilter = (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif|webp|mp3|wav|mp4|docx|doc|pdf)$/)) callback(null, true);
    else callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
}
