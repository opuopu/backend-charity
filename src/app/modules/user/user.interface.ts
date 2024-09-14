/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
export enum UserRole {
  admin = 'admin',
  applicant = 'applicant',
}
export enum status {
  pending = 'pending',
  active = 'active',
  blocked = 'blocked',
}
interface Verification {
  otp: string | number;
  expiresAt: Date;
  status: boolean;
}
interface name {
  firstName: string;
  middleName: string;
}
export interface TUser {
  surName: string;
  [x: string]: any;
  email?: string;
  name: name;
  password: string;
  phoneNumber: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: UserRole;
  status?: status;
  isVerified: boolean;
  // phoneNo: string;
  isActive: boolean;
  isDeleted: boolean;
  verification: Verification;
  countryCode: string;
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  IsUserExistbyId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
