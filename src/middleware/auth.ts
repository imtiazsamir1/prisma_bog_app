import { auth as betterAuth } from "../lib/auth";
import { NextFunction, Request, Response } from "express";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!session.user.emailVerified) {
        return res
          .status(403)
          .json({ message: "Please verify your email to proceed" });
      }

      // Role check
      if (roles.length && !roles.includes(session.user.role as UserRole)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name!,
        role: session.user.role as UserRole,
        emailVerified: session.user.emailVerified,
      };

      next(); // ✅ IMPORTANT
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ message: "Authentication failed" });
    }
  };
};
export default auth;