
import express, { NextFunction, Request, Response, Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";


const router = express.Router();


// Routes

router.get(
    "/",
    postController.getAllPost

)

router.get(
    "/my-post",
    auth(UserRole.ADMIN, UserRole.USER),
    postController.getMyPost

)

router.get(
  "/:postId",
  postController.getPostById
);



router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  postController.createPost
);

router.patch(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postController.updatePost
);

router.delete(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postController.deletePost
);

export const postRouter: Router = router;
