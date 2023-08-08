import {
  AUTH,
  LOGOUT,
  FAILED_LOGIN,
  FAILED_SIGNUP,
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
  },
  action
) => {
  console.log(state);
  switch (action.type) {
    case AUTH:
      //save in local storage so won't forget user'
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case FAILED_LOGIN:
      if (action.payload === wrongPassword) {
        return {
          ...state,
          wrongPassword: true,
          nonExistUser: false,
          userExists: false,
          passwordNotMatch: false,
        };
      } else
        return {
          ...state,
          nonExistUser: true,
          wrongPassword: false,
          userExists: false,
          passwordNotMatch: false,
        };

    case FAILED_SIGNUP:
      if (action.payload === passwordNotMatch) {
        return {
          ...state,
          passwordNotMatch: true,
          userExists: false,
          wrongPassword: false,
          nonExistUser: false,
        };
      } else
        return {
          ...state,
          userExists: true,
          passwordNotMatch: false,
          wrongPassword: false,
          nonExistUser: false,
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
