import * as api from '../api/index.js';
import { CREATE_ITEM_CATEGORY } from '../constants/actionTypes.js';

export const createCategory = (category) => async (dispatch) => {
    try {
        const { data } = await api.createNewCategory(category);
        dispatch({ type: CREATE_ITEM_CATEGORY, payload: data});
    } catch (error) {
        console.log(error);
    }
}