import { Box, Divider, List } from "@mui/material";
import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/Info";
// import PhoneIcon from "@mui/icons-material/Phone";
import { Add, Folder, Search } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
const listS = [
  {
    name: "HOME",
    icon: <HomeRoundedIcon />,
    url: "/",
  },
  {
    name: "SEARCH",
    icon: <Search/>,
    url: "/search",
  },
  {
    name: "DataBase",
    icon: <Folder />,
    url: "/students",
  },

  {
    name: "Create",
    icon: <Add />,
    url: "/create",
  },
  // {
  //   name: "SETTINGS",
  //   icon: <Settings />,
  //   url: "/settings",
  // },
  {
    name: "ABOUT US",
    icon: <InfoIcon />,
    url: "/about",
  },
  // {
  //   name: "CONTACT US",
  //   icon: <PhoneIcon />,
  //   url: "/contact",
  // },
];

function SideBar() {
  const navigate = useNavigate();

  return (
    <Box
      flex={1}
      p={1}
      sx={{
        display: {
          xs: "none",
          sm: "block",
          backgroundColor: "transparent",
          // maxWidth: "100%",
        },
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          top: "80px",
          position: "sticky",
          backgroundColor: "transparent",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{ backgroundColor: "transparent" }}
            component="div"
            id="nested-list-subheader"
          >
            DASHBOARD
          </ListSubheader>
        }
      >
        <Divider />

        {listS.map((item, index) => (
          <ListItemButton
            onClick={(e) => {
              e.preventDefault();

              navigate(item.url);
            }}
            component="a"
            key={index}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
        <hr />
      </List>
    </Box>
  );
}

export default SideBar;
