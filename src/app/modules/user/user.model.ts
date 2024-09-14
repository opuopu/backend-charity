/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser, UserModel, UserRole } from './user.interface';

// Define the schema for Verification
const VerificationSchema = new Schema({
  otp: {
    type: Number, // Allows string or number
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

// Define the schema for the User model
const nameSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
});

const UserSchema = new Schema({
  surName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  name: nameSchema,
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: {
    type: Date,
    required: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole), // Define UserRole options here
    required: true,
  },
  status: {
    type: String, // Add more specific structure if necessary
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  // phoneNo: {
  //   type: String,
  //   required: true,
  // },
  isActive: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  verification: VerificationSchema,
  countryCode: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash password if it is modified or new
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Check if a user exists by email
UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<TUser | null> {
  return this.findOne({ email });
};

// Check if a user exists by ID
UserSchema.statics.IsUserExistbyId = async function (
  id: string,
): Promise<TUser | null> {
  return this.findById(id);
};

// Compare plain text password with hashed password
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

// filter out deleted documents
UserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// Create and export the User model
const User = model<TUser, UserModel>('User', UserSchema);

export default User;
