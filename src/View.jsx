import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";

const View = () => {
  var i = 0;
  const [userData, setUserData] = useState(null);
  const [query, setQuery] = useState("");
  const [queryValue, setQueryValue] = useState("A1");
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeInput, setTimeInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("API Request:", query, queryValue);
        
        const response = await axios.get(
          `https://alcor.onrender.com/api/bookings${
            (query==="roomNumber") ? `?roomNumber=${queryValue}` : (query==="roomType") ? `?roomType=${queryValue}` : (query==="startTime") ? `?startTime=${queryValue}` : (query==="endTime") ? `?endTime=${queryValue}` : ""
          }`
        );

        setUserData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error making GET request", error);
      }
    };

    fetchData();
  }, [query, queryValue]);

  const handleButtonClick = (clickedQuery) => {
    setQuery(clickedQuery);
    setQueryValue("");
    setSelectedOption(null);
    setTimeInput("");
  };

  const handleOptionSelect = (event) => {
    const value = event.target.value;
    setQueryValue(value);
    setSelectedOption(value);
  };

  const handleTimeInputChange = (event) => {
    const value = event.target.value;

    // Format time input to ISO format (e.g., "HH:mm:ss")
    const isoFormattedTime = new Date(`2000-01-01T${value}:00`).toISOString();

    setTimeInput(value);
    setQueryValue(isoFormattedTime);
    setSelectedOption(value);
  };

  return (
    <>
      <Typography>Query</Typography>
      <Stack direction={"row"} justifyContent={"space-around"} marginBottom={"10vh"}>
        <Button onClick={() => handleButtonClick("roomNumber")}>Room NO</Button>
        <Button onClick={() => handleButtonClick("roomType")}>Room Type</Button>
        <Button onClick={() => handleButtonClick("startTime")}>Start Time</Button>
        <Button onClick={() => handleButtonClick("endTime")}>End Time</Button>
      </Stack>
      {query === "roomNumber" && (
        <Stack direction={"row"}>
          <label>Room Number</label>
          <Select value={selectedOption || ""} onChange={handleOptionSelect}>
            {["A1", "A2", "B1", "B2", "B3", "C1", "C2", "C3", "C4", "C5"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </Select>
        </Stack>
      )}
      {query === "roomType" && (
        <Stack direction={"row"}>
          <label>Room Type</label>
          <Select value={selectedOption || ""} onChange={handleOptionSelect}>
            {["A", "B", "C"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
      {["startTime", "endTime"].includes(query) && (
        <Stack direction={"row"}>
          <label>{query === "startTime" ? "Start Time" : "End Time"}</label>
          <TextField
            type="time"
            value={timeInput}
            onChange={handleTimeInputChange}
          />
        </Stack>
      )}
      {userData && (
        <div>
          <Typography>Data:</Typography>
          {userData && Array.isArray(userData) && (
            <div>
              {userData.map((item, _id) => (
                <Stack direction={"row"}>
                <div key={item._id}>
                  <Typography>Room Number: {item.roomNumber}</Typography>
                  <Typography>Room Type: {item.roomType}</Typography>
                  <Typography>Start Time: {item.startTime}</Typography>
                  <Typography>End Time: {item.endTime}</Typography>
                  <Typography>Email: {item.userEmail}</Typography>
                  <hr />
                </div>
                </Stack>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
