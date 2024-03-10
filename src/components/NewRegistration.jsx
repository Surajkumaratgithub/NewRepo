import React, { useState, useEffect } from "react";
import datetime from 'datetime';
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const NewRegistration = () => {
  const [Useremail,setuseremail]=useState("");
  const [selectedEntryTime, setSelectedEntryTime] = useState("");
  const [selectedExitTime, setSelectedExitTime] = useState("");
  const [diffinMin, setDiffinMin] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [price, setPrice] = useState(0);

  // Event handlers
  const handleTimeentry = (event) => {
    setSelectedEntryTime(event.target.value);
  };
  const handleUseremail = (event) => {
    setuseremail(event.target.value);
  };

  const handleTimeexit = (event) => {
    const exitTimeValue = event.target.value;
    setSelectedExitTime(exitTimeValue);
  };

  const handleDateEntry = (event) => {
    setEntryDate(event.target.value);
  };

  const handleDateExit = (event) => {
    setExitDate(event.target.value);
  };

  // Effect hook to recalculate price
  useEffect(() => {
    const calculatePrice = () => {
      // Check if all necessary values are available
      if (
        selectedEntryTime &&
        selectedExitTime &&
        entryDate &&
        exitDate &&
        (a || b || c)
      ) {
        const entryTime = new Date(`0001-01-01T${selectedEntryTime}:00`);
        const exitTime = new Date(`0001-01-01T${selectedExitTime}:00`);
        const differenceInMs = Math.abs(
          entryTime.getTime() - exitTime.getTime()
        );
        const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

        let perMinuteRate = 0;
        if (a) {
          perMinuteRate = 100;
        } else if (b) {
          perMinuteRate = 80;
        } else if (c) {
          perMinuteRate = 50;
        }

        const calculatedPrice = differenceInMinutes * (perMinuteRate / 60);
        setDiffinMin(differenceInMinutes);
        setPrice(calculatedPrice);
        console.log(`Time difference: ${differenceInMinutes} minutes`);
      }
    };

    calculatePrice();
  }, [a, b, c, selectedEntryTime, selectedExitTime, entryDate, exitDate]);
  const setzerostate=()=>{
  setA('');
  setB('');
  setC('');
  }
const submitdata=()=>{
  const data={};
  if (Useremail) data.UserEmail = Useremail;
  const startTime = new Date(`${entryDate}T${selectedEntryTime}:00`);
  data.startTime = startTime.toISOString();
  const endTime = new Date(`${exitDate}T${selectedExitTime}:00`);
  data.endTime = endTime.toISOString();
  if (price) data.totalPrice =price;
  if (a) data.roomNumber = a;
  if (b) data.roomNumber = b;
  if (c) data.roomNumber =c;
 
  axios
  .post(
    "https://alcor.onrender.com/api/booking",
    data
  )
  .then((response) => {
    console.log("Post request successful", response);
  })
  .catch((error) => {
    console.error("Error making POST request", error);
  });
}
  return (
    <>
      <form style={{ width: "50%", marginTop: "1rem" }}>
        <Typography>Room Allotment</Typography>
        <TextField
          required
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          value={Useremail}
          onChange={handleUseremail}
        />
        <Typography>Entry Date</Typography>
        <TextField
          type="date"
          id="appt-date-entry"
          name="appt-date-entry"
          value={entryDate}
          onChange={handleDateEntry}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
        <Typography>Entry Time</Typography>
        <TextField
          type="time"
          id="appt-time-entry"
          name="appt-time-entry"
          value={selectedEntryTime}
          onChange={handleTimeentry}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
        <Typography>Exit Date</Typography>
        <TextField
          type="date"
          id="exit-date-entry"
          name="exit-date-entry"
          value={exitDate}
          onChange={handleDateExit}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
        <Typography>Exit Time</Typography>
        <TextField
          type="time"
          id="appt-time-exit"
          name="appt-time-exit"
          value={selectedExitTime}
          onChange={handleTimeexit}
          margin="normal"
          variant="outlined"
          sx={{ width: "30vw" }}
        />
      </form>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <FormControl fullWidth>
          <InputLabel id="RoomA">A</InputLabel>
          <Select
            labelId="RoomA"
            id="RoomA"
            value={a}
            label="Age"
            onChange={(event) => setA(event.target.value)}
            sx={{ width: "10vw" }}
          >
            <MenuItem id="1" value={'a1'}>
              A1
            </MenuItem>
            <MenuItem id="2" value={'a2'}>
              A2
            </MenuItem>
            <MenuItem id="a"onClick={setzerostate}>
              Reset
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="RoomB">B</InputLabel>
          <Select
            labelId="RoomB"
            id="RoomB"
            value={b}
            label="Age"
            onChange={(event) => setB(event.target.value)}
            sx={{ width: "10vw" }}
          >
            <MenuItem id="3" value={'b1'}>
              B1
            </MenuItem>
            <MenuItem id="4" value={'b2'}>
              B2
            </MenuItem>
            <MenuItem id="5" value={'b3'}>
              B3
            </MenuItem>
            <MenuItem id="b" onClick={setzerostate}>
              Reset
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="RoomC">C</InputLabel>
          <Select
            labelId="RoomC"
            id="RoomC"
            value={c}
            label="Age"
            onChange={(event) => setC(event.target.value)}
            sx={{ width: "10vw" }}
          >
            <MenuItem id="6" value={'c1'}>
              C1
            </MenuItem>
            <MenuItem id="7" value={'c2'}>
              C2
            </MenuItem>
            <MenuItem id="8" value={'c3'}>
              C3
            </MenuItem>
            <MenuItem id="9" value={'c4'}>
              C4
            </MenuItem>
            <MenuItem id="10" value={'c5'}>
              C5
            </MenuItem>
            <MenuItem id="c"onClick={setzerostate} >
              Reset
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Typography>{`Total Price: ${price}`}</Typography>
      <Button type="submit" variant="contained" onClick={submitdata}>Proceed</Button>
    </>
  );
};

export default NewRegistration;
