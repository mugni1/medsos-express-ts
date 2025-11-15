import { postRegister, postLogin } from "./auth/auth.controller";
import { getProfile, updateProfile } from "./profile/profile.controller";
import { getUsers, getUserByUsername } from "./user/user.controller";
import { uploadFile, deleteFile } from "./upload/upload.controller";

export {
  postRegister,
  postLogin,
  getProfile,
  getUsers,
  getUserByUsername,
  updateProfile,
  uploadFile,
  deleteFile
};