import { ObjectId } from 'mongoose';
import { status } from './application.constant';

export interface IQualification {
  degreeLevel: string;
  degree: string;
  discipline: string;
  university: string;
  commenced: Date;
  completed: Date;
  overallMark: number;
  overallGPA: number;
}

export interface IEnglishProficiency {
  testName: string;
  overall: number;
  listening: number;
  reading: number;
  speaking: number;
  writing: number;
  testDate: Date;
}

export interface IPostGraduateStudy {
  degree: string;

  discipline: string;
  university: string;
  plannedStart: Date;
  duration: number;
  isAlreadyApplied: boolean;
  isAustralianVisaApplied: boolean;
  isAustralianVisaGranted: boolean;
}

export interface IApplication {
  dateOfBirth: Date;
  homeAddress: string;
  citizenship: string;
  qualifications: IQualification[];
  englishProficiency: IEnglishProficiency;
  intendedPostGraduateStudies: IPostGraduateStudy[];
  status: status;
  applicant: ObjectId;
  isDeleted: boolean;
}
