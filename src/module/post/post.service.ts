import { Payload, PostWhereInput } from './../../../generated/prisma/internal/prismaNamespace';

import { Post, PostStatus } from "../../../generated/prisma/client";
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

const getAllPost = async ({
  search,
   tags, 
   isFeatured,
   status,
   authorId,
   page,
    limit,
    skip
}:{search?:string |undefined,
  tags: string[]|[],
  isFeatured?:boolean|undefined,
  status:PostStatus |undefined,
authorId?:string |undefined,
page:number,
limit:number,
skip:number
}) => {
  
  
  
  const andCondition:PostWhereInput[]=[];
  if(search){
    andCondition.push( {OR:[
      {title: {
      contains: search as string ,
      mode: 'insensitive',
    }},
    {content: {
      contains:search as string ,
    mode: 'insensitive',
  }},
  {
    tags: {
      has: search as string ,
    }
  }
    ]},)
  }

  if(tags.length>0){
    andCondition.push({ tags:{
      hasEvery: tags as string[]
     }})
  }
  
if(typeof isFeatured ==='boolean'){
  andCondition.push({isFeatured:isFeatured})
}


if(status){
  andCondition.push({status:status})
}


if(authorId){
  andCondition.push({authorId:authorId})
}

   const allPost= await prisma.post.findMany({
take:limit,
skip:skip,

    where: {
     AND: andCondition
      }
    
   });
   return allPost;
}


export const postService = {
  createPost,
  getAllPost
};
