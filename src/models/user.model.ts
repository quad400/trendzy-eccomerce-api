import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  email: string;
  password: string;
  profilePicture: string;
  role: string
  comparePassword: (enteredPassword: string) => Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
    },
    password: {type: String},
    profilePicture: {type: String, default: null},
    role: {type: String, default: "user"}
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<Boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  let user = this as unknown as UserDocument;

  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
