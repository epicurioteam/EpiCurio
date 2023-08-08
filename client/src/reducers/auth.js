import { AUTH, LOGOUT, FAILED_AUTH } from "../constants/actionTypes";
import { wrongPassword, nonExistUser } from "../constants/authErrorTypes";

const authReducer = (state = { authData: null, wrongPassword: false, nonExistUser: false }, action) => {
  // console.log(state);
  switch (action.type) {
    case AUTH:
      //save in local storage so won't forget user'
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case FAILED_AUTH: 
      if (action.payload === wrongPassword) {
        return { ...state, wrongPassword: true, nonExistUser: false};
      }
        
      if (action.payload === nonExistUser)
        return { ...state, nonExistUser: true, wrongPassword: false};
    //logout clear local storage
    case LOGOUT: // used the same as a refresh state action
      localStorage.clear();
      return { ...state, authData: null, wrongPassword: false, nonExistUser: false };
    default:
      return state;
  }
};

export default authReducer;
