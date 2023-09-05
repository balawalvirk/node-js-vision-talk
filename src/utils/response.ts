import {
    BadRequestException,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException
} from "@nestjs/common";

const successResponse = (statusCode, message, data) => {
  return {
    success: true,
    statusCode,
    message,
    data:JSON.parse(JSON.stringify(data)),
  };
};

const errorResponse = (statusCode, message) => {

  if(statusCode===400){
      throw new BadRequestException(message);
  }else if(statusCode===404){
      throw new NotFoundException(message);
  }else if(statusCode===409){
      throw new HttpException(message, HttpStatus.CONFLICT);
  }  else {
      throw new InternalServerErrorException(message);
  }
};

export { successResponse, errorResponse };
