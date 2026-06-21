import {

createContext,

useContext,

useState

}

from "react";

import api
from "../services/api";

type User={

id: string;
username:string;
email:string;
phone?: string;
avatar?: string;

};

type Context={

user:User|null;

login:(
email:string,
password:string

)=>Promise<void>;

register:(

username:string,

email:string,

password:string

)=>Promise<void>;

logout:()=>void;

updateUser: (user: User) => void;

};

const AuthContext=

createContext<
Context
>(
{} as Context
);

export const AuthProvider=
({
children
}:any)=>{

const [

user,

setUser

]
=
useState<User|null>(

JSON.parse(

localStorage.getItem(
"user"
)

||

"null"

)

);

const register=
async(

username:string,

email:string,

password:string

)=>{

await api.post(

"/auth/register",

{

username,

email,

password

}

);

};

const login=
async(

email: any,

password: any

)=>{

const res=
await api.post(

"/auth/login",

{

email,

password

}

);

localStorage
.setItem(

"token",

res.data.token

);

localStorage.setItem(

"user",

JSON.stringify(
res.data.user
)

);

setUser(
res.data.user
);

};

const logout=
()=>{

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

setUser(
null
);

};

const updateUser = (newUser: User) => {
  localStorage.setItem("user", JSON.stringify(newUser));
  setUser(newUser);
};

return(

<AuthContext.Provider

value={

{

user,

login,

register,

logout,
updateUser

}

}

>

{

children

}

</AuthContext.Provider>

);

};

export const useAuth=
()=>

useContext(
AuthContext
);