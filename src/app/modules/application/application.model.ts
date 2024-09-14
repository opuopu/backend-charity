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
  degree: { type: String },
  discipline: { type: String },
  university: { type: String },
  commenced: { type: Date },
  completed: { type: Date },
  overallMark: { type: Number },
  overallGPA: { type: Number },
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
  degree: { type: String },
  discipline: { type: String },
  university: { type: String },
  plannedStart: { type: Date },
  duration: { type: Date },
  tuitionFee: { type: Number },
  alreadyApplied: { type: Boolean },
  australianVisaApplied: { type: Boolean },
  australianVisaGranted: { type: Boolean },
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
