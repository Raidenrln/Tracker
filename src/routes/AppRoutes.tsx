import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Store from "../pages/Store";
import Products from "../pages/Products";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/Product" element={<Products />} />
      </Routes>
    </>
  );
}
