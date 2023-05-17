import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AdminNavBar } from "../components/nav/AdminNav"
import { isStaff } from "../components/utils/isStaff"

export const AdminViews = () => {
    if (isStaff()) {
        return <>
          <AdminNavBar />
          <Outlet />
        </>
      }
      return <Navigate to='/' replace />
  }