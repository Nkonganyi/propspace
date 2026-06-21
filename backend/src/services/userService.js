import bcrypt from "bcryptjs";
import { findById, updateProfile, updatePassword } from "../repositories/userRepository.js";

export const updateUserProfile = async (userId, data) => {
  const { username, phone, avatar } = data;
  return updateProfile(userId, { username, phone, avatar });
};

export const updateUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await findById(userId);
  
  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(oldPassword, user.password);
  
  if (!match) {
    throw new Error("Invalid old password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return updatePassword(userId, hashedPassword);
};
