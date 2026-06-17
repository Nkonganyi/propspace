import Property
from "../models/Property.js";

export const createProperty =
(data)=>
Property.create(data);

export const getProperties =
(filters)=>{

 const query={};

 if(filters.city){

  query.city={
   $regex:filters.city,

   $options:"i"
  };

 }

 if(
  filters.minPrice ||

  filters.maxPrice
 ){

 query.price={};

 if(filters.minPrice){

 query.price.$gte=
 Number(
  filters.minPrice
 );

 }

 if(filters.maxPrice){

 query.price.$lte=
 Number(
  filters.maxPrice
 );

 }

 }

 return Property
 .find(query)
 .populate(
  "owner",
  "username email"
 );

};

export const getUserProperties =
(userId)=>
Property.find({
owner:userId
});

export const getPropertyById =
(id)=>
Property.findById(id);

export const updateProperty =
(
id,
data
)=>
Property.findByIdAndUpdate(
id,
data,
{
new:true
}
);

export const deleteProperty =
(id)=>
Property.findByIdAndDelete(
id
);