import * as api from '../api/index.js';
import { FETCH_ITEM_FIELDS } from '../constants/actionTypes.js';

export const fetchCategoryFields = (category) => async (dispatch) => {
    try {
        console.log(category);
        const { data }  = await api.fetchCategoryFields(category);
        console.log(data);
        dispatch({ type: FETCH_ITEM_FIELDS, payload: data});
    } catch (error) {
        console.log(error);
    }
}