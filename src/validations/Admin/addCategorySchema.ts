import { z } from 'zod';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const addCategorySchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Category name')
    .max(32, 'Too long Category name'),
  image: z
    .instanceof(File, { message: 'you should upload image File' })
    .refine(
      (value) => value.size <= MAX_FILE_SIZE,
      'Image must be less than 2MB'
    )
    .refine(
      (value) => ACCEPTED_IMAGE_TYPES.includes(value.type),
      'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
    ),
});
const updateCategorySchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Category name')
    .max(32, 'Too long Category name')
    .optional(),
  image: z
    .union([
      z.string(), // Accepts existing image URL as a string
      z.instanceof(File), // Accepts new file uploads
      z.undefined(),
    ])
    .refine(
      (value) =>
        typeof value === 'string' ||
        value === undefined ||
        value.size <= MAX_FILE_SIZE,
      'Image must be less than 2MB'
    )
    .refine(
      (value) =>
        typeof value === 'string' ||
        value === undefined ||
        ACCEPTED_IMAGE_TYPES.includes(value.type),
      'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
    )
    .optional(),
});
type TAddCategory = z.infer<typeof addCategorySchema>;
type TUpdateCategory = z.infer<typeof updateCategorySchema>;
export {
  addCategorySchema,
  updateCategorySchema,
  type TAddCategory,
  type TUpdateCategory,
};
