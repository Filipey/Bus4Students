import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Home from "./pages/Home";

export function Router() {

    return (
        <>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<User />} path="/user" />
                <Route element={<Admin />} path="/admin" />
            </Routes>
        </>
    )
}