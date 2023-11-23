import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

type Decoded = {
  email: string;
  id: string;
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
  
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as Decoded;
  
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      }
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        status: "unsuccessful",
        message: error.message,
      });
    }
  };