import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Store from "../pages/Store"
import Products from "../pages/Products"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Product" element={<Products />} />
    </Routes>
  )
}