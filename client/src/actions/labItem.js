import * as api from "../api/index.js";
import {
  FETCH_CATEGORIES,
  FETCH_ITEM_FIELDS,
  SAVE_ITEM,
  FETCH_ITEM_DETAILS,
} from "../constants/actionTypes.js";

// Category actions
export const fetchCategoryFields = (category) => async (dispatch) => {
  try {
    const { data } = await api.fetchCategoryFields(category);
    dispatch({ type: FETCH_ITEM_FIELDS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategory = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCategory();
    dispatch({ type: FETCH_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Item actions
export const saveItem = (newItemData) => async (dispatch) => {
  try {
    const { data } = await api.saveItem(newItemData);
    dispatch({ type: SAVE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();
    console.log(data);

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchItemDetails = (itemId) => async (dispatch) => {
  try {
    // Make an API call to fetch the details of the item with the specified itemId
    const { data } = await api.fetchItemDetails(itemId);
    console.log(data);

    // Dispatch the item details to the reducer
    dispatch({ type: FETCH_ITEM_DETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = (id, itemData) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, itemData);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteItem(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
