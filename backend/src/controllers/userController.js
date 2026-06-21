import { updateUserProfile, updateUserPassword } from "../services/userService.js";

export const getProfile =
async(
 req,
 res
)=>{

 res
 .status(200)
 .json(
   req.user
 );

};

export const updateProfile =
async(
 req,
 res
)=>{

 try{
 
  const updated = await updateUserProfile(
    req.user._id,
    req.body
  );
  
  res.status(200).json(updated);
  
 }
 
 catch(err){
  res.status(400).json({
    error: err.message
  });
 }

};

export const changePassword =
async(
 req,
 res
)=>{

 try{
 
  await updateUserPassword(
    req.user._id,
    req.body.oldPassword,
    req.body.newPassword
  );
  
  res.status(200).json({
    message: "Password updated"
  });
  
 }
 
 catch(err){
  res.status(400).json({
    error: err.message
  });
 }

};