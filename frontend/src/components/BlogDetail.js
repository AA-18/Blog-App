import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:8080/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
    setBlog(data.blog);
    setInputs({
      title: data.blog.title,
      description: data.blog.description,
      img: data.blog.img,
    });
  });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:8080/api/blog/update/${id}`,{
    title:inputs.title,
    description:inputs.description,
    img:inputs.img,
    user: localStorage.getItem("userId")
  }).catch(err=> console.log(err));
  const data = await res.data;
  return data;
}
const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(inputs);
  sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myBlogs"));
}
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={2}
            borderColor="#4285F4"
            borderRadius={10}
            boxShadow="10px 10px 20px #adbbff"
            padding={5}
            margin={"auto"}
            my="30px"
            display="flex"
            flexDirection={"column"}
            width={"60%"}
          >
            <Typography
              fontWeight="blod"
              padding={3}
              variant="h2"
              textAlign="center"
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyle}>Title</InputLabel>
            <TextField
              onChange={handleChange}
              name="title"
              value={inputs.title}
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              onChange={handleChange}
              name="description"
              value={inputs.description}
              multiline
              rows={6}
            />
            <InputLabel sx={labelStyle}>ImageURL</InputLabel>
            <TextField onChange={handleChange} name="img" value={inputs.img} />
            <Button sx={{ mt: "30px" }} variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
