import { z } from 'zod';

const addressSchema = z.object({
  alias: z.string({ message: 'alias should be string ' }),
  details: z.string({ message: 'details should be string ' }).optional(),
  phone: z
    .string()
    .regex(/^\+97(0|2)5(9|6)\d{7}$|^(05[9|6])\d{7}$/, 'Invalid phone number'),
  city: z.string({ message: 'city should be string ' }),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, 'Postal code must be exactly 5 digits')
    .or(z.literal('')),
});
type TAddAddress = z.infer<typeof addressSchema>;
export { addressSchema, type TAddAddress };
