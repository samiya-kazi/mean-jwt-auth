import { Types } from "mongoose";
import UserLogin from "./userLogin.model";
import { IUserLogin } from "../../interfaces/userLogin.interface";

export const findUserLoginByUserId = async (userId: Types.ObjectId | string) => {
  try {
    const login = await UserLogin.findOne({ userId });
    return login;
  } catch (error) {
    console.log(error);
    throw new Error('Error finding user login by ID.');
  }
}

export const findUserLoginByEmail = async (email: string) => {
  try {
    const login = await UserLogin.findOne({ email });
    return login;
  } catch (error) {
    console.log(error);
    throw new Error('Error finding user login by email.');
  }
}

export const createNewUserLogin = async (data: IUserLogin) => {
  try {
    const newLogin = await UserLogin.create(data);
    return newLogin;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating new user login.');
  }
}

export const updateUserLogin = async (id: Types.ObjectId | string, data: Partial<IUserLogin>) => {
  try {
    const updatedLogin = await UserLogin.findByIdAndUpdate(id, { $set: data }, { new: true });
    return updatedLogin;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user login.');
  }
}

export const deleteUserLogin = async (id: Types.ObjectId | string) => {
  try {
    const deletedLogin = await UserLogin.findByIdAndDelete(id);
    return deletedLogin;
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting user login.');
  }
}