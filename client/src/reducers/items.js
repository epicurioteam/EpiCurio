import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (items = [], action) => {
  switch (action.type) {
    case FETCH_ALL: // action.payload are the items that get fetched
      return action.payload;
    case CREATE: // action.payload is the item that should get created
      return [...items, action.payload];
    case UPDATE:
      // if item is the item that gets updated, map the updated item to the newly-updated item
      return items.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case DELETE:
      return items.filter((item) =>
        item._id === action.payload ? null : item
      );
    default:
      return items;
  }
};
