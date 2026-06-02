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
      required: [true, 'Name is Required '],
      trim: true,         
    },
    email: {
      type: String,
      required: [true, 'Email  is Required '],
      unique: true,      
      lowercase: true,    
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: [6, 'Password min  to 6 charecter'],
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],  
      default: 'free',         
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