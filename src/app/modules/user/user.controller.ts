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
  // Clone the query object from the request, but remove empty searchTerm early
  const { searchTerm, ...restQuery } = req.query;
  
  // Initialize query
  const query = { ...restQuery }; // Spread the rest of the query, excluding searchTerm

  if (searchTerm && searchTerm.trim() !== "") {
    // Add regex condition for `surName` and `email` if searchTerm is valid
    query.$or = [
      { surName: { $regex: searchTerm, $options: "i" } }, // Case-insensitive match
      { email: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // Exclude admin users
  query.role = { $ne: "admin" };

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
