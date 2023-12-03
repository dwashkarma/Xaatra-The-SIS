import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import TexasImage from "../Images/texasCollege.jpg";
import TexasInt from "../Images/TexasInt.jpg";
import Games from "../Images/games.webp";

function Feed() {
  const cardDetails = [
    {
      avatarName: "R",
      subHeader: "September 14, 2016",
      title: "Texas College of Management and IT",
      image: TexasImage,
      description:
        "   This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
      avatarName: "S",
      subHeader: "October 4, 2020",
      title: "Texas International",
      image: TexasInt,
      description:
        "   This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
      avatarName: "P",
      subHeader: "November 1, 2021",
      title: "Organizing Games in Texas this Year",
      image: Games,
      description:
        "   This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
      avatarName: "A",
      subHeader: "September 5, 2021",
      title: "Beauty of Nature",
      image:
        "https://cdn.pixabay.com/photo/2018/03/15/10/40/panoramic-3227796_640.jpg",
      description:
        "   This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
  ];
  return (
    <Box flex={4} p={3}>
      {cardDetails.map((items, index) => (
        <Card
          sx={{
            marginBottom: 5,
            bgcolor: "lightGrey",
            maxHeight: "40%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                key={index}
              >
                {items.avatarName}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={items.title}
            subheader={items.subHeader}
          />
          <CardMedia
            component="img"
            height="10%"
            image={items.image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {items.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite color="error" />}
              />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Feed;
