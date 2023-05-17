import { Navigate, Outlet } from "react-router-dom"
import { AdminNavBar } from "../components/nav/AdminNav"
import { NavBar } from "../components/nav/NavBar"

export const Authorized = ({ token }) => {
  if (token) {
    <NavBar /> 
    return <>
     <Outlet />
     </>
  }
  return <Navigate to='/login' replace />
}
