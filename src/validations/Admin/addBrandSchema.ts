import { z } from 'zod';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const addBrandSchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Brand name')
    .max(32, 'Too long Brand name'),
  image: z
    .custom<File>((file) => file instanceof File, 'Image is required')
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Image must be less than 2MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
    ),
});
const updateBrandSchema = z.object({
  name: z
    .string({ message: 'name should be string ' })
    .min(3, 'Too short Brand name')
    .max(32, 'Too long Brand name')
    .optional(),
  image: z
    .union([z.string(), z.instanceof(File), z.undefined()])
    .refine(
      (file) =>
        typeof file === 'string' || file === undefined || file instanceof File,
      'Image is required'
    )
    .refine(
      (file) =>
        typeof file === 'string' ||
        file === undefined ||
        file.size <= MAX_FILE_SIZE,
      'Image must be less than 2MB'
    )
    .refine(
      (file) =>
        typeof file === 'string' ||
        file === undefined ||
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
    )
    .optional(),
});
type TAddBrand = z.infer<typeof addBrandSchema>;
type TUpdateBrand = z.infer<typeof updateBrandSchema>;
export { addBrandSchema, updateBrandSchema, type TAddBrand, type TUpdateBrand };
