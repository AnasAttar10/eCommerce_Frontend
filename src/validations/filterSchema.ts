import { z } from 'zod';

const filterSchema = z
  .object({
    brands: z
      .array(z.string())
      .refine((values) => values.every((val) => /^[a-f\d]{24}$/i.test(val)), {
        message: 'Invalid MongoDB ObjectId',
      }),
    subcategories: z
      .array(z.string())
      .refine((values) => values.every((val) => /^[a-f\d]{24}$/i.test(val)), {
        message: 'Invalid MongoDB ObjectId',
      }),
    priceF: z
      .union([z.string(), z.number()])
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (num) => num === undefined || (!isNaN(num) && num >= 0 && num <= 10000),
        {
          message: 'Price should be between 0 and 10000',
        }
      )
      .optional(),
    priceT: z
      .union([z.string(), z.number()])
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (num) => num === undefined || (!isNaN(num) && num >= 0 && num <= 10000),
        {
          message: 'Price should be between 0 and 10000',
        }
      )
      .optional(),
  })
  .refine(
    (values) => {
      if (values.priceF === undefined || values.priceT === undefined) {
        return true; // Skip validation if either price is missing
      }
      return values.priceF < values.priceT;
    },
    {
      message: 'Price From should be smaller than Price To',
      path: ['priceT'],
    }
  );
type TFilter = z.infer<typeof filterSchema>;
export { filterSchema, type TFilter };
