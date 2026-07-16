import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true // always stored as a bcrypt hash, never as plain text
    },
    mobile: {
      type: String,
      trim: true
    },
    dob: {
      type: String
    }
  },
  {
    timestamps: true // createdAt (used as "member since" on the Account page) + updatedAt are added automatically
  }
);

export const User = mongoose.model('User', userSchema);
