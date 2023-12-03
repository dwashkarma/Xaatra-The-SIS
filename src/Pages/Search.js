import { Alert, Box, CardContent, Stack, Typography } from "@mui/material";
import { Input, Card, Button } from "@mui/joy";

import React, { useEffect, useState } from "react";
import firebaseDB from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let initialSearch = query.get("contact");

  // Function to fetch data based on the search query
  const searchData = (search) => {
    firebaseDB
      .child("students")
      .orderByChild("contact")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setData(snapshot.val());
        } else {
          setData({}); // No results found, clear existing data
        }
      });
  };

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch); // Set the initial search query
      searchData(initialSearch);
    }
  }, [initialSearch]);

  // Function to handle search query changes and trigger searches
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchData(searchQuery); // Trigger search based on the new query
  };

  return (
    <Box flex={8} p={2}>
      <Stack
        direction={"column"}
        top={100}
        position={"sticky"}
        alignItems={"center"}
      >
        <Typography variant="h5" color="text.secondary">
          SEARCH
        </Typography>

        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            "--Card-radius": "38px",
            marginTop: 3,
            display: {
              xs: { width: "100%" },
              sm: { width: "100%" },
              m: { width: "100%" },
            },
          }}
        >
          <CardContent>
            <Input
              sx={{
                display: {
                  xs: { width: "100%" },
                  sm: { width: 800 },
                },
              }}
              onChange={handleSearchChange}
              color="primary"
              placeholder="Contact"
            />
          </CardContent>
          <CardContent>
            <Button onClick={handleSearchSubmit} variant="solid">
              {" "}
              SEARCH
            </Button>
          </CardContent>
        </Card>
          </Stack>

        <Stack p={4}>
          {Object.keys(data).length === 0 ? (
            <Alert severity="error">No Data</Alert>
          ) : (
            Object.keys(data).map((id) => {
              return navigate(`/view/${id}`);
            })
          )}
      </Stack>
    </Box>
  );
}

export default Search;
