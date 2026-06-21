import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import Profile from "../pages/Profile";
import CreateProperty from "../pages/CreateProperty";
import Navbar from "../components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import MyListings from "../pages/MyListings";

const AppRoutes = () => (

<BrowserRouter>

<Navbar/>

<Routes>

<Route
path="/"
element={<Properties/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>

<Route

path="/profile"

element={

<ProtectedRoute>

<Profile/>

</ProtectedRoute>

}

/>

<Route

path="/create"

element={

<ProtectedRoute>

<CreateProperty/>

</ProtectedRoute>

}

/>

<Route

path="/mine"

element={

<ProtectedRoute>

<MyListings/>

</ProtectedRoute>

}

/>

</Routes>

</BrowserRouter>

);

export default AppRoutes;