import { Card, CardContent, Stack } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
//https://h7ppg1ry82.execute-api.us-east-1.amazonaws.com/dev/getrooms --> show available rooms
//https://h7ppg1ry82.execute-api.us-east-1.amazonaws.com/dev/getrooms/all --> show all rooms
const RoomCard = ({ room }) => {
  return (
    <>
      <Card>
        <Stack>
          <CardContent></CardContent>
        </Stack>
      </Card>
    </>
  );
};

export default RoomCard;
