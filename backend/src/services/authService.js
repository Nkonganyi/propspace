import bcrypt from "bcryptjs";
import { findByEmail, findByUsername, createUser } from "../repositories/userRepository.js";
import generateToken from "../utils/generateToken.js";

export const register = async(data)=>{
 const { username, email, password } = data;

 if(!username || !email || !password){

   throw new Error(
     "Username, email and password are required"
   );

 }

 if(password.length < 6){

   throw new Error(
     "Password must be at least 6 characters"
   );

 }

 const emailTaken =
 await findByEmail(
   email
 );

 if(emailTaken){

   throw new Error(
     "User already exists"
   );

 }

 const usernameTaken =
 await findByUsername(
   username
 );

 if(usernameTaken){

   throw new Error(
     "Username is already taken"
   );

 }

 const hashed =
 await bcrypt.hash(
   password,
   10
 );

 const user = await createUser({
   username,
   email,
   password:hashed
 });

 // Never return the password hash to the client.
 return {
   id:user._id,
   username:user.username,
   email:user.email,
   phone:user.phone,
   avatar:user.avatar
 };

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
     email:user.email,
     phone:user.phone,
     avatar:user.avatar
   }

 };

};