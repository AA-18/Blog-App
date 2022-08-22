import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {authActions} from '../store/index'; 
import {useNavigate} from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp , setSignUp] = useState(false);
  const [inputs,setInputs] = useState({
    name:"",
    email:"",
    password:""
  });
  const handleChange = (e) =>{
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
      }))
  }
  const sendRequest = async (type="login") =>{
   const res = await axios.post(`http://localhost:8080/api/user/${type}`,{
    name:inputs.name,
    email:inputs.email,
    password:inputs.password,
   }).catch(err => console.log(err));
   const data = await res.data;
   return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(isSignUp){
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data));
    } else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data));
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={300}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #454a52"
          padding={3}
          margin="auto"
          marginTop={10}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">{isSignUp ? "SignUp" : "Login"}</Typography>
          { isSignUp && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin="normal"/>}
          <TextField name="email" onChange={handleChange} value={inputs.email} type={"email"} placeholder="Email" margin="normal"/>
          <TextField name="password" onChange={handleChange} value={inputs.password} type={"password"} placeholder="Password" margin="normal"/>
          <Button type="submit">Submit</Button>
          <Button onClick={()=>setSignUp(!isSignUp)}>Change to {!isSignUp ? "SignUp" : "Login"}</Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
