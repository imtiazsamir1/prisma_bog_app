
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;
}) => {
   

    return await prisma.comment.create({
        data: payload
    })

};






// 1. nijar comment delete korta parbe
// login thakte hobe
// tar nijar comment kina ata check korta hobe


// authorId, commentId, updatedData


export const CommentService = {
    createComment
  
}