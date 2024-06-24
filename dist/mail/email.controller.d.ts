import { EmailDto } from "src/mail/dtos/posts.dto";
import { EmailService } from "src/mail/email.service";
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    create(body: EmailDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
