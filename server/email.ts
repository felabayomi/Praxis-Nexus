// Resend email integration for contact form
import { Resend } from 'resend';

interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return {
    client: new Resend(apiKey),
  };
}
export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { name, email, subject, message } = data;
  const { client } = await getResendClient();
  const senderFrom = "Praxis Nexus <no-reply@praxinex.org>";
  
  console.log("Sending contact form emails...");
  console.log("From:", senderFrom);
  console.log("To admin:", "praxinex@gmail.com");
  console.log("Confirmation to:", email);
  
  const emailSubject = subject 
    ? `Praxis Nexus Inquiry: ${subject}` 
    : `Praxis Nexus Inquiry from ${name}`;

  // Send notification to Felix (with sender's email as reply-to so you can reply directly)
  try {
    const adminResult = await client.emails.send({
      from: senderFrom,
      to: "praxinex@gmail.com",
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f4c3a; border-bottom: 2px solid #0f4c3a; padding-bottom: 10px;">
            New Inquiry from Praxis Nexus
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0f4c3a; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            This message was sent via the Praxis Nexus contact form.
          </p>
        </div>
      `,
    });
    console.log("Admin email result:", JSON.stringify(adminResult));
  } catch (adminError) {
    console.error("Admin email error:", adminError);
  }

  // Wait 1 second to avoid Resend rate limit (2 requests per second)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Send confirmation to the sender (with reply-to praxinex@gmail.com)
  try {
    console.log("Now sending confirmation email to:", email);
    const confirmResult = await client.emails.send({
      from: senderFrom,
      to: email,
      replyTo: "praxinex@gmail.com",
      subject: "Thank you for contacting Praxis Nexus",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f4c3a; border-bottom: 2px solid #0f4c3a; padding-bottom: 10px;">
            Thank You for Your Message
          </h2>
          
          <p style="line-height: 1.8; margin: 20px 0;">
            Dear ${name},
          </p>
          
          <p style="line-height: 1.8; margin: 20px 0;">
            Thank you for reaching out through Praxis Nexus. I have received your message${subject ? ` regarding "${subject}"` : ''} and will respond as soon as possible.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0f4c3a; margin-top: 0; font-size: 14px;">Your message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; font-style: italic; color: #555;">${message}</p>
          </div>
          
          <p style="line-height: 1.8; margin: 20px 0;">
            Best regards,<br>
            <strong>Felix Abayomi</strong><br>
            <span style="color: #666;">Doctor of Education (EdD) Candidate, Antioch University</span>
          </p>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            This is an automated confirmation from Praxis Nexus - Academic Inquiry Journal.
          </p>
        </div>
      `,
    });
    console.log("Confirmation email result:", JSON.stringify(confirmResult));
  } catch (confirmError) {
    console.error("Confirmation email error:", confirmError);
  }
}
