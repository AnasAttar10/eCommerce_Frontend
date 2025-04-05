import { z } from 'zod';
const addCouponSchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Brand name')
    .max(32, 'Too long Brand name'),
  expire: z.date().refine((date) => date > new Date(), {
    message: 'The date has expired',
  }),
  discount: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val)) // Convert to number
    .refine((num) => !isNaN(num) && num >= 0 && num <= 100, {
      message: 'Discount should be between 0 and 100',
    }),
});
const updateCouponSchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Brand name')
    .max(32, 'Too long Brand name')
    .optional(),
  expire: z
    .union([z.date(), z.string()])
    .nullable()
    .refine(
      (date) => {
        if (!date) return true;
        return new Date(date) > new Date();
      },
      {
        message: 'The date has expired',
      }
    )
    .optional(),
  discount: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num) && num >= 0 && num <= 100, {
      message: 'Discount should be between 0 and 100',
    })
    .optional(),
});
type TAddCoupon = z.infer<typeof addCouponSchema>;
type TUpdateCoupon = z.infer<typeof updateCouponSchema>;

export {
  addCouponSchema,
  updateCouponSchema,
  type TAddCoupon,
  type TUpdateCoupon,
};
