import { z } from 'zod';

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email address is required ' })
    .email('Invalid email address'),
  newPassword: z
    .string()
    .min(7, { message: 'Password must be at least 7 characters longs' })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: 'Password should contain at least 1 special character',
    }),
});
type TResetPassword = z.infer<typeof resetPasswordSchema>;
export { resetPasswordSchema, type TResetPassword };
