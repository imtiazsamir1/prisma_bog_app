import { NextFunction, Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/client";
import paginationSortingHelper from "../../helper/paginationSortingHelper";
import { get } from "node:http";
import { UserRole } from "../../middleware/auth";

const createPost = async (req: Request, res: Response,next:NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await postService.createPost(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
   next(error)
  }
};



const getAllPost = async (req: Request, res: Response) => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const tags = typeof req.query.tags === "string" ? req.query.tags.split(",") : [];
    const isFeatured =
      req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined;
    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;

    


        const {page,limit,skip,sortBy,sortOrder}=paginationSortingHelper(req.query);
        // console.log("options:",options)

    // ✅ PASS explicit undefined for optional props
    const result = await postService.getAllPost({
      search,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getPostById = async (req: Request, res: Response) => {
  try {
    const {postId}=req.params;
    if(!postId){
        throw new Error("Post ID is required");
    }
    // const postId = req.params.id;
    // const result = await postService.getPostById(postId);
    const result=await postService.getPostById(postId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMyPost = async (req: Request, res: Response) => {
  try {
  
   const user= req.user;
   if(!user){
    return res.status(401).json({ message: "Unauthorized" });
   }
   console.log(user)
    const result=await postService.getMyPost(user.id );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "post fatched error" });
  }
};




const updatePost = async (req: Request, res: Response) => {
  try {
  
   const user= req.user;
   if(!user){
    return res.status(401).json({ message: "Unauthorized" });
   }
   const {postId}=req.params;
   const isAdmin= user.role===UserRole.ADMIN;
   console.log(user)
    const result=await postService.updatePost(postId as string,req.body,user.id,isAdmin );
    res.status(200).json(result);
  }  catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "post update failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};



const deletePost = async (req: Request, res: Response) => {
  try {
  
   const user= req.user;
   if(!user){
    return res.status(401).json({ message: "Unauthorized" });
   }
   const {postId}=req.params;
   const isAdmin= user.role===UserRole.ADMIN;
   console.log(user)
    const result=await postService.deletePost(postId as string,user.id,isAdmin );
    res.status(200).json(result);
  }  catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "post delete failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};



const getStats = async (req: Request, res: Response) => {
  try {
  
   
    const result=await postService.getStats( );
    res.status(200).json(result);
  }  catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Stats fatched  failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};





export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPost,
  updatePost,
  deletePost,
  getStats

};
