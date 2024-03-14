import { Request } from "express";
import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface AuthRequest extends Request {
  user?: IUser & { _id: Types.ObjectId }
}