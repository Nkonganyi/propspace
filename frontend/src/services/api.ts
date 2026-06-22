import axios from "axios";

const api =
axios.create({

baseURL:
"http://localhost:5000/api"

});

api.interceptors.request.use(

(config)=>{

const token=

localStorage.getItem(
"token"
);

if(token){

config.headers.Authorization=

`Bearer ${token}`;

}

return config;

}

);

// Global response interceptor: if the server rejects a request with 401
// while we believed we had a valid session (a token was set), the session
// has expired or the token is no longer valid. Clear it and send the user
// back to the login screen automatically, instead of leaving the app stuck
// behind failed requests. This does not fire for ordinary failed login
// attempts, since no token exists in storage at that point.
api.interceptors.response.use(

(response)=>response,

(error)=>{

const hadToken = !!localStorage.getItem("token");

if(error.response?.status === 401 && hadToken){

localStorage.removeItem("token");
localStorage.removeItem("user");

if(window.location.pathname !== "/login"){
window.location.assign("/login");
}

}

return Promise.reject(error);

}

);

export default api;