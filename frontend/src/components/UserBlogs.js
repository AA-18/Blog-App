import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:8080/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => {
          return (
            <Blog
              key={index}
              isUser={true}
              id = {blog._id}
              title={blog.title}
              description={blog.description}
              userName={user.name}
              img={blog.img}
            />
          );
        })}
    </div>
  );
};

export default UserBlogs;
