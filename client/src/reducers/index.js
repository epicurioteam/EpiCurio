import { combineReducers } from "redux";
import auth from "./auth";
import items from "./items";
import categoryForm from "./categoryForm";

/*
    combine all reducers into one root reducers through key-value pairs

    When an action is dispatched, the root reducer delegates the action to the corresponding reducer based on the key.
*/

export default combineReducers({
  items,
  categoryForm,
  auth,
});
