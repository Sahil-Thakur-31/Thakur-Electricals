import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  service: z.string().min(1, "Please select a service."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(500, "Please keep your message under 500 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const serviceOptions = [
  "Electrical Wiring",
  "Fitting & Installation",
  "Appliance Repairing",
  "LED Lights & Fixtures",
  "All Home Solutions",
  "Something Else",
];
