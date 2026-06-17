import { createProperty, getProperties, getUserProperties, getPropertyById, updateProperty, deleteProperty } from "../repositories/propertyRepository.js";

export const addProperty =
(
data,
userId
)=>

createProperty({
...data,
owner:userId
});

export const allProperties =
(
filters
)=>
getProperties(
filters
);

export const myProperties =
(
userId
)=>
getUserProperties(
userId
);

export const editProperty =
async(
id,
data,
userId
)=>{

const property =
await getPropertyById(
id
);

if(!property){

throw new Error(
"Property not found"
);

}

if(
property.owner.toString()
!== userId.toString()
){

throw new Error(
"Forbidden"
);

}

return updateProperty(
id,
data
);

};

export const removeProperty =
async(
id,
userId
)=>{

const property =
await getPropertyById(
id
);

if(!property){

throw new Error(
"Property not found"
);

}

if(
property.owner.toString()
!== userId.toString()
){

throw new Error(
"Forbidden"
);

}

await deleteProperty(
id
);

return;

};