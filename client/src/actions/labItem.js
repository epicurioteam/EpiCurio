import * as api from '../api/index.js';

export const fetchCategoryFields = (category) => async (dispatch) => {
    try {
        console.log(category);
        const categoryFields  = await api.fetchCategoryFields(category);

        console.log(categoryFields); // undefined
        dispatch({});
    } catch (error) {
        console.log(error);
    }
}