import bcrypt from "bcryptjs";
import { findByEmail, createUser } from "../repositories/userRepository.js";
import generateToken from "../utils/generateToken.js";

export const register = async(data)=>{
 const { username, email, password } = data;

 const exists =
 await findByEmail(
   email
 );

 if(exists){

   throw new Error(
     "User already exists"
   );

 }

 const hashed =
 await bcrypt.hash(
   password,
   10
 );

 return createUser({
   username,
   email,
   password:hashed
 });

};

export const login = async(data)=>{

 const {
   email,
   password
 } = data;

 const user =
 await findByEmail(
   email
 );

 if(!user){

   throw new Error(
     "Invalid credentials"
   );

 }

 const match =
 await bcrypt.compare(
   password,
   user.password
 );

 if(!match){

   throw new Error(
     "Invalid credentials"
   );

 }

 const token =
 generateToken(
   user._id
 );

 return {

   token,

   user:{
     id:user._id,
     username:user.username,
     email:user.email
   }

 };

};