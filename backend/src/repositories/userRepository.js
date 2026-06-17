import User from "../models/User.js";

export const findByEmail =
(email)=>{
 return User.findOne({
   email
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