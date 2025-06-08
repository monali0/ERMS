import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'engineer' | 'manager';
export type Seniority = 'junior' | 'mid' | 'senior';

export interface IUser extends Document {
  email: string;
  name: string;
  role: UserRole;
  skills?: string[];
  seniority?: Seniority;
  maxCapacity?: number;
  department?: string;
  password: string; 
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['engineer', 'manager'], required: true },

    skills: [{ type: String }],
    seniority: { type: String, enum: ['junior', 'mid', 'senior'] },
    maxCapacity: { type: Number },
    department: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
