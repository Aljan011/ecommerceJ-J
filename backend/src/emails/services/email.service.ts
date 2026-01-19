import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailParams = {
    to: string | string[];
    subject: string;
    html: string;
};

export const sendEmail = async ({
    to,
    subject,
    html,
}: SendEmailParams) => {
    return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
});
}