import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { Types } from "mongoose";
import { findUserById } from "../models/user/user.query";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeaders.split(" ")[1];

    const data = jwt.verify(token, config.JWT_SECRET) as { id: string | Types.ObjectId };

    if (data && data.id) {
      const user = await findUserById(data.id);
      if (user) {
        req.user = user;
        next();
      } else return res.status(401).json({ message: "Unauthorized" });
    } else return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}