import { FETCH_ITEM_FIELDS } from "../constants/actionTypes";
export default (
  itemFields = 
    [
      'name', 
      "unit_quantity",
      "location",
      "shell-life",
      "vendor",
      "description",
      "category",
      "creator"
    ], 
  action
) => {
  switch (action.type) {
    case FETCH_ITEM_FIELDS:
      return action.payload;
    default:
      return itemFields;
  }
};
