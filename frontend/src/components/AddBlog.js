import React , {useState} from "react";
import { Box, TextField, Typography, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    title:"",
    description:"",
    img:""
  });
  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
}
const sendRequest = async () => {
    const res = await axios.post("http://localhost:8080/api/blog/add",{
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
  sendRequest().then(()=>navigate("/myBlogs"));
}
  return (
    <div>
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
          <TextField onChange={handleChange} name="title" value={inputs.title} />
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField onChange={handleChange} name="description" value={inputs.description} multiline rows={6} />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField onChange={handleChange} name="img" value={inputs.img} />
          <Button sx={{mt:"30px"}} variant="contained" type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
