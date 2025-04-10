import { z } from 'zod';
const signUpSchema = z
  .object({
    name: z.string().min(1, 'name is required'),
    email: z
      .string()
      .min(1, { message: 'email address is required ' })
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters longs' })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: 'Password should contain at least 1 special character',
      }),
    passwordConfirm: z
      .string()
      .min(8, { message: 'Confirm Password is required' }),
  })
  .refine((input) => input.password === input.passwordConfirm, {
    message: 'Password and Confirm Password does not match',
    path: ['passwordConfirm'],
  });
type TSignUp = z.infer<typeof signUpSchema>;

export { signUpSchema, type TSignUp };
