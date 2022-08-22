import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, img, userName, isUser , id}) => {
  //console.log(userName + " " + isUser);
  const navigate = useNavigate();
  const handleEdit = ()=>{
    navigate(`/myBlogs/${id}`);
  }
  
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:8080/api/blog/${id}`).catch(err => console.log(err))
    const data = await res.data;
    return data;
  }

  const handleDelete = () => {
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/myBlogs"));
  }

  return (
    <Card
      sx={{
        width: "50%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #454a52",
        ":hover": { boxShadow: "10px 10px 20px #454a52" },
      }}
    >
      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><ModeEditOutlineIcon color="warning" /></IconButton>
          <IconButton onClick={handleDelete}><DeleteForeverIcon color="error"/></IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
        subheader=""
      />
      <CardMedia component="img" height="194" image={img} alt="Paella dish" />
      <CardContent>
        <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b>
          {" : "}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
