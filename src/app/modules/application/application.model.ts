import mongoose, { Schema } from 'mongoose';
import { status } from './application.constant';
import {
  IApplication,
  IEnglishProficiency,
  IPostGraduateStudy,
  IQualification,
} from './application.interface';

// Qualification Schema
const qualificationSchema = new Schema<IQualification>({
  degreeLevel: { type: String },
  degree: { type: String, required: true },
  discipline: { type: String, required: true },
  university: { type: String, required: true },
  commenced: { type: Date, required: true },
  completed: { type: Date, required: true },
  overallMark: { type: Number, required: true },
  overallGPA: { type: Number, required: true },
});

// English Proficiency Schema
const englishProficiencySchema = new Schema<IEnglishProficiency>({
  testName: { type: String, required: true },
  overall: { type: Number, required: true },
  listening: { type: Number, required: true },
  reading: { type: Number, required: true },
  speaking: { type: Number, required: true },
  writing: { type: Number, required: true },
  testDate: { type: Date, required: true },
});

// Post Graduate Study Schema
const postGraduateStudySchema = new Schema<IPostGraduateStudy>({
  degree: { type: String, required: true },
  discipline: { type: String, required: true },
  university: { type: String, required: true },
  plannedStart: { type: Date, required: true },
  duration: { type: Number, required: true },
  isAlreadyApplied: { type: Boolean, required: true },
  isAustralianVisaApplied: { type: Boolean, required: true },
  isAustralianVisaGranted: { type: Boolean, required: true },
});

// Main Application Schema
const applicationSchema = new Schema<IApplication>(
  {
    dateOfBirth: { type: Date, required: true },
    homeAddress: { type: String, required: true },
    citizenship: { type: String, required: true },
    qualifications: [qualificationSchema],
    englishProficiency: englishProficiencySchema,
    intendedPostGraduateStudies: [postGraduateStudySchema],
    applicant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(status) as string[],
      default: status.pending,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
