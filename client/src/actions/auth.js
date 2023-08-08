import {
  AUTH,
  FAILED_LOGIN,
  FAILED_SIGNUP,
  LOGOUT,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import {
  nonExistUser,
  wrongPassword,
  userExists,
  passwordNotMatch,
} from "../constants/authErrorTypes";

//used for sign in button action
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user
    const { status, data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/home");
  } catch (error) {
    switch (error.request.status) {
      case 400:
        dispatch({ type: FAILED_LOGIN, payload: wrongPassword });
        break;
      case 404:
        dispatch({ type: FAILED_LOGIN, payload: nonExistUser });
      default:
        break;
    }
  }
};

//used for sign up button action
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    switch (error.request.status) {
      case 400:
        dispatch({ type: FAILED_SIGNUP, payload: passwordNotMatch });
        break;
      case 404:
        dispatch({ type: FAILED_SIGNUP, payload: userExists });
        break;
      case 500:
        dispatch({ type: FAILED_SIGNUP, payload: somethingWrong });
        break;
      default:
        break;
    }
  }
};
