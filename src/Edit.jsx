import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

const Edit = () => {
  const [Useremail, setEmail] = useState("");
  const [Usernewemail, setnewEmail] = useState("");
  const [startTime, setselectedEntryTime] = useState("");
  const [endTime, setselectedExitTime] = useState("");
  const [totalPrice, settotalPrice] = useState("");
  const [roomNumber, setroomNo] = useState("");
  const [roomType, setroomType] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlenewEmailChange = (event) => {
    setnewEmail(event.target.value);
  };
  const handleTimeentry = (event) => {
    setselectedEntryTime(event.target.value);
  };
  const handleTimeexit = (event) => {
    setselectedExitTime(event.target.value);
  };
  const handleRoom = (event) => {
    setroomNo(event.target.value);
  };
  const handleRoomType = (event) => {
    setroomType(event.target.value);
  };
  const handleTotalPrice = (event) => {
    settotalPrice(event.target.value);
  };

  const handleEditClick = () => {
    const data = {};
    if (Usernewemail) data.Usernewemail = Usernewemail;
    if (startTime)
      data.startTime = datetime.datetime
        .strptime(startTime, "%Y-%m-%dT%H:%M:%S.%f+00:00")
        .isoformat();
    if (endTime)
      data.endTime = datetime.datetime
        .strptime(endTime, "%Y-%m-%dT%H:%M:%S.%f+00:00")
        .isoformat();
    if (totalPrice) data.totalPrice = totalPrice;
    if (roomNumber) data.roomNumber = roomNumber;
    if (roomType) data.roomType = roomType;

    axios
      .patch(
        `https://alcor.onrender.com/api/booking?userEmail=${Useremail}`,
        data
      )
      .then((response) => {
        console.log("PATCH request successful", response);
      })
      .catch((error) => {
        console.error("Error making PATCH request", error);
      });
  };

  return (
    <>
      <Stack direction={"column"}>
        <Typography>Write Mail_id to search for user</Typography>
        <Stack></Stack>
        <TextField
          required
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
          value={Useremail}
          onChange={handleEmailChange}
        />
        <TextField
          required
          fullWidth
          label="New Email"
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
          value={Usernewemail}
          onChange={handlenewEmailChange}
        />
        <Typography>Start Time</Typography>
        <TextField
          type="time"
          id="appt-time-entry"
          name="appt-time-entry"
          value={startTime}
          onChange={handleTimeentry}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
        <Typography>End Time</Typography>
        <TextField
          type="time"
          id="appt-time-exit"
          name="appt-time-exit"
          value={endTime}
          onChange={handleTimeexit}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
        <TextField
          required
          fullWidth
          label="Total Price"
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
          value={totalPrice}
          onChange={handleTotalPrice}
        />
        <TextField
          required
          fullWidth
          label="Room Number"
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
          value={roomNumber}
          onChange={handleRoom}
        />
        <TextField
          required
          fullWidth
          label="Room Type"
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
          value={roomType}
          onChange={handleRoomType}
        />

        <Typography>
          <Button onClick={handleEditClick}>Edit</Button>
        </Typography>
      </Stack>
    </>
  );
};

export default Edit;
