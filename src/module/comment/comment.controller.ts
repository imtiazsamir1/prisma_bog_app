import { Request, Response } from "express";
import { CommentService } from "./comment.service";



const createComment = async (req: Request, res: Response) => {
  

  try {
    const user =req.user;
    req.body.authorId = user?.id;
    const result = await CommentService.createComment(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "comment creation faild " });
  }
};
export const commentController = {
  createComment,
};