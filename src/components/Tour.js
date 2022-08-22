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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TourBookingToast } from "./ToastNotifications";
import { ToastContainer } from "react-toastify";
import { BookingRequests } from "../api/BookingRequests";

const Tour = () => {
  const location = useLocation();
  const [tours, setTours] = useState([]);
  let navigate = useNavigate();

  let timestamp = new Date();

  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));
  // console.log("Inside Tour booking for user: ", currentUser.email);

  const [tourDetails, setTourDetails] = useState([]);

  const bookTour = async (event, param) => {
    if (currentUser) {
      const { value: headcount } = await Swal.fire({
        title: "How many heads?",
        input: "text",
        inputLabel: "Your total headcount",
        inputPlaceholder: "Enter your total headcount",
      });

      param.head_count = headcount;
      param.user_id = currentUser.user_id || 1;
      console.log(param);
      //param = JSON.stringify({ tour_id: 1, tour_name: "alberta", head_count: 5, user_id: 42 });
      const param_JSON = JSON.stringify(param);
      console.log(param_JSON);
      //const bookTourAPIEndPoint = "https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/tour";
      //setloaded(true);

      await BookingRequests.sendRequest("TOUR_SERVICE", param)
        .then((res) => {
          console.log("Res: " + JSON.stringify(res));
          //setloaded(false);
          if (res.status == 200) {
            console.log("res.data", res.data);
            TourBookingToast(param.tour_name);
          } else if (res.status != 200) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("Err", err);
        });

      let currentDate = timestamp.getDate() + "/" + (timestamp.getMonth() + 1) + "/" + timestamp.getFullYear();
      let currentTime = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
      let param_event = {
        event_type: "Tour booking",
        user_email: currentUser.email,
        timestamp: currentTime,
        date: currentDate,
      };
      let paramJSON = JSON.stringify(param_event);
      console.log(paramJSON);
      await axios
        .post("https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/generate", paramJSON, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Logging tour booking event");
          } else if (res.status != 200) {
          }
        })
        .catch((err) => {
          console.log("Err", err);
        });
    } else {
      Swal.fire({
        // title: "Error!",
        text: "Please Login or signup to book tour",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(function () {
        window.location = "/login";
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://4enm1lvle2.execute-api.us-east-1.amazonaws.com/dev/alltours")
      .then((res) => {
        console.log(res.data.Items);
        setTours(res.data.Items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <div className="d-flex justify-content-between">
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Places</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Price</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Name</div>
            <div style={{ minWidth: "30%", fontWeight: "bold" }}>Action</div>
          </div>
        </CardContent>
      </Card>
      {tours.map((tour) => (
        <Card>
          <CardContent>
            <div className="d-flex justify-content-between">
              <div style={{ minWidth: "30%" }}>{tour.places}</div>
              <div style={{ minWidth: "30%" }}>{tour.price}</div>
              <div style={{ minWidth: "30%" }}>{tour.tour_name}</div>
              <Button
                onClick={(event) =>
                  bookTour(event, {
                    tour_id: tour.id,
                    tour_name: tour.tour_name,
                  })
                }
                variant="contained"
              >Book Now</Button>
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
      <ToastContainer />
    </Container>
  );
};
export default Tour;
