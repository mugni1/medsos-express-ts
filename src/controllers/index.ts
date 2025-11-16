import { postRegister, postLogin } from "./auth/auth.controller";
import { getProfile, updateProfile, getDetailProfile } from "./profile/profile.controller";
import { getUsers, getUserByUsername } from "./user/user.controller";
import { uploadFile, deleteFile } from "./upload/upload.controller";
import { follow, unfollow } from "./follow/follow.controller";

export {
  postRegister,
  postLogin,
  getProfile,
  getUsers,
  getUserByUsername,
  updateProfile,
  uploadFile,
  deleteFile,
  getDetailProfile,
  follow,
  unfollow
};