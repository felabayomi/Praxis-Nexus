import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200, "Subject is too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
