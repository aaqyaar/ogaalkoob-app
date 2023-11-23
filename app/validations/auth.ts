import * as zod from "zod"

export const LoginSchema = zod.object({
  email: zod
    .string({
      required_error: "Email field is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: zod
    .string({
      required_error: "Password field is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(100),
})

export const ForgotPasswordSchema = zod.object({
  email: zod
    .string({
      required_error: "Email field is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
})

export const VerifyCodeSchema = zod.object({
  code: zod
    .string({
      required_error: "Code field is required",
    })
    .min(6, {
      message: "Code must be at least 6 characters",
    })
    .max(6),
})

export const ResetPasswordSchema = zod
  .object({
    password: zod
      .string({
        required_error: "Password field is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .max(100),

    // confirmPassword must be the same as password
    confirmPassword: zod
      .string({
        required_error: "Confirm password field is required",
      })
      .min(6, {
        message: "Confirm password must be at least 6 characters",
      })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must be the same as password",
    path: ["confirmPassword"],
  })

export const RegisterSchema = zod.object({
  email: zod
    .string({
      required_error: "Email field is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: zod
    .string({
      required_error: "Password field is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(100),
  name: zod
    .string({
      required_error: "Name field is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(100),
})
