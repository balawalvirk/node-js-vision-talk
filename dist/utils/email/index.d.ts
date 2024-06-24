export declare const sendEmail: (from: any, to: any, subject: any, text: any, body: any, attachments?: any[]) => Promise<void>;
export declare const sendRawEmail: (from: any, to: any, subject: any, body: any, html: any, attachments: any) => Promise<void>;
export declare const getEstimateEmailMessage: (businessName: any) => string;
