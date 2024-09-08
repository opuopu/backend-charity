import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { storeFile, uploadToS3 } from '../../utils/fileHelper';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
const insertCustomerIntoDb = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    const image = await uploadToS3(req?.file, 'profile/');
    console.log(image);
  }
  console.log(req.file, req.body);
  // const result = await userServices.insertCustomerIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: {},
  });
});
const insertVendorIntoDb = catchAsync(async (req: Request, res: Response) => {
  req.body.role = 'vendor';
  const result = await userServices.insertVendorIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'vendor created successfully',
    data: result,
  });
});

const getme = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getme(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user retrived successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.image = storeFile('profile', req?.file?.filename);
  }
  console.log(req.body);
  const result = await userServices.updateProfile(req.user.userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user profile updated successfully',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllusers(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'users retrived successfully',
    data: result?.data,
    meta: result?.meta,
  });
});
const getsingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getSingleUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrived successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.image = storeFile('profile', req?.file?.filename);
  }
  console.log(req.body);
  const result = await userServices.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});
const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body, 'DD');
  const result = await userServices.deleteAccount(
    req?.user?.userId,
    req?.body?.password,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userControllers = {
  insertCustomerIntoDb,
  insertVendorIntoDb,
  getme,
  updateProfile,
  getAllUsers,
  getsingleUser,
  updateUser,
  deleteAccount,
};
