/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApplication } from './application.interface';
import Application from './application.model';

const insertApplicationintoDb = async (payload: IApplication) => {
  const result = await Application.create(payload);
  return result;
};
const getAllApplication = async (query: Record<string, any>) => {
  const pipeline: any[] = [];

  // Add the initial match stage if there are other query filters
  const { searchTerm, ...otherQuery } = query;
  if (Object.keys(otherQuery).length > 0) {
    pipeline.push({ $match: otherQuery });
  }

  // Perform lookup to populate 'applicant'
  pipeline.push({
    $lookup: {
      from: 'users', // Replace with your actual applicant collection name
      localField: 'applicant',
      foreignField: '_id',
      as: 'applicant',
    },
  });

  // Unwind the applicant array
  pipeline.push({ $unwind: '$applicant' });

  // Apply regex search if searchTerm is provided
  if (searchTerm) {
    pipeline.push({
      $match: {
        $or: [
          { 'applicant.surName': { $regex: searchTerm, $options: 'i' } },
          { 'applicant.email': { $regex: searchTerm, $options: 'i' } },
        ],
      },
    });
  }

  console.log('Aggregation Pipeline:', pipeline);

  // Execute the aggregation pipeline
  const result = await Application.aggregate(pipeline);
  console.log('Aggregation Result:', result);

  return result;
};

const getsingleApplication = async (id: string) => {
  const result = await Application.findById(id).populate('applicant');
  return result;
};
const getMyApplications = async (id: string) => {
  const result = await Application.find({ applicant: id }).populate(
    'applicant',
  );
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
  getMyApplications,
};
