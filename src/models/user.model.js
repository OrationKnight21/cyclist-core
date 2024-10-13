import mongoose from "mongoose";
import bcrypt from "bcrypt";

// basic user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password_hash")) {
    this.password_hash = await bcrypt.hash(this.password_hash, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password_hash;
  delete user._id;
  delete user.__v;
  return user;
};

export default mongoose.model("User", userSchema);
