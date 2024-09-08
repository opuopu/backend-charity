import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { applicaitonServices } from './application.service';

const insertApplicationintoDb = catchAsync(
  async (req: Request, res: Response) => {
    const result = await applicaitonServices.insertApplicationintoDb({
      ...req.body,
      applicant: req.user.userId,
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Applicaiton submitted successfully !!',
      data: result,
    });
  },
);
const getAllApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await applicaitonServices.getAllApplication(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applicaitons retrived successfully !!',
    data: result,
  });
});
const getsingleApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await applicaitonServices.getsingleApplication(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applicaitons retrived successfully !!',
    data: result,
  });
});
const updateApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await applicaitonServices.updateApplication(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applicaiton updated successfully !!',
    data: result,
  });
});
const deleteApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await applicaitonServices.deleteApplication(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applicaiton deleted successfully !!',
    data: result,
  });
});

export const applicationControllers = {
  insertApplicationintoDb,
  getAllApplication,
  getsingleApplication,
  updateApplication,
  deleteApplication,
};
