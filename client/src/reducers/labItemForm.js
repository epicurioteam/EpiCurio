import { FETCH_ITEM_FIELDS, SAVE_ITEM, FETCH_CATEGORIES } from "../constants/actionTypes";
export default (state = {
  itemFields: 
    [
      'name', 
      "unit_quantity",
      "location",
      "shelf-life",
      "vendor",
      "description",
      "category",
      "creator"
    ], 
    categories: []},
  action
) => {
  switch (action.type) {
    case FETCH_ITEM_FIELDS:
      return {...state, itemFields: action.payload};
    case FETCH_CATEGORIES: 
      return {...state, categories: action.payload};
    case SAVE_ITEM: 
      return {...state, itemFields: [
        'name', 
        "unit_quantity",
        "location",
        "shelf-life",
        "vendor",
        "description",
        "category",
        "creator"
      ]};
    default:
      return state;
  }
};
