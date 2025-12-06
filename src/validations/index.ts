import { registerSchema, loginSchema } from "../validations/auth.validate";
import { updateProfileSchema } from "../validations/profile.validate";
import { postFeedSchema } from "../validations/feed.validate";

export {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  postFeedSchema
}