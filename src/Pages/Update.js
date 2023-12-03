import { Box, Button, Input, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import firebaseDB from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const intialState = {
  name: "",
  contact: "",
  address: "",
  email: "",
  fee: 100000,
};
function Update() {
  const navigate = useNavigate();
  const inputStyle = {
    margin: "8px",
    fontSize: "1.2rem",
  };

  const [state, setState] = useState(intialState);
  // const navigate = useNavigate();
  const { name, address, email, contact, fee } = state;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      console.log("some fields are empty");
      setError("Some Fields are Empty.");
      return;
    } else {
      const updateStudent = { name, address, email, contact, fee };
      if (id) {
        console.log("validation succeed. All fields are filled");
        firebaseDB.child(`students/${id}`).update(updateStudent, (err) => {
          if (err) {
            setError("Some Error Occurred.");
          } else {
            setSuccess("Successfull");
            setTimeout(() => navigate("/students"), 3000);
          }
        });
      } else {
        firebaseDB.child("students").push(state, (err) => {
          if (err) {
            setError("Some Error Occurred.");
          } else {
            setSuccess("Successfull");
            setTimeout(() => navigate("/students"), 2000);
          }
        });
      }
    }
  };

  useEffect(() => {
    //hook to fetch student data from Firebase based on a specific id parameter.
    console.log("data is fetching...");

    if (id) {
      firebaseDB.child(`students/${id}`).once("value", (snapshot) => {
        if (snapshot.val() != null) {
          setState({ ...snapshot.val() });
          console.log("data is received...");
        } else {
          setState(intialState);
        }
      });
    }
    return () => {
      // Unsubscribe from Firebase listener when component unmounts
      firebaseDB.child("students").off("value");
      setState({});
    };
  }, [id]);
  return (
    <Box flex={8} spacing={2} p={2}>
      <Stack
        direction={"column"}
        top={120}
        position={"sticky"}
        alignItems={"center"}
      >
        <Typography variant="h5" color="text.secondary">
          Update Student Details
        </Typography>

        <Stack
          direction={"column"}
          width={400}
          marginTop={2}
          position={"sticky"}
        >
          <Typography sx={inputStyle} variant="h8">
            Name:
          </Typography>
          <Input
            type="text"
            color="primary"
            id="name"
            name="name"
            placeholder="Enter  name......"
            value={name}
            onChange={handleInputChange}
          ></Input>
          <Typography sx={inputStyle} variant="h8">
            Address:
          </Typography>
          <Input
            type="text"
            color="primary"
            id="address"
            name="address"
            value={address}
            placeholder="Enter Address....."
            onChange={handleInputChange}
          ></Input>
          <Typography sx={inputStyle} variant="h8">
            Contact:
          </Typography>
          <Input
            color="primary"
            type="number"
            id="contact"
            name="contact"
            value={contact}
            placeholder="Enter Contact......"
            onChange={handleInputChange}
          ></Input>
          <Typography sx={inputStyle} variant="h8">
            Email:
          </Typography>
          <Input
            color="primary"
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email Address...."
            value={email}
            onChange={handleInputChange}
          ></Input>
          <Typography sx={inputStyle} variant="h8">
            FEE:
          </Typography>
          <Input
            type="number"
            color="primary"
            name="fee"
            id="fee"
            value={fee}
            placeholder="Enter Fee...."
            onChange={handleInputChange}
          ></Input>
          <Button
            sx={{
              marginTop: "15px",
            }}
            onClick={handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </Stack>

        <Stack marginTop={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Update;
