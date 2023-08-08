import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
// import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"; // import { useHistory } from 'react-router-dom';
import authReducer from "../../reducers/auth";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../actions/auth";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import Icon from "./icon";
import { AUTH, SWITCH_IS_SIGN_UP } from "../../constants/actionTypes";
import Warning from "./AuthWarning";
import AuthWarning from "./AuthWarning";

const AuthWrapper = () => {
  const store = configureStore({ reducer: authReducer });

  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const isSignup = useSelector((state) => state.isSignup);
  //user data for when client logs In
  const [formData, setFormData] = useState(initialState);
  const wrongPassword = useSelector((state) => state.wrongPassword);
  const nonExistUser = useSelector((state) => state.nonExistUser);
  const passwordNotMatch = useSelector((state) => state.passwordNotMatch);
  const userExists = useSelector((state) => state.userExists);

  const switchMode = () => {
    dispatch({ type: SWITCH_IS_SIGN_UP })
    handleShowPassword(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //two cases 1. sign up button action. 2. sign in action
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const googleSuccess = async (res) => {
  //   console.log(res);
  // }

  // const googleFailure = (error) => {
  //   console.log('Google Sign In was unsuccessful. Try again later!')
  //   console.log(error);
  // }

  // const handleCallbackResponse = async (res) => {
  //   const token = res?.credential;
  //   const result = jwt_decode(token);

  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });
  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://accounts.google.com/gsi/client";
  //   script.async = true;
  //   script.defer = true;
  //   document.head.appendChild(script);
  //   script.onload = () => {
  //     google.accounts.id.initialize({
  //       client_id:
  //         "99631309615-cin2nns79btd1sv70s5op2bb64eb1nhg.apps.googleusercontent.com",
  //       callback: handleCallbackResponse,
  //     });

  //     google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //       theme: "outline ",
  //       size: "medium",
  //     });
  //   };
  // }, []);

  console.log(wrongPassword);
  console.log(nonExistUser);
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                {/* Create new custom component that generalizes the logic
                <TextField name='firstName' label='First Name' handleChange={handleChange} autoFocus xs={6}/>
                <TextField name='lastName' label='Last Name' handleChange={handleChange} autoFocus xs={6}/>

                Check Input.js under Auth folder
              */}
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {wrongPassword && (
              // <Alert severity="error">
              //   <AlertTitle>Error</AlertTitle>
              //   Incorrect Password
              //   Please check your password and try again.
              // </Alert>
              <AuthWarning
                className={classes.passwordWarning}
                message="You've entered the incorrect password. Please try again!"
              />
            )}
            {nonExistUser && (
              // <Alert severity="error">
              //   <AlertTitle>Error</AlertTitle>
              //   Incorrect Password
              //   Please check your password and try again.
              // </Alert>
              <AuthWarning
                className={classes.passwordWarning}
                message="The email you entered isn't connected to an account"
              />
            )}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            {passwordNotMatch && (
              // <Alert severity="error">
              //   <AlertTitle>Error</AlertTitle>
              //   Incorrect Password
              //   Please check your password and try again.
              // </Alert>
              <AuthWarning
                className={classes.passwordWarning}
                message="Passwords do not match. Please try again!"
              />
            )}
            {userExists && (
              // <Alert severity="error">
              //   <AlertTitle>Error</AlertTitle>
              //   Incorrect Password
              //   Please check your password and try again.
              // </Alert>
              <AuthWarning
                className={classes.passwordWarning}
                message="User already exists. Please try logging in!"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {" "}
            {isSignup ? "Sign Up" : "Sign In"}{" "}
          </Button>

          {/* Google Login - Defered */}
          {/* <div
            id="signInDiv"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}></div> */}

          {/* <GoogleLogin
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained">
                Google Sign In
              </Button> 
              
            )}

            Handlers for Google Log In 
            onSuccess={googleSuccess}
            onError={googleFailure}
          /> */}

          <Grid container justifyContent="center">
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign In!"
                : "Don't have an account? Sign Up!"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthWrapper;
