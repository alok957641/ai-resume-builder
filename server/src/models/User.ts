import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// TypeScript ko batao User mein kya kya hoga
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  plan: 'free' | 'pro';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// MongoDB ko batao User ka structure
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Naam daalna zaroori hai'],
      trim: true,         // spaces hatao start/end se
    },
    email: {
      type: String,
      required: [true, 'Email daalna zaroori hai'],
      unique: true,       // ek email ek baar hi register ho
      lowercase: true,    // hamesha lowercase save karo
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password daalna zaroori hai'],
      minlength: [6, 'Password kam se kam 6 characters ka hona chahiye'],
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],  // sirf ye do values allowed
      default: 'free',         // default free plan
    },
  },
  {
    timestamps: true,   // createdAt, updatedAt automatically add hoga
  }
);

// Password save karne se PEHLE encrypt karo
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password check karne ka function
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);