import { Types } from "mongoose";

export interface IUserLogin {
  userId: Types.ObjectId;
  email: string;
  password: string;
}