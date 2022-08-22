import * as React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

export default function ReportsQuickSight() {
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
          src="https://us-east-1.quicksight.aws.amazon.com/sn/accounts/616254081950/dashboards/8e8ac4cb-b1c5-41cc-9c39-f3bcda4ab05e?directory_alias=group18"
          frameBorder="0"
          style={{ border: "0px", marginLeft: "13%" }}
          allowFullScreen
        ></iframe>
      </div>
    </React.Fragment>
  );
}
