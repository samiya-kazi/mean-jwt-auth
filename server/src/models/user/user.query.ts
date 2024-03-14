import { Types } from "mongoose";
import User from "./user.model";
import { IUser } from "../../interfaces/user.interface";

export const findUserById = async (id: Types.ObjectId | string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error finding user by ID.');
  }
}

export const createNewUser = async (data: IUser) => {
  try {
    const newUser = await User.create(data);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating new user.');
  }
}

export const updateUser = async (id: Types.ObjectId | string, data: Partial<IUser>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: data }, { new: true });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user info.');
  }
}

export const deleteUser = async (id: Types.ObjectId | string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting user info.');
  }
}