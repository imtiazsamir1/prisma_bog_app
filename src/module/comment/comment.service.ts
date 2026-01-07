import { CommentStatus } from './../../../generated/prisma/enums';

import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;
}) => {
   await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    
    if (payload.parentId) {


        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        })
    }

    return await prisma.comment.create({
        data: payload
    })

};


const getCommentById =async (id:string) =>{
   return await prisma.comment.findUnique({
        where:{
            id:id
        },
        include:{   
            post:{
                select:{
                    id:true,
                    title:true,
                    views:true
                }
            }
        }
    })
};

const getCommentByAuthorId = async (authorId: string) => {
   return await prisma.comment.findMany({
        where:{
            authorId:authorId   
},
orderBy:{
    createdAt:'desc'},
include:{   
            post:{
                select:{
                    id:true,
                    title:true,
                    views:true
                }
            }
        }
    })
};


const deleteComment = async (commentId: string, authorId: string) => {
    const commentData= await prisma.comment.findFirst({
        where:{
            id:commentId,
            authorId:authorId
        },
        select:{
            id:true
        }
    })
    if(!commentData){
        throw new Error("You are not authorized to delete this comment");
    }
    const result= await prisma.comment.delete({
        where:{
            id:commentData.id
        }
    })
    return result;;
}


// 1. nijar comment delete korta parbe
// login thakte hobe
// tar nijar comment kina ata check korta hobe


// authorId, commentId, updatedData

const updateComment = async (commentId: string, authorId: string, data: { content?: string, status?: CommentStatus }) => {
    const commentData= await prisma.comment.findFirst({
        where:{
            id:commentId,
            authorId:authorId
        },
        select:{
            id:true
        }
    })  
      if(!commentData){
        throw new Error("You are not authorized to update this comment");
    } 
   return await prisma.comment.update({
  where: {
    id: commentData.id
  },
  data
});

           
}

//admin
const moderateComment= async (id: string, data:{status: CommentStatus}) => {
   const commentData= await prisma.comment.findUniqueOrThrow({
        where:{
            id:id
        },
        select:{
            id:true,
            status:true
        }
    })

     if(commentData.status === data.status){
    throw new Error(`Comment is already in status: ${data.status}`);
  }
   return await prisma.comment.update({
  where: {
    id: commentData.id
  },
  data
});
}


export const CommentService = {
    createComment,
    getCommentById,
    getCommentByAuthorId,
    deleteComment,
    updateComment,
    moderateComment
  
}