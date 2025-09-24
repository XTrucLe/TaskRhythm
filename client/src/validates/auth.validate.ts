import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
      message: "Password must contain letters and numbers",
    }),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name must be at most 30 characters" })
      .regex(/^[A-Za-z\s]+$/, {
        message: "Name can only contain letters and spaces",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{8,15}$/, {
        message: "Invalid phone number",
      })
      .optional(),
    dateOfBirth: z
      .string()
      .optional()
      .superRefine((date, ctx) => {
        if (!date?.trim()) return; // optional

        // Format: DD-MM-YYYY
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());

        if (!match) {
          ctx.addIssue({
            code: "custom",
            message: "Format must be DD-MM-YYYY",
          });
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, y, m, d] = match;

        const day = +d,
          month = +m,
          year = +y;

        const today = new Date();
        if (year < 1900 || year > today.getFullYear()) {
          ctx.addIssue({
            code: "custom",
            message: `Year must be 1900-${today.getFullYear()}`,
          });
          return;
        }

        const dob = new Date(year, month - 1, day);

        if (
          dob.getFullYear() !== year ||
          dob.getMonth() !== month - 1 ||
          dob.getDate() !== day
        ) {
          ctx.addIssue({ code: "custom", message: "Invalid date" });
          return;
        }

        let age = today.getFullYear() - dob.getFullYear();
        const md = today.getMonth() - dob.getMonth();
        if (md < 0 || (md === 0 && today.getDate() < dob.getDate())) age--;

        if (age < 10)
          ctx.addIssue({
            code: "custom",
            message: "Must be at least 10 years old",
          });
        if (age > 120)
          ctx.addIssue({ code: "custom", message: "Age seems unrealistic" });
      }),
    gender: z.enum(["male", "female", "other"]),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: "Password must contain letters and numbers",
      }),
    confirmPassword: z.string().min(1, { message: "Please confirm password" }),
    terms: z.literal(true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
