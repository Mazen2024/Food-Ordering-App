import { Translations } from "@/lib/types/Translations";
import * as z from "zod";

//// Define Validations For Login
export const loginSchema = (trans: Translations) => {
  return z.object({
    /// Trimming Email & Convert To LowerCase State
    email: z.preprocess(
      (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
      z.email({
        message: trans.validation.validEmail,
      }),
    ),

    //// Validations For Min & Max Length For PW
    password: z
      .string()
      .min(6, { message: trans.validation.passwordMinLength })
      .max(40, { message: trans.validation.passwordMaxLength }),
  });
};

//// Define Validations For SignUp Form
export const signUpSchema = (trans: Translations) => {
  return z
    .object({
      // Name Validation
      name: z
        .string()
        .trim()
        .min(1, { message: trans.validation.nameRequired }),

      // Email Validation
      email: z.preprocess(
        (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.email({
          message: trans.validation.validEmail,
        }),
      ),

      //// Validations For Min & Max Length For PW
      password: z
        .string()
        .min(6, { message: trans.validation.passwordMinLength })
        .max(40, { message: trans.validation.passwordMaxLength }),

      //// Validations For Min & Max Length For PW
      confirmpassword: z
        .string()
        .min(6, { message: trans.validation.passwordMinLength })
        .max(40, { message: trans.validation.passwordMaxLength }),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: trans.validation.passwordMismatch,
      path: ["confirmpassword"],
    });
};

export type validationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;
