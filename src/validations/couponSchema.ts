import { z } from 'zod';

const applyCouponSchema = z.object({
  coupon: z.string(),
});
type TApplyCoupon = z.infer<typeof applyCouponSchema>;
export { applyCouponSchema, type TApplyCoupon };
