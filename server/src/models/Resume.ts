import mongoose, { Document, Schema } from 'mongoose';

// Resume ke andar kya kya hoga — TypeScript types
export interface IPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary: string;
}

export interface IExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface IEducation {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface ISkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  personalInfo: IPersonalInfo;
  experience: IExperience[];
  education: IEducation[];
  skills: ISkill[];
  template: 'modern' | 'classic' | 'minimal';

  // 🔥 NEW FIELDS
  publicSlug?: string;
  isPublic: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Resume ka title daalo'],
      default: 'Mera Resume',
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
      summary: { type: String, default: '' },
    },
    experience: [
      {
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
    ],
    education: [
      {
        school: { type: String, default: '' },
        degree: { type: String, default: '' },
        field: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        grade: { type: String, default: '' },
      },
    ],
    skills: [
      {
        name: { type: String, default: '' },
        level: {
          type: String,
          enum: ['beginner', 'intermediate', 'expert'],
          default: 'intermediate',
        },
      },
    ],
    template: {
      type: String,
      enum: ['modern', 'classic', 'minimal'],
      default: 'modern',
    },

    // 🔥 NEW: Public Resume Feature
    publicSlug: {
      type: String,
      unique: true,
      sparse: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResume>('Resume', ResumeSchema);