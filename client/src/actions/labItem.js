import * as api from '../api/index.js';

export const fetchCategoryFields = (category) => async (dispatch) => {
    try {
        console.log(category);
        const categoryFields  = await api.fetchCategoryFields(category);
        console.log(categoryFields)
        dispatch({ type: 'FETCH_ITEM_FIELDS', payload: categoryFields });
    } catch (error) {
        console.log(error);
    }
}