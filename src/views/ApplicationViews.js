import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/posts/PostList"
import { Category } from "../components/categories/CategoryList"
import { UserList } from "../components/users/UserList"
import { UserDetail } from "../components/users/UserDetails"
import { AllPosts } from "../components/posts/AllPosts"
import { PostForm } from "../components/posts/PostForm"
import { PostDetails } from "../components/posts/PostDetails"
import { MyPost } from "../components/posts/MyPost"
import { TagList } from "../components/tags/TagList"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/category" element={<Category />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/publish" element={<PostForm />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/tagmanager" element={<TagList />} />
      </Route>
    </Routes>
  </>
}
