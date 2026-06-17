import mongoose from "mongoose";

const propertySchema =
new mongoose.Schema(
{
 title:{
  type:String,
  required:true
 },

 description:{
  type:String,
  required:true
 },

 price:{
  type:Number,
  required:true
 },

 city:{
  type:String,
  required:true
 },

 country:{
  type:String,
  required:true
 },

 propertyType:{
  type:String,
  enum:[
   "Apartment",
   "House",
   "Studio"
  ],
  required:true
 },

 images:[
  String
 ],

 owner:{
  type:
   mongoose.Schema.Types.ObjectId,

  ref:"User",

  required:true
 }

},
{
 timestamps:true
}
);

export default mongoose.model(
 "Property",
 propertySchema
);