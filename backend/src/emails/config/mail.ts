import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { Resend } from "resend";

//---types----
type AddressLike =
  | string
  | {
      name?: string;
      address: string;
    };

type MailDataLike = {
  to?: AddressLike | AddressLike[];
  subject?: string;
  html?: string;
};

type MailLike = {
  data?: MailDataLike;
};

/* ---------------------------------- */

const resend = new Resend(process.env.RESEND_API_KEY!);

export const mailTransporter = nodemailer.createTransport(
  {
    name: "resend",
    version: "1.0.0",

    send(
      mail: MailLike,
      callback: (err: Error | null, info?: unknown) => void
    ): void {
      (async () => {
        try {
          if (!mail.data) {
            throw new Error("Mail data is missing");
          }

          const { to, subject, html } = mail.data;
          const recipients: string[] = [];

          if (Array.isArray(to)) {
            for (const addr of to) {
              if (typeof addr === "string") {
                recipients.push(addr);
              } else if (addr && typeof addr.address === "string") {
                recipients.push(addr.address);
              }
            }
          } else if (typeof to === "string") {
            recipients.push(to);
          } else if (to && typeof to.address === "string") {
            recipients.push(to.address);
          }

          if (recipients.length === 0) {
            throw new Error("No valid recipients found");
          }

          if (typeof html !== "string") {
            throw new Error("Email HTML must be a string");
          }

          await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: recipients,
            subject: subject ?? "",
            html,
          });

          callback(null, { success: true });
        } catch (error) {
          callback(error as Error);
        }
      })();
    },
  } as SMTPTransport.Options
);
