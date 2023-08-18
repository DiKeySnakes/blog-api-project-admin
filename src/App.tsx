import { Layout } from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import Public from "./components/Public"
import BlogsList from "./features/blog/BlogsList"
import Blog from "./features/blog/Blog"
import Login from "./features/auth/Login"
import Logout from "./features/auth/Logout"
import NewBlogForm from "./features/blog/NewBlogForm"
import UpdateBlog from "./features/blog/UpdateBlog"
import PublishBlog from "./features/blog/PublishBlog"
import UsersList from "./features/user/UsersList"
import UpdateUserActiveForm from "./features/user/UpdateUserActiveForm"
import NewUserForm from "./features/user/NewUserForm"
import NewCommentForm from "./features/comment/NewCommentForm"
import DeleteCommentForm from "./features/comment/DeleteCommentForm"
import PersistLogin from "./features/auth/PersistLogin"
import RequireAuth from "./features/auth/RequireAuth"
import { ROLES } from "./config/roles"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign_up" element={<NewUserForm />} />
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="/blog/blogs" element={<BlogsList />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/comment/create/:id" element={<NewCommentForm />} />
            <Route path="/auth/logout" element={<Logout />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/blog/create_blog" element={<NewBlogForm />} />
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
            <Route path="/blog/publish/:id" element={<PublishBlog />} />
            <Route path="/comment/delete/:id" element={<DeleteCommentForm />} />
            <Route path="/user/users" element={<UsersList />} />
            <Route path="/user/active/:id" element={<UpdateUserActiveForm />} />
          </Route>
        </Route>{" "}
        {/* End Protected Routes */}
      </Route>
    </Routes>
  )
}

export default App
