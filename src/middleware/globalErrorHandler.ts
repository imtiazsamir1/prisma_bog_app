import { NextFunction, Request, Response } from "express";

import { Prisma } from "../../generated/prisma/client";

function errorHandler (err: any, req: Request, res: Response, next: NextFunction) {
 

    let stutasCode=500;
    let errorMessage= "Internal Server Error";
    let errorDetails= err;

//PrismaClientValidationError
    if (err instanceof Prisma.PrismaClientValidationError) {
        stutasCode=400;
        errorMessage="you provide incorrect field type or missing filed";
       
       
    }

    res.status(stutasCode);
    res.json({
        message: errorMessage,
            error: errorDetails,
        // stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}
export default errorHandler;