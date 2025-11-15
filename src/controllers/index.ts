import { postRegister, postLogin } from "./auth/auth.controller";
import { getProfile } from "./profile/profile.controller";
import { getUsers, getUserByUsername} from "./user/user.controller";

export {
  postRegister,
  postLogin,
  getProfile,
  getUsers,
  getUserByUsername
};