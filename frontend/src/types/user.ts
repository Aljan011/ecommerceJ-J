export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  loginMethod: string;
  userType: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
