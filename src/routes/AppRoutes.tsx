import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Store from "../pages/Store"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/Store" element={<Store />} />
    </Routes>
  )
}