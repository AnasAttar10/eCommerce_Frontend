import { z } from 'zod';

const verifyCodeSchema = z.object({
  resetCode: z.string().length(6, 'the code should be 6 digits'),
});
type TVerifyCode = z.infer<typeof verifyCodeSchema>;
export { verifyCodeSchema, type TVerifyCode };
