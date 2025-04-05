import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email address is required ' })
    .email('Invalid email address'),
});
type TForgotPassword = z.infer<typeof forgotPasswordSchema>;
type TForgotPasswordResponse = { status: string; message: string };
export {
  forgotPasswordSchema,
  type TForgotPassword,
  type TForgotPasswordResponse,
};
