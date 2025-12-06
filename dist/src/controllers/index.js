import { postRegister, postLogin } from "@/controllers/auth.controller";
import { getProfile, getProfileDetail, updateProfile } from "@/controllers/profile.controller";
import { getUsers, getUsersRandom, getUserByUsername } from "@/controllers/user.controller";
import { uploadFile, deleteFile } from "@/controllers/upload.controller";
import { follow, unfollow, getFollowers } from "@/controllers/follow.controller";
import { postFeed, getAllFeeds, getFeedByUserId, getDetailFeedById, deleteFeedById } from "@/controllers/feed.controller";
export { postRegister, postLogin, getProfile, getProfileDetail, getUsers, getUsersRandom, getUserByUsername, updateProfile, uploadFile, deleteFile, follow, unfollow, getFollowers, postFeed, getAllFeeds, getFeedByUserId, getDetailFeedById, deleteFeedById };
