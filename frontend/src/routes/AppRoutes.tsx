import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import Profile from "../pages/Profile";

const AppRoutes=()=>(

<BrowserRouter>

<Routes>

<Route
path="/"
element={
<Properties/>
}
/>

<Route
path="/login"
element={
<Login/>
}
/>

<Route
path="/register"
element={
<Register/>
}
/>

<Route
path="/dashboard"
element={
<Dashboard/>
}
/>

<Route
path="/profile"
element={
<Profile/>
}
/>

</Routes>

</BrowserRouter>

);

export default AppRoutes;