import React, { useEffect, useState } from "react";
import { Alert, Box, CardContent, Stack, Typography } from "@mui/material";
import { Input, Card, Button } from "@mui/joy";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import firebaseDB from "../firebase";

function SearchD() {
  const [query, setQuery] = useState("");
  console.log(query);

  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let queryD = useQuery();
  let initialSearch = queryD.get("contact");

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch); // Set the initial search query
      searchData(initialSearch);
    }
  }, [initialSearch]);
  // Function to fetch data based on the search query
  const searchData = (search) => {
    firebaseDB
      .child("students")
      .orderByChild("contact")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setQuery(snapshot.val());
        } else {
          setQuery({}); // No results found, clear existing data
        }
      });
  };
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
      <Stack
        p={15}
        top={250}
        position={"sticky"}
        alignItems={"center"}
        direction={"row"}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        {Object.keys(query).length === 0 ? (
          <Alert severity="error">No Data</Alert>
        ) : (
          Object.keys(query).map((id) => {
            return (
              <TableContainer style={{ width: "90vh" }} component={Paper}>
                <Table
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow
                      style={{
                        padding: 20,
                        marginLeft: 10,
                        alignItems: "center",
                      }}
                    >
                      <TableCell>Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Email Address</TableCell>
                      <TableCell>FEE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(query).map((id) => {
                      const student = query[id];
                      return (
                        <TableRow key={id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.address}</TableCell>
                          <TableCell>{student.contact}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.fee}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })
        )}
      </Stack>
    </Box>
  );
}

export default SearchD;
