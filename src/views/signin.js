import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import questions from "../utils/Questions";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import firebase from "./firebase-config";
import axios from "axios";
const db = firebase.db;
window.Buffer = window.Buffer || require("buffer").Buffer;

const poolData = {
  UserPoolId: "us-east-1_SUWtuJFu8",
  ClientId: "1i89dklc6akcahj5ss1u2njsfr",
};

const UserPool = new CognitoUserPool(poolData);

const theme = createTheme();
var error = {};

export default function SignIn() {
  let navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };

  const RandomNum = Math.floor(Math.random() * (3 - 1)) + 1;

  const [stepCount, setStepCount] = useState(1);
  const [stepOneData, setStepOneData] = useState({});
  const [stepTwoData, setStepTwoData] = useState({});
  const [email, setEmail] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("error");
  const [caesarCipherText, setCaesarCipherText] = useState("");
  const timestamp = new Date();

  useEffect(() => {
    const text = generateRandomText(3);
    setCaesarCipherText(text);
  }, []);

  const popSnackBar = (message, isSuccess = false) => {
    setSnackBarMessage(message);
    setSnackBarSeverity(isSuccess ? "success" : "error");
    setSnackBarOpen(true);
  };
  const generateRandomText = (length) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let text = "";
    const randomIndex = Math.floor(Math.random() * possible.length);
    console.log(randomIndex);
    for (let i = randomIndex; i < randomIndex + length; i++) {
      text += possible.charAt(i);
    }
    console.log({ text });
    return text;
  };
  const handleStepOne = async (event) => {
    event.preventDefault();

    const StepOneData = new FormData(event.currentTarget);
    const user = new CognitoUser({
      Username: StepOneData.get("email"),
      Pool: UserPool,
    });
    const userDetails = new AuthenticationDetails({
      Username: StepOneData.get("email"),
      Password: StepOneData.get("password"),
    });

    user.authenticateUser(userDetails, {
      onSuccess: async (data) => {
        setStepOneData(data);
        setEmail(StepOneData.get("email"));
        popSnackBar("Step One Verification Successful.", true);
        setStepCount(2);
      },
      onFailure: (error) => {
        console.log(error);
        popSnackBar("Login failed", false);
        setStepCount(1);
      },
    });
  };

  const handleStepTwo = async (event) => {
    event.preventDefault();

    const StepTwoData = new FormData(event.currentTarget);
    const userRef = db.collection("userDetails");
    const userDoc = (await userRef.doc(email).get(email)).data();
    if (userDoc[`Question${RandomNum}`] !== StepTwoData.get("secQuestion")) {
      popSnackBar("Authentication failed", false);
      setStepCount(1);
      return;
    }
    popSnackBar("Step Two Verification Successful", true);
    setStepTwoData(userDoc);
    setStepCount(3);
  };

  const handleStepThree = async (event) => {
    event.preventDefault();
    const StepThreeData = new FormData(event.currentTarget);

    axios
      .get(`https://us-central1-csci5410-assignmnet4.cloudfunctions.net/group-18?text=${caesarCipherText}&key=${stepTwoData.ceaserCipherKey}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        if (res.data.output != StepThreeData.get("caesarCipherKey")) {
          popSnackBar("Authentication failed", false);
          setStepCount(1);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        popSnackBar("Internal Server Error", false);
        setStepCount(3);
        return;
      });
    popSnackBar("Successfully logged in!", true);
    localStorage.setItem("COGNITO_JWT_TOKEN", stepOneData.idToken.jwtToken);

    await axios
      .post("https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/user/loggedin", JSON.stringify({ email: email }), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("BB_USER", JSON.stringify({ email: email, user_id: res.data.id }));
        } else if (res.status != 200) {
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });

    if (email === "owner.bnb.csci5410.group18@gmail.com") {
      navigate("/admin");
    } else {
      let currentDate = timestamp.getDate() + "/" + (timestamp.getMonth() + 1) + "/" + timestamp.getFullYear();
      let currentTime = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
      let param = { event_type: "Login", user_email: email, timestamp: currentTime, date: currentDate };
      let paramJSON = JSON.stringify(param);
      console.log(paramJSON);
      await axios
        .post("https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/generate", paramJSON, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Logging login event");
          } else if (res.status != 200) {
          }
        })
        .catch((err) => {
          console.log("Err", err);
        });
      navigate("/");
    }
  };
  const clicked = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {stepCount == 1 && (
            <>
              <Typography component="h1" variant="h5">
                Sign in - Step 1
              </Typography>
              <Box component="form" onSubmit={handleStepOne} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus />
                {error.email && <p>{error.email}</p>}
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                {error.password && <p>{error.password}</p>}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign in
                </Button>
                <Typography type="body2">
                  Don't have an account? <a href="/register">Register</a>
                </Typography>
              </Box>
            </>
          )}
          {stepCount == 2 && (
            <>
              <Typography component="h1" variant="h5">
                Security Question - Step 2
              </Typography>
              <Box component="form" onSubmit={handleStepTwo} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" required fullWidth id="secQuestion" label={questions[RandomNum]} name="secQuestion" autoFocus />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
                <Typography type="body2">
                  Don't have an account? <a href="/register">Register</a>
                </Typography>
              </Box>
            </>
          )}
          {stepCount == 3 && (
            <>
              <Typography component="h1" variant="h5">
                Caesar Cipher - Step 3
              </Typography>
              <Box component="form" onSubmit={handleStepThree} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="caeserCipherKey"
                  label={`Decipher the text ${caesarCipherText} using the key you used while registering`}
                  name="caeserCipherKey"
                  autoFocus
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
                <Typography type="body2">
                  Don't have an account? <a href="/register">Register</a>
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackBarSeverity}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
