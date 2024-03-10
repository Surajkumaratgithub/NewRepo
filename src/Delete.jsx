import React, { useState } from 'react'
import{ Button, Typography ,TextField} from "@mui/material";
const Deletedd = () => {
  const [useremail,setUseremail]=useState('');
  const handleUseremail = (event) => {
    setUseremail(event.target.value);
  };
  const deleted=()=>{
    data="deleted";
    axios
    .patch(
      `https://alcor.onrender.com/api/deleteBooking?userEmail=${useremail}`,
      data
    )
    .then((response) => {
      console.log("PATCH request successful", response);
    })
    .catch((error) => {
      console.error("Error making PATCH request", error);
    });
  }
  return (<>
    <Typography>Delete</Typography>
    <TextField
          required
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          value={useremail}
          onChange={handleUseremail}
          sx={{width:"30vw"}}
        />
        <Button onClick={deleted}>Delete</Button>
        </>
  );
};

export default Deletedd
