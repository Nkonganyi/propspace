import bcrypt from "bcryptjs";
import { findById, findByUsername, updateProfile, updatePassword } from "../repositories/userRepository.js";

export const updateUserProfile = async (userId, data) => {
  const { username, phone, avatar } = data;

  if (username) {
    const existing = await findByUsername(username);
    if (existing && existing._id.toString() !== userId.toString()) {
      throw new Error("Username is already taken");
    }
  }

  try {
    return await updateProfile(userId, { username, phone, avatar });
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Username is already taken");
    }
    throw err;
  }
};

export const updateUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!newPassword || newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters");
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    throw new Error("Invalid old password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return updatePassword(userId, hashedPassword);
};
