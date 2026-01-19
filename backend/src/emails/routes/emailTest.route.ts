import { Router } from "express";
import { sendEmail } from "../services/email.service.ts";

const router = Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: "Resend test email",
      html: "<h1>Resend is working ✅</h1><p>Your email setup is correct.</p>",
    });

    res.json({ message: "Test email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send test email" });
  }
});

export const emailTestRoute = router;
