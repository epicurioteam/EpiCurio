import * as api from '../api/index.js';

export const fetchCategoryFields = (category) => async (dispatch) => {
    try {
        const { categoryFields } = await api.fetchCategoryFields(category);

        console.log(categoryFields);
        dispatch({});
    } catch (error) {
        console.log(error);
    }
}