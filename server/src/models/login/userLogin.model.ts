import { Schema, model } from 'mongoose';
import { IUserLogin } from '../../interfaces/userLogin.interface';

const userLoginSchema = new Schema<IUserLogin>({
  userId: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserLogin = model('user-login', userLoginSchema);

export default UserLogin;