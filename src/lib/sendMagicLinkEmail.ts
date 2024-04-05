import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || ""),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: process.env.EMAIL_FROM,
});

export default async function sendMagicLinkEmail(
  url: string,
  identifier: string,
) {
  // function to send or resend magic link email
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: identifier,
    subject: "Sign in to Code Crafter",
    text: textTemplate(url),
    html: htmlTemplate(url),
  });
}

const htmlTemplate = (url: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Crafter Sign-In</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .button {
            display: inline-block;
            background-color: #4F46E5;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 20px;
        }
        .helper-text {
            color: #808080;
        }
        .alternative-link {
            margin-top: 20px;
            font-size: 12px;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your login link</h1>
        <p>Click the link below to sign in to your Code Crafter account.</p>
        <p><a class="button" href="${url}" style="color:#fff">Sign In</a></p>
        <p class="alternative-link">If the button above doesn't work, paste this link into your web browser:<br>${url}</p>
        <p class="helper-text">If you didn't request this, please ignore this email.</p>
        <p>Happy coding!</p>
        <p>Best Regards,<br>Code Crafter Team</p>
    </div>
</body>
</html>`;

const textTemplate = (url: string): string =>
  `Hi there,

Click the link below to sign in to your Code Crafter account:

${url}

If you didn't request this, please ignore this email.

Happy coding!

Best Regards,
Code Crafter Team`;
