import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AuthorSubscription } from "../components/author/AuthorSubscriptions"
import { PostList } from "../components/posts/PostList"
import { Category } from "../components/categories/CategoryList"
import { UserList } from "../components/users/UserList"
import { UserDetail } from "../components/users/UserDetails"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<AuthorSubscription />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/category" element={<Category />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />

      </Route>
    </Routes>
  </>
}
