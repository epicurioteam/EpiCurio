import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';

// Action Creators: functions that return an action, which is an object that has a type and a payload

export const getPosts = () => async (dispatch) => { 

    try {
        const { data } = await api.fetchPosts();
        // get the response, then get the data object of the response object
        dispatch({ type: FETCH_ALL, payload: data});
    } 
    catch (error) {
        console.log(error.message);  
    }
} // this is not a plain action object, it is a asynchronous thunk function that does additional async tasks before dispatch actions. 

// The use of redux-thunk allows you to dispatch functions directly from action creators, making the code more concise and easier to manage for handling asynchronous actions.

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data} )
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, postData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, postData);

        dispatch({ type: UPDATE, payload: data} )
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id});
    }
    catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data});
    } catch (error) {
        
    }
}