import { z } from 'zod';
const updateMeSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .min(1, { message: 'email address is required ' })
    .email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+97(0|2)5(9|6)\d{7}$|^(05[9|6])\d{7}$/, 'Invalid phone number'),
});
type TUpdateMe = z.infer<typeof updateMeSchema>;
export { updateMeSchema, type TUpdateMe };
