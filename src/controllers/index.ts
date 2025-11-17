import { postRegister, postLogin } from "@/controllers/auth.controller";
import { getProfile, getProfileDetail, updateProfile } from "@/controllers/profile.controller";
import { getUsers, getRandomUsers, getUserByUsername } from "@/controllers/user.controller";
import { uploadFile, deleteFile } from "@/controllers/upload.controller";
import { follow, unfollow, getFollowers } from "@/controllers/follow.controller";

export {
  postRegister,
  postLogin,
  getProfile,
  getProfileDetail,
  getUsers,
  getRandomUsers,
  getUserByUsername,
  updateProfile,
  uploadFile,
  deleteFile,
  follow,
  unfollow,
  getFollowers
};