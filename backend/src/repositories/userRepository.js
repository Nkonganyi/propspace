import User from "../models/User.js";

export const findByEmail =
(email)=>{
 return User.findOne({
   email
 });
};

export const findByUsername =
(username)=>{
 return User.findOne({
   username
 });
};

export const createUser =
(data)=>{
 return User.create(
   data
 );
};

export const findById =
(id)=>{
 return User.findById(
   id
 );
};

export const updateProfile =
(id, data)=>{
 return User.findByIdAndUpdate(
   id,
   data,
   { new: true }
 ).select("-password");
};

export const updatePassword =
(id, password)=>{
 return User.findByIdAndUpdate(
   id,
   { password },
   { new: true }
 ).select("-password");
};