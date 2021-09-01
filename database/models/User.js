import mongoose, { Schema, model } from "mongoose";

const AccountSchema = new Schema({
  userId: String,
  name: String,
  currency: String,
  sum: Number,
});

const UserSchema = new Schema({
  id: String,
  accounts: [AccountSchema],
});

mongoose.models = {};

const User = model("User", UserSchema);

export default User;
