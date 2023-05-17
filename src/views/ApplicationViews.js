import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AuthorSubscription } from "../components/author/AuthorSubscriptions"
import { PostList } from "../components/posts/PostList"
import { PostDetails } from "../components/posts/PostDetails"
import { MyPost } from "../components/posts/MyPost"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<AuthorSubscription />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        {/* <Route path="/posts/my-post" element={<MyPost />} /> */}
      </Route>
    </Routes>
  </>
}
