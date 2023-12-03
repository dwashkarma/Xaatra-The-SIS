import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  // Input,
  // InputBase,
  Menu,
  MenuItem,
  Toolbar,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import studentLogo from "../Images/logo.jpg";
import { Add, Folder, Home, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// import { database } from "../firebaseAuth.js";

// import { signOut } from "firebase/auth";

// import firebaseDB from "../firebase";
// import { useLocation } from "react-router-dom";

const StyleToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   backgroundColor: "whitesmoke",
//   opacity: "70%",
//   width: "20%",
//   padding: "5px 10px",

//   borderRadius: theme.shape.borderRadius,
// }));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "12px",
}));

function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AppBar color="primary" position="sticky">
      {/* This position will make the navbar to display up the other component.  */}
      <StyleToolBar>
        <Avatar
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          sx={{
            width: "50px",
            height: "50px",
            cursor: "pointer",
            marginLeft: 4,
            display: {
              xs: "block",
              sm: "block",
            },
          }}
          alt="Remy Sharp"
          src={studentLogo}
        />
        <Toolbar
          variant="h6"
          sx={{
            display: {
              xs: "none",
              sm: "block",
              cursor: "pointer",
            },
          }}
        >
          <h3
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            XAATRA
          </h3>
        </Toolbar>

        {/* <Search>
          <Input
            variant="plain"
            onSubmit={handleSearchSubmit}
            sx={{ width: "100%" }}
            placeholder=" Search......"
            onChange={handleSearchChange}
          ></Input>
          
        </Search> */}
        <Icons>
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            alt="Remy Sharp"
            src={studentLogo}
          />

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            color="inherit"
          >
            <Home color="white" />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              navigate("/create");
            }}
            color="inherit"
          >
            <Add color="white" />
          </IconButton>

          <Badge>
            <Button color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </Button>
          </Badge>
        </Icons>
      </StyleToolBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          top: 60,
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          {" "}
          {/* <Link to="/"> */}
          <Home /> HOME
          {/* </Link> */}
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            navigate("/create");
          }}
        >
          <Add /> CREATE
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            navigate("/students");
          }}
        >
          {" "}
          <Folder /> DATABASE
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            navigate("/about");
          }}
        >
          <Info />
          ABOUT US
        </MenuItem>
        {/* <MenuItem
          onClick={(e) => {
            signOut(database).then((val) => {
              navigate("/");
              console.log(val, "val");
            });
          }}
        >
          <Logout />
          Sign Out
        </MenuItem> */}
      </Menu>
    </AppBar>
  );
}

export default NavBar;
