"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstimateEmailMessage = exports.sendRawEmail = exports.sendEmail = void 0;
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
require('dotenv').config();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_EMAIL_ACCESS_REGION,
});
const sendEmail = async (from, to, subject, text, body, attachments = []) => {
    try {
        const params = {
            Destination: {
                CcAddresses: [to],
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: body,
                    },
                    Text: {
                        Charset: 'UTF-8',
                        Data: text,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
            Source: from,
            ReplyToAddresses: [from],
        };
        const sendPromise = await new AWS.SES({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_EMAIL_ACCESS_REGION,
        })
            .sendEmail(params)
            .promise();
        return;
    }
    catch (e) {
        console.log(e);
        return;
    }
};
exports.sendEmail = sendEmail;
const sendRawEmail = async (from, to, subject, body, html, attachments) => {
    try {
        const transporter = nodemailer.createTransport({
            SES: new AWS.SES({ apiVersion: '2010-12-01' }),
        });
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: body,
            html,
            attachments,
        };
        await transporter.sendMail(mailOptions);
        return;
    }
    catch (e) {
        console.log(e);
        return;
    }
};
exports.sendRawEmail = sendRawEmail;
const getEstimateEmailMessage = (businessName) => {
    return `<p style="color:blue;">Thank you for giving us the opportunity to estimate your project!</p>
            <p style="color:blue;">Please find your estimate below. If you have any questions do not hesitate to reach out. Our contact info can be found on the top of your estimate. Please contact us at the email address on our estimate and do not reply directly to this email address as it is not monitored.</p>
            <p style="color:blue;">Again we really appreciate the opportunity and look forward to working with you on this project.</p>
            <p style="color:blue;">All the best!</p>
            <p style="color:blue;">Your Paint Team</p>

`;
};
exports.getEstimateEmailMessage = getEstimateEmailMessage;
//# sourceMappingURL=index.js.map