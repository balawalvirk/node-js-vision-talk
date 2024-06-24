import { EmailDto } from "src/mail/dtos/posts.dto";
export declare class EmailService {
    constructor();
    create(payload: EmailDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
