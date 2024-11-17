import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
const insertUserIntodb = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.insertUserIntodb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getme = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getme(req.user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile information retrived successfully',
    data: result,
  });
});
const getAllusers = catchAsync(async (req: Request, res: Response) => {
  // Clone the query object from the request
  const query = { ...req.query };

  if (req?.query?.searchTerm && req?.query?.searcthTerm.trim() !=="") {
    const searchTerm = req.query.searchTerm as string;
  
    // Check if searchTerm is not an empty string
    if (searchTerm.trim() !== "") {
      // Add regex condition for `surName` and `email`
      query.$or = [
        { surName: { $regex: searchTerm, $options: "i" } }, // Case-insensitive match
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }
  }
  

  // Exclude admin users
  query["role"] = { $ne: "admin" };

  // Pass the modified query to the service layer
  const result = await userServices.getAllusers(query);

  // Send the response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
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
  const result = await userServices.updateUser(
    req?.params?.id ?? req.user.userId,
    req.body,
  );
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
  insertUserIntodb,
  getAllusers,
  getme,
  getsingleUser,
  deleteAccount,
  updateUser,
};
