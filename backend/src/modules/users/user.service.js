
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user.model.js";

const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export { registerUser, loginUser };
