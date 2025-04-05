import { z } from 'zod';
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const imageSchema = z.object({
  name: z.string(),
  type: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
    message: 'Only JPG, PNG, and WebP files are allowed',
  }),
  size: z
    .number()
    .max(MAX_FILE_SIZE, { message: 'Image must be less than 2MB' }),
});
export const optionSchema = z.object({ value: z.string(), label: z.string() });
const addProductSchema = z
  .object({
    title: z
      .string({ message: 'name should be string ' })
      .min(3, 'Too short Product name')
      .max(32, 'Too long Product name'),
    description: z
      .string({ message: 'description should be string ' })
      .min(3, 'Too short Product description')
      .max(500, 'Too long Product description'),
    quantity: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'quantity should be between 0 and 10000',
      }),
    sold: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'sold should be between 0 and 10000',
      })
      .optional(),
    price: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'price should be between 0 and 10000',
      }),
    priceAfterDiscount: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'priceAfterDiscount should be between 0 and 10000',
      })
      .optional(),
    colors: z
      .array(
        z.union([optionSchema, z.string()]).transform((value) => {
          if (typeof value === 'object' && 'value' in value) {
            return String(value.value);
          }
          return value;
        })
      )
      .optional(),
    imageCover: z
      .instanceof(File, { message: 'you should upload image File' })
      .refine(
        (value) => value.size <= MAX_FILE_SIZE,
        'Image must be less than 2MB'
      )
      .refine(
        (value) => ACCEPTED_IMAGE_TYPES.includes(value.type),
        'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      ),
    images: z
      .custom<File[] | undefined>(
        (value) =>
          value === undefined ||
          value instanceof File ||
          (Array.isArray(value) &&
            (value as File[]).every((v) => v instanceof File)),
        {
          message: 'You should upload image files',
        }
      )
      .transform((fileList) => fileList && Array.from(fileList)) // Convert FileList to array
      .refine((files) => !files || files.length <= 5, {
        message: 'You can upload up to 5 files',
      })
      .refine(
        (files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE),
        {
          message: 'Each image must be less than 2MB',
        }
      )
      .refine(
        (files) =>
          !files ||
          files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
        { message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }
      ),
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
    brand: z
      .union([optionSchema, z.string()], {
        message: 'Brand should be object or string  ',
      })
      .optional()
      .transform((value) => {
        if (value === undefined) return undefined;
        if (typeof value === 'object' && 'value' in value) {
          return String(value.value);
        }
        return value;
      })
      .refine(
        (val) => val === undefined || /^[a-f\d]{24}$/i.test(val),
        'Invalid MongoDB ObjectId'
      ),
    subcategories: z
      .array(
        z
          .union([optionSchema, z.string()])
          .transform((value) => {
            if (typeof value === 'object' && 'value' in value) {
              return String(value.value);
            }
            return value;
          })
          .refine(
            (val) => /^[a-f\d]{24}$/i.test(val),
            'Invalid MongoDB ObjectId'
          )
      )
      .optional(),
  })
  .refine(
    (values) => {
      if (
        values.priceAfterDiscount === undefined ||
        values.price === undefined
      ) {
        return true;
      }
      return values.priceAfterDiscount < Number(values.price);
    },
    {
      message: 'priceAfterDiscount should be smaller than price',
      path: ['priceAfterDiscount'],
    }
  );
const updateProductSchema = z
  .object({
    title: z
      .string({ message: 'name should be string ' })
      .min(3, 'Too short Product name')
      .max(32, 'Too long Product name')
      .optional(),
    description: z
      .string({ message: 'description should be string ' })
      .min(3, 'Too short Product description')
      .max(500, 'Too long Product description')
      .optional(),
    quantity: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'quantity should be between 0 and 10000',
      })
      .optional(),
    sold: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'sold should be between 0 and 10000',
      })
      .optional(),
    price: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'price should be between 0 and 10000',
      })
      .optional(),
    priceAfterDiscount: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
        message: 'priceAfterDiscount should be between 0 and 10000',
      })
      .optional(),
    colors: z
      .array(
        z.union([optionSchema, z.string()]).transform((value) => {
          if (typeof value === 'object' && 'value' in value) {
            return String(value.value);
          }
          return value;
        })
      )
      .optional(),
    imageCover: z
      .union([z.string(), z.instanceof(File)])
      .refine(
        (value) => typeof value === 'string' || value.size <= MAX_FILE_SIZE,
        'Image must be less than 2MB'
      )
      .refine(
        (value) =>
          typeof value === 'string' ||
          ACCEPTED_IMAGE_TYPES.includes(value.type),
        'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      ),
    images: z
      .custom<FileList | string[] | undefined>(
        (value) =>
          value === undefined ||
          value instanceof FileList ||
          Array.isArray(value),
        {
          message: 'You should upload image files',
        }
      )
      .transform((fileList) => {
        if (!fileList) return undefined;
        if (fileList instanceof FileList) return Array.from(fileList);
        if (Array.isArray(fileList)) return fileList;
        return undefined;
      })
      .refine((files) => !files || files.length <= 5, {
        message: 'You can upload up to 5 files',
      })
      .refine(
        (files) =>
          !files ||
          files.every(
            (file) => typeof file === 'string' || file.size <= MAX_FILE_SIZE
          ),
        {
          message: 'Each image must be less than 2MB',
        }
      )
      .refine(
        (files) =>
          !files ||
          files.every(
            (file) =>
              typeof file === 'string' ||
              ACCEPTED_IMAGE_TYPES.includes(file.type)
          ),
        {
          message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
        }
      ),
    db_images: z.custom<string[] | undefined>(
      (value) => value === undefined || Array.isArray(value),
      {
        message: 'db_images should be url strings ',
      }
    ),
    category: z
      .union([optionSchema, z.string()], {
        message: 'category should be object or string  ',
      })
      .optional()
      .transform((value) => {
        if (typeof value === 'object' && 'value' in value) {
          return String(value.value);
        }
        return value;
      })
      .refine(
        (val) => val === undefined || /^[a-f\d]{24}$/i.test(val),
        'Invalid MongoDB ObjectId'
      ),
    brand: z
      .union([optionSchema, z.string()], {
        message: 'Brand should be object or string  ',
      })
      .optional()
      .transform((value) => {
        if (value === undefined) return undefined;
        if (typeof value === 'object' && 'value' in value) {
          return String(value.value);
        }
        return value;
      })
      .refine(
        (val) => val === undefined || /^[a-f\d]{24}$/i.test(val),
        'Invalid MongoDB ObjectId'
      ),
    subcategories: z
      .array(
        z
          .union([optionSchema, z.string()])
          .transform((value) => {
            if (typeof value === 'object' && 'value' in value) {
              return String(value.value);
            }
            return value;
          })
          .refine(
            (val) => /^[a-f\d]{24}$/i.test(val),
            'Invalid MongoDB ObjectId'
          )
      )
      .optional(),
  })
  .refine(
    (values) => {
      if (
        values.priceAfterDiscount === undefined ||
        values.price === undefined
      ) {
        return true;
      }
      return values.priceAfterDiscount < Number(values.price);
    },
    {
      message: 'priceAfterDiscount should be smaller than price',
      path: ['priceAfterDiscount'],
    }
  );

type TAddProduct = z.infer<typeof addProductSchema>;
type TUpdateProduct = z.infer<typeof updateProductSchema>;
export {
  addProductSchema,
  updateProductSchema,
  type TAddProduct,
  type TUpdateProduct,
};
