import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

const Edit = () => {
  const [Useremail, setEmail] = useState("");
  const [Usernewemail, setnewEmail] = useState("");
  const [startTime, setselectedEntryTime] = useState("");
  const [endTime, setselectedExitTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, settotalPrice] = useState("");
  const [roomNumber, setroomNo] = useState("");
  const [roomType, setroomType] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

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

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
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

  const handleCheckClick = () => {
    axios
      .post(`https://alcor.onrender.com/api/bookigDetails`, {
        userEmail: Useremail,
      })
      .then((response) => {
        const userData = response.data.data;
        const dateTimeS = new Date(userData.startTime);

        const dateS = dateTimeS.toISOString().split("T")[0];
        const timeS = dateTimeS.toTimeString().split(" ")[0];

        const dateTimeE = new Date(userData.startTime);

        const dateE = dateTimeE.toISOString().split("T")[0];
        const timeE = dateTimeE.toTimeString().split(" ")[0];
        setselectedEntryTime(timeS || "");
        setselectedExitTime(timeE || "");
        setStartDate(dateS || "");
        setEndDate(dateE || "");
        settotalPrice(userData.totalPrice || "");
        setroomNo(userData.roomNumber || "");
        setroomType(userData.roomType || "");
        console.log("fetched the data");
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error making POST request", error);
      });
  };

  const finalprice = () => {
    const entryDateTime = new Date(`${startDate}T${startTime}`);
    const exitDateTime = new Date(`${endDate}T${endTime}`);
    
    // Calculate total minutes spent
    const totalMinutesSpent = Math.round((exitDateTime - entryDateTime) / (1000 * 60));

    // Determine room type price
    let roomTypePrice;
    switch (roomType) {
      case 'A':
        roomTypePrice = 100;
        break;
      case 'B':
        roomTypePrice = 80;
        break;
      case 'C':
        roomTypePrice = 50;
        break;
      default:
        roomTypePrice = 0; // Default price if room type is not A, B, or C
    }

    // Calculate total price
    const totalPrice = (totalMinutesSpent / 60) * roomTypePrice;

    // Update the state with the calculated total price
    settotalPrice(totalPrice.toFixed(2)); // Assuming you want to keep it as a string with two decimal places
  };

  const handleEditClick = () => {
    const data = {};
    if (Usernewemail) data.userEmail = Usernewemail;

    if (startTime) {
      const [hours, minutes] = startTime.split(":");
      const startDateTime = new Date();
      startDateTime.setHours(hours, minutes, 0, 0);
      data.startTime = startDateTime.toISOString();
    }

    if (endTime) {
      const [hours, minutes] = endTime.split(":");
      const endDateTime = new Date();
      endDateTime.setHours(hours, minutes, 0, 0);
      data.endTime = endDateTime.toISOString();
    }

    if (startDate) {
      const startDateObj = new Date(startDate);
      data.startDate = startDateObj.toISOString().split("T")[0];
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      data.endDate = endDateObj.toISOString().split("T")[0];
    }

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
        setRequestStatus("success");
      })
      .catch((error) => {
        console.error("Error making PATCH request", error);
        setRequestStatus("error");
      });
  };

  return (
    <>
      <Stack direction={"column"}>
        <Typography>Write Mail_id to search for user</Typography>
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
        <Button onClick={handleCheckClick}>Check</Button>

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
        <Typography>Start Date</Typography>
        <TextField
          type="date"
          id="start-date"
          name="start-date"
          value={startDate}
          onChange={handleStartDateChange}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
        <Typography>End Date</Typography>
        <TextField
          type="date"
          id="end-date"
          name="end-date"
          value={endDate}
          onChange={handleEndDateChange}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
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
        <Button onClick={finalprice}>Final_price</Button>
        <Typography>
          <Button onClick={handleEditClick}>Edit</Button>
        </Typography>
        {requestStatus === "success" && (
          <Typography style={{ color: "green" }}>
            Details Edited Successfully
          </Typography>
        )}

        {requestStatus === "error" && (
          <Typography style={{ color: "red" }}>
            Error making request. Please try again.
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default Edit;
