import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import creator from "../Images/Creator.jpg";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

function About() {
  return (
    <Box flex={8} p={2}>
      <Stack
        position={"sticky"}
        top={100}
        alignItems={"center"}
        direction={"column"}
      >
        <Typography textAlign="center" variant="h4" color="text.secondary">
          About Us
        </Typography>
        <Card sx={{ maxWidth: 600, marginTop: "15px" }}>
          <CardMedia
            sx={{
              height: 300,
            }}
            image={creator}
          />
          <CardContent>
            <Typography variant="h5" color="success ">
              Dwash Karma
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              variant="h9"
              color="grey "
            >
              "Chasing dreams and achieving greatness."
            </Typography>

            <hr />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                "& > button": { borderRadius: "2rem" },
              }}
            >
              <IconButton disabled={false} variant="plain">
                <Link to="https://github.com/dwaskarma">
                  <GitHub />
                </Link>
              </IconButton>
              <IconButton disabled={false} variant="plain">
                <Link to="https://www.linkedin.com/in/diwash-k-5b4b1b164/">
                  <LinkedIn />
                </Link>
              </IconButton>
            </Box>
            <Typography>
              "There is no easy walk to freedom anywhere, and many of us will
              have to pass through the valley of the shadow of death again and
              again before we reach the mountaintop of our desires." -- Nelson
              Mandela
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default About;
