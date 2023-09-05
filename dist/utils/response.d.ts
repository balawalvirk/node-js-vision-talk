declare const successResponse: (statusCode: any, message: any, data: any) => {
    success: boolean;
    statusCode: any;
    message: any;
    data: any;
};
declare const errorResponse: (statusCode: any, message: any) => never;
export { successResponse, errorResponse };
