import express from "express";
import { deleteUser, followUser, getAllUser, getUser, unfollowUser, updateUser } from "../Controllers/UserController.js";
// import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.put('/:id/follow',followUser);
router.put('/:id/unfollow',unfollowUser);

export default router