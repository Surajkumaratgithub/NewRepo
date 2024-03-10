import React from 'react'
import { Button, Stack, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Room = () => {
  const navigate = useNavigate();
  return (
    <>
    <Typography marginLeft={"40vw"}marginTop={"5vh"}>Hotel Room Management Admin App</Typography>
    <Stack direction={"row"} justifyContent={"space-around"} marginTop={"20vh"}>
      <Stack direction={"column"}height={"70vh"}>
      <Button onClick={() => navigate('/registration')}>Create</Button>
      </Stack>
      <Stack direction={"column"}height={"70vh"}>
        <Button  onClick={() => navigate('/edit')}>Edit</Button>
      </Stack>
      <Stack direction={"column"}height={"70vh"}>
        <Button  onClick={() => navigate('/view')}>View</Button>
      </Stack>
      <Stack direction={"column"}height={"70vh"}>
        <Button  onClick={() => navigate('/delete')}>Delete</Button>
      </Stack>
    </Stack>
    </>
  )
}

export default Room
