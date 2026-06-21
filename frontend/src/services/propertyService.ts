import api from "./api";

export const getProperties = async (city = "") => {
  const params = new URLSearchParams();
  if (city) params.append("city", city);
  const res = await api.get(`/properties${params.toString() ? `?${params}` : ""}`);
  return res.data;
};

export const createProperty=
async(
data:any
)=>{

const res=

await api.post(
"/properties",
data
);

return res.data;

};

export const getMine=
async()=>{

const res=
await api.get(
"/properties/mine"
);

return res.data;

};

export const deleteProperty=
async(
id:string
)=>{

await api.delete(

`/properties/${id}`

);

};

export const updateProperty=
async(
id:string,
data:any
)=>{

const res=

await api.put(

`/properties/${id}`,

data

);

return res.data;

};