import React, { useEffect, useState } from "react";
import firebaseDB from "../firebase";
import "../Styles/home.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";

const columns = [
  { id: "index", label: "S.N.", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "email",
    label: "EmailID",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fee",
    label: "FEE",
    minWidth: 50,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];
function StudentDetails() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("data is fetching...");
    firebaseDB.child("students").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({ ...snapshot.val() });
        console.log("data is received...");
        setLoading(false);
      } else {
        setData({});
        setLoading(false);
      }
    });

    return () => {
      // Unsubscribe from Firebase listener when component unmounts
      firebaseDB.child("students").off("value");
      setData({});
    };
  }, []);
  console.log("data", data);

  return (
    <Box flex={8} p={3}>
      <Stack
        top={10}
        position={"sticky"}
        sx={{
          display: {
            xs: "none ",
            sm: "block",
          },
        }}
      >
        <Typography
          variant="h3"
          align="center"
          position={"static"}
          sx={{
            color: "dimgray",
            fontFamily: "sans-serif",
            fontWeight: 400,
          }}
        >
          STUDENT'S TABLE
        </Typography>
        {loading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={100}
          />
        ) : (
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",

              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <TableContainer sx={{ maxHeight: 540 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead
                  sx={{
                    position: "inherit",
                  }}
                >
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(data).map((id, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={id}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/view/${id}`);
                        }}
                      >
                        <TableCell
                          sx={{
                            marginLeft: 3,
                            display: "flex",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>{data[id].name}</TableCell>
                        <TableCell>{data[id].address}</TableCell>
                        <TableCell>{data[id].email}</TableCell>
                        <TableCell>{data[id].contact}</TableCell>
                        <TableCell>{data[id].fee}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}

export default StudentDetails;
