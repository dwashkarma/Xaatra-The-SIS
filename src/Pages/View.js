import { Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
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
import firebaseDB from "../firebase";

import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function View() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    firebaseDB
      .child(`students/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setStudent({ ...snapshot.val() });
          setLoading(false);
        } else {
          setStudent({});
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Some Error Occurred.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete the student?"))
      firebaseDB.child(`students/${id}`).remove((err) => {
        if (err) {
          setError("Some Error Occurred.");
        } else {
          setSuccess("Successfull");
          setTimeout(() => {
            navigate("/students");
          }, 1000);
        }
      });
  };
  const firstname = student.name ? student.name.charAt(0).toUpperCase() : "";
  //tenary operator
  //to give the avatar the first letter of the student name
  return (
    <Box flex={8} p={3} alignItems={"center"}>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        position={"sticky"}
        top={120}
      >
        <Typography align="center" variant="h5" color="text.secondary">
          Details
        </Typography>
        {loading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={100}
          />
        ) : (
          <Stack
            sx={{
              textAlign: "center",
              justifyContent: "center",
              marginTop: 5,
            }}
            direction={"row"}
          >
            <Card>
              <CardHeader
                sx={{
                  textAlign: "center",
                  justifyItems: "center",
                  alignItems: "center",
                }}
                avatar={
                  <Avatar sx={{ bgcolor: red }} aria-label="recipe">
                    {firstname}
                  </Avatar>
                }
                action={
                  <div>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/update/${id}`);
                      }}
                      aria-label="settings"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(id)}
                      aria-label="settings"
                    >
                      <Delete />
                    </IconButton>
                  </div>
                }
                title={student.name}
              ></CardHeader>

              <hr />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell>FEE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.fee}</TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Stack>
      <Stack marginTop={10}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Stack>
    </Box>
  );
}

export default View;
