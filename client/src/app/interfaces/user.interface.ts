export interface IUser {
  _id: string;
  name: string;
  dob: Date;
  gender: 'male' | 'female' | 'others';
  bio?: string;
}