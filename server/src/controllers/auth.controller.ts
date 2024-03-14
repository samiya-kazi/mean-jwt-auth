import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateLogin, validateRegsitration } from "../utils/validate.helper";
import { createNewUserLogin, findUserLoginByEmail } from "../models/login/userLogin.query";
import { createNewUser, findUserById } from "../models/user/user.query";
import config from "../config";
import { AuthRequest } from "../interfaces/authRequest.interface";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (validateLogin({ email, password })) {
      const login = await findUserLoginByEmail(email);
      if (login) {
        const user = await findUserById(login.userId);
        if (user) {
          if (bcrypt.compareSync(password, login.password)) {
            const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
            res.setHeader('Authorization', 'Bearer ' + token);
            res.status(200).json(user);
          } else return res.status(401).json({ message: 'Password does not match.' });
        } else return res.status(404).json({ message: 'User does not exist.' })
      } else return res.status(404).json({ message: 'No account has been created with this email.' });
    } else return res.status(400).json({ message: 'Invalid body data.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, dob, gender } = req.body;
    if (validateRegsitration({ email, password, name, dob: new Date(dob), gender })) {
      const login = await findUserLoginByEmail(email);
      if (!login) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await createNewUser({ name, dob, gender });
        await createNewUserLogin({ userId: newUser._id, email, password: hashedPassword });

        return res.status(201).json(newUser);
      } else return res.status(400).json({ message: 'An account has already been created with this email.' });
    } else return res.status(400).json({ message: 'Invalid body data.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export const getAuthUser = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    if (!user) return res.status(401).json({ message: 'Unauthorzed.' });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}