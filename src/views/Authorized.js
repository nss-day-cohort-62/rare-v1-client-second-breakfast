import { Navigate, Outlet } from "react-router-dom"
import { AdminNavBar } from "../components/nav/AdminNav"
import { NavBar } from "../components/nav/NavBar"
import { isStaff } from "../components/utils/isStaff"

export const Authorized = ({ token }) => {
  if (token) {
    const navbar = isStaff() ? <AdminNavBar /> : <NavBar />
    return <>
      {navbar}
     <Outlet />
     </>
  }
  return <Navigate to='/login' replace />
}
