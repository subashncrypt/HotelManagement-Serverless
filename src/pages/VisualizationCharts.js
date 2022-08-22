import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";

function preventDefault(event) {
  event.preventDefault();
}

export default function VisualizationCharts() {

  let navigate = useNavigate();
  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));
  
  const directHome = async(event) => {
    if(currentUser){
      if(currentUser.email === "owner.bnb.csci5410.group18@gmail.com"){
        navigate("/admin")
      }
      else{
        navigate("/")
      }
    }
    else{
        Swal.fire({
          // title: "Error!",
          text: "Please Login or signup",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(function () {
          window.location = "/login";
        });
    }
  }
  
  if(currentUser){
    if(currentUser.email === "owner.bnb.csci5410.group18@gmail.com"){
      return (
        <React.Fragment>
          <Container style={{minWidth: "100%", minHeight: "100vh", background: "#f2f6fc" }}>
          <div>
            <Button color="primary" variant="contained" style={{marginTop:"5px", marginLeft:"5px"}} onClick={directHome}>
              Go to dashboard
            </Button>
          </div>
          <div>
            <iframe
              height={900}
              src="https://datastudio.google.com/embed/reporting/7b863fcd-da0e-4fc5-a8f0-0e3efacbecb8/page/tT1xC"
              frameBorder="0"
              style={{ minWidth: "100%", border: "0px", background: "#f2f6fc" }}
              allowFullScreen
              allowTransparency
            ></iframe>
          </div>
          </Container>
        </React.Fragment>
      );
    }else{
  return (
    <React.Fragment>
      <Container style={{minWidth: "100%", minHeight: "100vh", background: "#f2f6fc" }}>
      <div>
        <Button color="primary" variant="contained" style={{marginTop:"5px", marginLeft:"5px"}} onClick={directHome}>
          Go to dashboard
        </Button>
      </div>
      <div>
        <iframe
          height={900}
          src="https://datastudio.google.com/embed/reporting/1b5153a9-6f0e-415b-96ee-0a9d0e60439a/page/tT1xC"
          frameBorder="0"
          style={{ minWidth: "100%", border: "0px", background: "#f2f6fc" }}
          allowFullScreen
          allowTransparency
        ></iframe>
      </div>
      </Container>
    </React.Fragment>
  );
    }
  }
  else{
    Swal.fire({
      // title: "Error!",
      text: "Please Login or signup to view visualizations",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(function () {
      window.location = "/login";
    });
  }
}
