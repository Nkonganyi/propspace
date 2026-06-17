import { addProperty, allProperties, myProperties } from "../services/propertyService.js";
import { editProperty, removeProperty } from "../services/propertyService.js";

export const createListing = async( req, res )=>{

 try{
 const property = await addProperty( req.body, req.user._id );

 res.status(201).json( property );

 }

 catch(err){

 res.status(400).json({
  error:
  err.message
 });

 }

};

export const getListings =
async(
req,
res
)=>{

const data =
await allProperties(

req.query

);

res.json(
data
);

};

export const getMine =
async(
 req,
 res
)=>{

 const data =
 await myProperties(
  req.user._id
 );

 res
 .json(
  data
 );

};

export const updateListing =
async(
req,
res
)=>{

try{

const result =
await editProperty(

req.params.id,

req.body,

req.user._id

);

res.json(
result
);

}

catch(err){

res
.status(
err.message==="Forbidden"
?403
:404
)
.json({
error:
err.message
});

}

};

export const deleteListing =
async(
req,
res
)=>{

try{

await removeProperty(

req.params.id,

req.user._id

);

res.json({

message:
"Deleted"

});

}

catch(err){

res
.status(
err.message==="Forbidden"
?403
:404
)
.json({
error:
err.message
});

}

};