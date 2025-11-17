import { postRegister, postLogin } from "./auth/auth.controller";
import { getProfile, getProfileDetail, updateProfile } from "./profile/profile.controller";
import { getUsers, getUserByUsername } from "./user/user.controller";
import { uploadFile, deleteFile } from "./upload/upload.controller";
import { follow, unfollow, getFollowers } from "./follow/follow.controller";

export {
  postRegister,
  postLogin,
  getProfile,
  getProfileDetail,
  getUsers,
  getUserByUsername,
  updateProfile,
  uploadFile,
  deleteFile,
  follow,
  unfollow,
  getFollowers
};