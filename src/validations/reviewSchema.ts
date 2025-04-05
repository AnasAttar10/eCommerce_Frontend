import { z } from 'zod';

const reviewSchema = z.object({
  title: z.string({ message: 'comment should be string ' }),
  ratings: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num) && num >= 0 && num <= 5, {
      message: 'ratings should be between 0 and 5',
    }),
});
const updateReviewSchema = z.object({
  title: z.string({ message: 'comment should be string ' }).optional(),
  ratings: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num) && num >= 0 && num <= 5, {
      message: 'ratings should be between 0 and 5',
    })
    .optional(),
});
type TAddReview = z.infer<typeof reviewSchema>;
type TUpdateReview = z.infer<typeof updateReviewSchema>;
export {
  reviewSchema,
  updateReviewSchema,
  type TAddReview,
  type TUpdateReview,
};
