import { mailTransporter } from "../config/mail.ts";

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailOptions) => {
  await mailTransporter.sendMail({
    to,
    subject,
    html,
  });
};
