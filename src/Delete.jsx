import React, { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import axios from "axios";
const Deletedd = () => {
  const [useremail, setUseremail] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);
  const handleUseremail = (event) => {
    setUseremail(event.target.value);
  };
  const deleted = () => {
    axios
      .patch(
        `https://alcor.onrender.com/api/deleteBooking?userEmail=${useremail}`
      )
      .then((response) => {
        console.log("PATCH request successful", response);
        setRequestStatus("success");
      })
      .catch((error) => {
        console.error("Error making PATCH request", error);
        setRequestStatus("error");
      });
  };
  return (
    <>
      <Typography>Delete</Typography>
      <TextField
        required
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
        value={useremail}
        onChange={handleUseremail}
        sx={{ width: "30vw" }}
      />
      <Button onClick={deleted}>Delete</Button>
      {requestStatus === "success" && (
        <Typography style={{ color: "green" }}>Details Removed Succesfully</Typography>
      )}

      {requestStatus === "error" && (
        <Typography style={{ color: "red" }}>Error making request. Please try again.</Typography>
      )}
    </>
  );
};

export default Deletedd;
