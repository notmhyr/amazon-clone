import mongoose from "mongoose";
import validator from "validator";
import db from "../utils/db";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!typeof name === "string") {
    throw Error("name can't be number");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  await db.connect();

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(9);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });
  await db.disconnect();
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  await db.connect();

  const user = await this.findOne({ email });
  await db.disconnect();
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("password is not correct");
  }
  return user;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
