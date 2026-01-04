import { Payload } from './../../../generated/prisma/internal/prismaNamespace';

import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });

  return result;
};

const getAllPost = async (Payload:{search?:string |undefined}) => {
   const allPost= await prisma.post.findMany({
    where: {
      title: {
        contains: Payload.search as string ,
        mode: 'insensitive',
      }
      }
    
   });
   return allPost;
}


export const postService = {
  createPost,
  getAllPost
};
