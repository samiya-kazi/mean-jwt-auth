import { Router } from 'express';
import { getAuthUser, login, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/auth/info', authMiddleware, getAuthUser);

export default userRouter;