import { FETCH_ITEM_FIELDS, SAVE_ITEM} from "../constants/actionTypes";
export default (
  itemFields = 
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
  action
) => {
  switch (action.type) {
    case FETCH_ITEM_FIELDS:
      return action.payload;
    case SAVE_ITEM: 
      return action.payload;
    default:
      return itemFields;
  }
};
