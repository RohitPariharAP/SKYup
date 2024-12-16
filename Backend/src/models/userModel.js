import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      requied: true,
      unique: true,
    },

    fullName: {
      type: String,
      requied: true,
    },

    password: {
      type: String,
      requied: true,
      minlength: 8,
      unique: true,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
