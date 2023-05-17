import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { AdminViews } from "./AdminView"
import { Authorized } from "./Authorized"
import { AuthorSubscription } from "../components/author/AuthorSubscriptions"
import { PostList } from "../components/posts/PostList"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<AuthorSubscription />} />
        <Route path="/posts" element={<PostList />} />

      </Route>
        
      <Route element={<AdminViews />}>
      </Route>
    </Routes>
  </>
}
