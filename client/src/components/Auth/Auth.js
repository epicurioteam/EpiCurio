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
import jwt_decode from "jwt-decode";
import authReducer from "../../reducers/auth";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";

import Icon from "./icon";

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

const Auth = ({ setUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  //user data for when client logs In
  const [formData, setFormData] = useState(initialState);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    //two cases 1. sign up button action. 2. sign in action
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
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

  const handleCallbackResponse = (res) => {
    const token = res.credentials;
    const userObj = jwt_decode(token);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "99631309615-cin2nns79btd1sv70s5op2bb64eb1nhg.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline ",
    });
  }, []);

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
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
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
          <div id="signInDiv"></div>
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

          <Grid container justifyContent="flex-end">
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
