export interface IUser {
  name: string;
  dob: Date;
  gender: 'male' | 'female' | 'others';
  bio?: string;
}