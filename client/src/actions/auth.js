import { AUTH, FAILED_AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../api/index.js";
import { nonExistUser, wrongPassword } from "../constants/authErrorTypes";

//used for sign in button action
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user
    const { status, data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate('/home');  
  }
  catch (error) {
    console.log(error);
    switch (error.request.status) {
      case 400:
        dispatch({ type: FAILED_AUTH, payload: wrongPassword});
      case 404:
        dispatch({ type: FAILED_AUTH, payload: nonExistUser});
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
    console.log(error);
  }
};
