import { Routes, Route } from "react-router-dom";
import Store from "../pages/Store";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </>
  );
}
