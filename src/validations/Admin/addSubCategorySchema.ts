import { z } from 'zod';
export const optionSchema = z.object({ value: z.string(), label: z.string() });
const addSubCategorySchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Category name')
    .max(32, 'Too long Category name'),

  category: z
    .union([optionSchema, z.string()], {
      message: 'category should be object or string  ',
    })
    .transform((value) => {
      if (typeof value === 'object' && 'value' in value) {
        return String(value.value);
      }
      return value;
    })
    .refine((val) => /^[a-f\d]{24}$/i.test(val), 'Invalid MongoDB ObjectId'),
});
const updateSubCategorySchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Category name')
    .max(32, 'Too long Category name')
    .optional(),
  category: z
    .union([optionSchema, z.string()], {
      message: 'category should be object or string  ',
    })
    .transform((value) => {
      if (typeof value === 'object' && 'value' in value) {
        return String(value.value);
      }
      return value;
    })
    .refine((val) => /^[a-f\d]{24}$/i.test(val), 'Invalid MongoDB ObjectId')
    .optional(),
});
type TAddSubCategory = z.infer<typeof addSubCategorySchema>;
type TUpdateSubCategory = z.infer<typeof updateSubCategorySchema>;
export {
  addSubCategorySchema,
  updateSubCategorySchema,
  type TAddSubCategory,
  type TUpdateSubCategory,
};
