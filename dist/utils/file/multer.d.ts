import { Request } from "express";
import { MulterFile } from "../../utils/file/types/public";
export declare const destinationImageFile: (req: Request, file: MulterFile, callback: (error: Error | null, fileDestination: string | null) => void) => void;
export declare const imageFileFilter: (req: Request, file: MulterFile, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export declare const editFileName: (req: Request, file: Express.Multer.File, callback: any) => void;
export declare const bankFileName: (req: Request, file: Express.Multer.File, callback: any) => void;
export declare const imageFilter: (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => void;
export declare const fileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => void;
