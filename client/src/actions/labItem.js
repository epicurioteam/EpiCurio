import * as api from '../api/index.js';
import { FETCH_ITEM_FIELDS, SAVE_ITEM } from '../constants/actionTypes.js';

export const fetchCategoryFields = (category) => async (dispatch) => {
    try {
        const { data }  = await api.fetchCategoryFields(category);
        dispatch({ type: FETCH_ITEM_FIELDS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const saveItem = (newItemData) => async (dispatch) => {
    try {
        const { data } = await api.saveItem(newItemData);
        dispatch({ type: SAVE_ITEM, payload: data});
    } catch (error) {
       console.log(error); 
    }
}