import { combineReducers } from "redux";
import posts from './posts';
import auth from './auth';

/*
    combine all reducers into one root reducers through key-value pairs

    When an action is dispatched, the root reducer delegates the action to the corresponding reducer based on the key.
*/

export default combineReducers({
    posts, 
    auth,
});