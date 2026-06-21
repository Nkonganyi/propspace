export type Property={

_id:string;

title:string;

description:string;

price:number;

city:string;

country:string;

propertyType:string;

images:string[];

owner?:{

username:string;

email:string;

};

};