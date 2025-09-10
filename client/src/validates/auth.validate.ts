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
      .regex(/^\+?[0-9]{7,15}$/, {
        message: "Invalid phone number",
      })
      .optional(),
    dateOfBirth: z
      .string()
      .refine((date) => {
        if (!date) return true; // optional field
        const dob = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          return age - 1 >= 13;
        }
        return age >= 13;
      }, "You must be at least 13 years old")
      .optional(),
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
