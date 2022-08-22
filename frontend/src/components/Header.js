import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/index'; 

const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isloggedIn);
  const dispatch = useDispatch();
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2c2f38" }}>
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isLoggedIn && 
          <Box display="flex" margin={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e) => setValue(() => parseInt(e.target.name))}
            >
              <Tab name="0" LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab name="1" LinkComponent={Link} to="/myblogs" label="My Blogs" />
              <Tab name="2" LinkComponent={Link} to="/blogs/add" label="Add blog" />
            </Tabs>
          </Box>
        }
        <Box display="flex" marginLeft="auto">
          { !isLoggedIn && (
            <>
              <Button LinkComponent={Link} to="/auth" variant="contained">
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ ml: "20px" }}
              >
                Signup
              </Button>
            </>
          )}
          {
            isLoggedIn &&
            <Button
            onClick={()=>dispatch(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ ml: "20px" }}
          >
            Logout
          </Button>
          }
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
