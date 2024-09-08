/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApplication } from './application.interface';
import Application from './application.model';

const insertApplicationintoDb = async (payload: IApplication) => {
  const result = await Application.create(payload);
  return result;
};
const getAllApplication = async (query: Record<string, any>) => {
  const result = await Application.find(query).populate('applicant');
  return result;
};

const getsingleApplication = async (id: string) => {
  const result = await Application.findById(id).populate('applicant');
  return result;
};

const updateApplication = async (
  id: string,
  payload: Partial<IApplication>,
) => {
  const result = await Application.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('applicant');
  return result;
};

const deleteApplication = async (id: string) => {
  const result = await Application.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { new: true },
  );

  return result;
};

export const applicaitonServices = {
  insertApplicationintoDb,
  getAllApplication,
  getsingleApplication,
  updateApplication,
  deleteApplication,
};
