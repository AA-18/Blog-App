import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";

function App() {
  const isLoggedin = useSelector((state) => state.isloggedIn);
  return (
    <>
      <Header />
      <Routes>
        {!isLoggedin ? (
          <Route path="/auth" element={<Auth />} />
        ) : (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
