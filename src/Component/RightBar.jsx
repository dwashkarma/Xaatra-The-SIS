import {
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  Typography,
  List,
  ListItemText,
  AvatarGroup,
  ImageList,
  ImageListItem,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TexasImage from "../Images/texasCollege.jpg";
import TexasInt from "../Images/TexasInt.jpg";
import Games from "../Images/games.webp";
import Tiger from "../Images/tiger.jpg";
import texasImg from "../Images/imageTexas.jpg";
import animal from "../Images/animal.webp";
import firebaseDB from "../firebase";

export default function RightBar() {
  const avatarDetails = [
    {
      avatar:
        "https://st2.depositphotos.com/3889193/7657/i/450/depositphotos_76571141-stock-photo-confident-smiling-businessman-posing.jpg",
      details: "JAWAN",
      name: "Ali Connors",
      descriptions: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh1bWFufGVufDB8fDB8fHww&w=1000&q=80",
      details: "KOMAL SHAH",
      name: "Person ",
      descriptions: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "D",
      details: "DWAS KARMA",
      name: "Problem Statement",
      descriptions: " — demo lekheko",
    },
    {
      avatar: "R",
      details: "ROCK",
      name: "College",
      descriptions: " — demo lekheko",
    },
  ];
  const [comments, setComments] = useState([]);

  const itemData = [
    {
      img: TexasInt,
      title: "Texas",
    },
    {
      img: TexasImage,
      title: "Texas",
    },
    {
      img: Games,
      title: "Games",
    },
    {
      img: Tiger,
      title: "Tiger",
    },
    {
      img: animal,
      title: "Animal",
    },
    {
      img: texasImg,
      title: "Texas",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  useEffect(() => {
    console.log("data is fetching...");
    firebaseDB
      .child("comments")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setComments(Object.values(snapshot.val()));
          console.log("data is received...");
        } else {
          setComments({});
          console.log("Data is not received....");
        }
      });
  }, []);
  return (
    <Box
      flex={2}
      p={2}
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      {/* <AvatarGroup total={24}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup> */}

      <Box
        // width={300}
        sx={{
          position: "static",
          top: "80px",
          gridArea: "sidebar",
        }}
      >
        <Typography p={2} variant="h5" fontWeight={100}>
          PORTAL
          <Divider />
        </Typography>

        <AvatarGroup total={9}>
          {avatarDetails.map((items, index) => (
            <Avatar alt="Remy Sharp" src={items.avatar} key={index} />
          ))}
        </AvatarGroup>

        <Typography variant="h5" marginTop={5} fontWeight={100}>
          Photos
        </Typography>
        <Divider />
        <ImageList
          gap={5}
          cols={3}
          sx={{ width: "auto", maxHeight: 400 }}
          rowHeight={80}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Divider />
        <Typography p={2} variant="h5" fontWeight={100}>
          Latest Reviews
          <Divider />
        </Typography>

        {Object.values(comments).map((items, index) => (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <hr />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={items.avatar} key={index} />
              </ListItemAvatar>
              <ListItemText
                primary={items.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {items.comment}
                    </Typography>
                    {items.descriptions}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </List>
        ))}
      </Box>
    </Box>
  );
}
