import { Box, Button, Input, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import firebaseDB from "../firebase";
import { useNavigate } from "react-router-dom";
const intialState = {
  name: "",
  contact: "",
  address: "",
  email: "",
  fee: 100000,
};
function Create() {
  const [state, setState] = useState(intialState);
  const navigate = useNavigate();
  const { name, address, email, contact, fee } = state;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const inputStyle = {
    margin: "8px",
    fontSize: "1.2rem",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      console.log("some fields are empty");

      setError("Some Fields are Empty.");
    } else {
      console.log("validation succeed. All fields are filled");
      firebaseDB.child("students").push(state, (err) => {
        if (err) {
          console.log(err);
          setError("Some Error Occurred.");
        } else {
          console.log("successfully added.");
          setSuccess("Successfull");
          setTimeout(() => {
            navigate("/students");
          }, 2000);
        }
      });
      // setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <Box flex={8} spacing={2} p={2}>
      <Stack
        direction={"column"}
        top={120}
        position={"sticky"}
        alignItems={"center"}
      >
        <Typography variant="h5" color="text.secondary">
          Create Student Details
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

export default Create;
