import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/posts/PostList"
import { AllPosts } from "../components/posts/AllPosts"
import { PostForm } from "../components/posts/PostForm"
import { PostDetails } from "../components/posts/PostDetails"
import { MyPost } from "../components/posts/MyPost"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />

      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/publish" element={<PostForm />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Route>
  
        {/* <Route path="/posts/my-post" element={<MyPost />} /> */}
    </Routes>
  </>
}
