// Resend email integration for contact form
import { Resend } from 'resend';

interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { name, email, subject, message } = data;
  const { client, fromEmail } = await getResendClient();
  
  const emailSubject = subject 
    ? `Praxis Nexus Inquiry: ${subject}` 
    : `Praxis Nexus Inquiry from ${name}`;

  await client.emails.send({
    from: fromEmail || "Praxis Nexus <onboarding@resend.dev>",
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
}
