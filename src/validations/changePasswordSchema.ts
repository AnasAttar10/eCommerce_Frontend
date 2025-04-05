import { z } from 'zod';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'current Password is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters longs' })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: 'Password should contain at least 1 special character',
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((input) => input.password === input.passwordConfirm, {
    message: 'Password and Confirm Password does not match',
    path: ['passwordConfirm'],
  });

type TChangePassword = z.infer<typeof changePasswordSchema>;
export { changePasswordSchema, type TChangePassword };
