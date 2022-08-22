import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Upcoming from "../components/Upcoming";
import Bookings from "../components/Bookings";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Card, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    axios
      .get("https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/tour")
      .then((res) => {
        console.log(res.data.Items);
        setMeals(res.data.Items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {meals.map((meal) => (
        <Card>
          <CardContent>
            <div className="d-flex justify-content-between">
              <div>{meal.tour_name}</div>
              <div>{meal.price}</div>
              <div>{meal.places}</div>
              <div>
                {" "}
                headCount: <input type="number" />
              </div>
              <Button>Buy</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Upcoming />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Bookings />
          </Paper>
        </Grid>
      </Grid> */}
    </Container>
  );
};
export default Dashboard;
