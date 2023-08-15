import {
  AUTH,
  LOGOUT,
  FAILED_LOGIN,
  FAILED_SIGNUP,
  SWITCH_IS_SIGN_UP,
} from "../constants/actionTypes";
import {
  wrongPassword,
  nonExistUser,
  passwordNotMatch,
  userExists,
} from "../constants/authErrorTypes";

const authReducer = (
  state = {
    authData: null,
    wrongPassword: false,
    nonExistUser: false,
    passwordNotMatch: false,
    userExists: false,
    isSignup: false,
  },
  action
) => {
  switch (action.type) {
    case SWITCH_IS_SIGN_UP:
      return { ...state, isSignup: !state.isSignup };
    case AUTH:
      //save in local storage so won't forget user'
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action?.data,
        isSignup: !state.isSignup,
        nonExistUser: false,
        wrongPassword: false,
        passwordNotMatch: false,
        userExists: false,
      };
    case FAILED_LOGIN:
      if (action.payload === wrongPassword) {
        return {
          ...state,
          nonExistUser: false,
          wrongPassword: true,
          passwordNotMatch: false,
          userExists: false,
          isSignup: false,
        };
      } else
        return {
          ...state,
          nonExistUser: true,
          wrongPassword: false,
          passwordNotMatch: false,
          userExists: false,
          isSignup: false,
        };
    case FAILED_SIGNUP:
      if (action.payload === passwordNotMatch)
        return {
          ...state,
          nonExistUser: false,
          wrongPassword: false,
          passwordNotMatch: true,
          userExists: false,
          isSignup: true,
        };
      if (action.payload === userExists)
        return {
          ...state,
          nonExistUser: false,
          wrongPassword: false,
          passwordNotMatch: false,
          userExists: true,
          isSignup: false,
        };
    //logout clear local storage
    case LOGOUT: // used the same as a refresh state action
      localStorage.clear();
      return {
        ...state,
        authData: null,
        wrongPassword: false,
        nonExistUser: false,
      };

    default:
      return state;
  }
};

export default authReducer;
