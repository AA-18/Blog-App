import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8080/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => {
          {console.log(blog.user)}
          return (
            <Blog
              key={index}
              id = {blog._id}
              isUser = {localStorage.getItem("userId")===blog.user._id}
              title={blog.title}
              description={blog.description}
              userName={blog.user.name}
              img={blog.img}
            />
          );
        })}
    </div>
  );
};

export default Blogs;
