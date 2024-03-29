import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from '../types';
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";

@Controller('file')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService<IEnvironmentVariables>
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new HttpException('file is a required field.', HttpStatus.BAD_REQUEST);
    const key = await this.fileService.upload(file);
    return { file: `${this.configService.get('S3_URL')}${key}` };
  }
}
