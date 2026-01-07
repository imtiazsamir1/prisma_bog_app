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
const getCommentById = async (req: Request, res: Response) => {
  

  try {
   const {commentId}= req.params;
    const result = await CommentService.getCommentById(commentId as string);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "comment fatched faild " });
  }
};

 const getCommentByAuthorId = async (req: Request, res: Response) => {
  

  try {
   const {authorId}= req.params;
    const result = await CommentService.getCommentByAuthorId(authorId as string);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "comment fatched faild " });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
   
const user=req.user;
const {commentId}= req.params;
    const result = await CommentService.deleteComment(commentId as string, user?.id as string);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "comment delete faild " });
  }
};


const updateComment = async (req: Request, res: Response) => {
  try {
   
const user=req.user;
const {commentId}= req.params;
    const result = await CommentService.updateComment( commentId as string,
  user?.id as string,
  req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "comment update faild " });
  }
};



const moderateComment = async (req: Request, res: Response) => {
  try {
    const {commentId}= req.params;
    const result = await CommentService.moderateComment( commentId as string,
  req.body);
    res.status(200).json(result);
  } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Comment update failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};



export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment,
 moderateComment
};