import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

import { TUser } from './user.interface';
import User from './user.model';
// create user

const insertUserIntodb = async (payload: TUser) => {
  // check  if same user exist
  const isExist = await User.isUserExist(payload?.email as string);
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User already exist with this email!',
    );
  }
  const result = await User.create(payload);
  return result;
};

const getme = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const deleteAccount = async (id: string, password: string) => {
  console.log(id);
  const user = await User.IsUserExistbyId(id);
  console.log(user);
  const isPasswordMatched = await bcrypt.compare(password, user?.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password does not match!');
  }
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    {
      new: true,
    },
  );
  return result;
};

export const userServices = {
  insertUserIntodb,
  getme,
  getSingleUser,
  deleteAccount,
  updateUser,
};
