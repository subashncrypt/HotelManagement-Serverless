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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MealBookingToast } from "./ToastNotifications";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

import { BookingRequests } from "../api/BookingRequests";
const Dashboard = () => {
  const location = useLocation();
  const [meals, setMeals] = useState([]);
  const [qty, setQty] = useState([]);
  const [cart, setCart] = useState([]); // Final Cart
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  let timestamp = new Date();
  let navigate = useNavigate();

  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));
  // console.log("Inside Food ordering for user: ", currentUser.email);

  const orderFood = async (event, param) => {
    // const { value: quantity } = await Swal.fire({
    //   title: "Please enter the quantity?",
    //   input: "text",
    //   inputLabel: "Your total desired quantity",
    //   inputPlaceholder: "Enter your total quantity",
    // });

    // param.head_count = quantity;
    // param.user_id = 123;
    // console.log(param);
    // //param = JSON.stringify({ tour_id: 1, tour_name: "alberta", head_count: 5, user_id: 42 });
    // const param_JSON = JSON.stringify(param);
    // console.log(param_JSON);
    // const bookTourAPIEndPoint = "https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/tour";
    // //setloaded(true);
    // await axios
    //   .post(bookTourAPIEndPoint, param_JSON, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => {
    //     console.log("Res: " + JSON.stringify(res));

    //     //setloaded(false);
    //     if (res.status == 200) {
    //       console.log("res.data", res.data);
    //     } else if (res.status != 200) {
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Err", err);
    //   });

    let currentDate = timestamp.getDate() + "/" + (timestamp.getMonth() + 1) + "/" + timestamp.getFullYear();
    let currentTime = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
    let param_event = {
      event_type: "Food Order",
      user_email: currentUser.email,
      timestamp: currentTime,
      date: currentDate,
    };
    let paramJSON = JSON.stringify(param_event);
    console.log(paramJSON);

    // Place order
    await BookingRequests.sendRequest("MEAL_SERVICE", {
      food: JSON.stringify(cart),
      user_id: currentUser.user_id || 1,
    })
      .then((res) => {
        console.log("Res: " + JSON.stringify(res));
        //setloaded(false);
        if (res.status == 200) {
          console.log("res.data", res.data);
          MealBookingToast(cart);
        } else if (res.status != 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });

    await axios
      .post("https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/generate", paramJSON, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Logging Food order event toast");
          //MealBookingToast()
        } else if (res.status != 200) {
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  const addToCart = (e, meal, i) => {
    let id = cart.findIndex((item) => item.id == meal.id);
    if (currentUser) {
      let order = [...cart];
      if (id < 0) {
        // let order = [...cart];
        order.push({ ...meal, qty: qty[i], totalPrice: meal.price * qty[i] });
        setCart(order);
      } else {
        // let order = [...cart];
        order[id] = { ...meal, qty: qty[i], totalPrice: meal.price * qty[i] };
        setCart(order);
      }
      console.log(order);
      let total = 0;
      order.map((item) => (total = total + item.totalPrice));
      setTotalOrderPrice((total));
    } else {
      Swal.fire({
        // title: "Error!",
        text: "Please Login or signup to order food",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(function () {
        window.location = "/login";
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://c3yio5z7d4.execute-api.us-east-1.amazonaws.com/dev/getmeals")
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
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Food</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Qty</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((meal, i) => (
                  <TableRow key={meal.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell>{meal.price}</TableCell>
                    <TableCell>
                      <input
                        // style={{ width: "10%" }}
                        type="number"
                        value={qty[i]}
                        onChange={(e) => {
                          let quantity = qty;
                          quantity[i] = e.target.value;
                          setQty(quantity);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={(e) => addToCart(e, meal, i)}>Add To Cart</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        {cart
          ? cart.map((item) => (
              <div className="d-flex justify-content-between">
                <div>{item.name}</div>
                <div>qty: {item.qty}</div>
                <div>totalPrice: {item.totalPrice}</div>
              </div>
            ))
          : null}
        <div className="d-flex justify-content-end m-2">
          <Typography variant="buttonText" m={2}>
            Total Order Price: {totalOrderPrice}
          </Typography>
          <Button onClick={orderFood} variant="contained">
            Buy Now
          </Button>
        </div>
      </Card>
      <ToastContainer />
      {console.log("quantity", qty)}
    </Container>
  );
};
export default Dashboard;
