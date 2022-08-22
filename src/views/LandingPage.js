import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Upcoming from "../components/Upcoming";
import Bookings from "../components/Bookings";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  CardActionArea,
  CssBaseline,
  Divider,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Food from "../components/Food";
import Tour from "../components/Tour";
import Room from "../components/Room";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visualization from "../components/Visualization";

const Dashboard = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const toggleDrawer = () => {
    setOpen(!open);
  };
  let navigate = useNavigate();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bed And Breakfast
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Logout
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/reviews");
            }}
          >
            Review
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Container
          sx={{ mt: 5, mb: 4, background: "#f2f6fc" }}
          style={{ minWidth: "100%", minHeight: "100vh" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {<br /> * 5}
            </Grid>
            {/* Upcoming Bookings */}
            <h1 style={{ marginLeft: "10px", marginTop: "10px" }}>
              Hotel Rooms
            </h1>
            <Grid item xs={12}>
              <Room />
            </Grid>
            <h1 style={{ marginLeft: "10px" }}>Food Items</h1>
            <Grid item xs={12}>
              <Food />
            </Grid>
            <h1 style={{ marginLeft: "10px" }}>Tour packages</h1>
            <Grid item xs={12}>
              <Tour />
            </Grid>
            <h1 style={{ marginLeft: "10px" }}>
              Explore more at Bread & Breakfast
            </h1>
            <Grid item xs={12}>
              <Visualization />
            </Grid>
            {/* Recent Bookings */}
            {/* <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Bookings />
          </Paper>
        </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Dashboard;
