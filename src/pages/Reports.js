import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

export default function Reports() {
  let navigate = useNavigate();
  const directHome = async (event) => {
    navigate("/admin");
  };
  return (
    <React.Fragment>
      <div>
        <Button color="primary" variant="contained" style={{ marginTop: "5px", marginLeft: "5px" }} onClick={directHome}>
          Go to dashboard
        </Button>
      </div>
      <div>
        <iframe
          width={1200}
          height={900}
          src="https://datastudio.google.com/embed/reporting/de8aad75-1ba7-462b-98a2-b35fb14ca5d5/page/lLQyC"
          frameBorder="0"
          style={{ border: "0px", marginLeft: "13%" }}
          allowFullScreen
        ></iframe>
      </div>
    </React.Fragment>
  );
}
