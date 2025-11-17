import { postRegister, postLogin } from "@/controllers/auth.controller";
import { getProfile, getProfileDetail, updateProfile } from "@/controllers/profile.controller";
import { getUsers, getUserByUsername } from "@/controllers/user.controller";
import { uploadFile, deleteFile } from "@/controllers/upload.controller";
import { follow, unfollow, getFollowers } from "@/controllers/follow.controller";

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