import { Schema, model } from 'mongoose';
import { IUser } from '../../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true
  },
  bio: {
    type: String
  }
});

const User = model('user', userSchema);

export default User;