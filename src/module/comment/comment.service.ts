
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


const getCommentById =async (commentId:string) =>{
    console.log("Comment Id:", commentId)
}




// 1. nijar comment delete korta parbe
// login thakte hobe
// tar nijar comment kina ata check korta hobe


// authorId, commentId, updatedData


export const CommentService = {
    createComment
  
}