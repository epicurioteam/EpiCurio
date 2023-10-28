import {
  FETCH_ALL,
  FETCH_ITEM_DETAILS,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

const initialState = {
  itemsList: [],
  itemDetails: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        itemsList: action.payload,
      };
    case FETCH_ITEM_DETAILS:
      return {
        ...state,
        itemDetails: action.payload,
      };
    case CREATE:
      return {
        ...state,
        itemsList: [...state.itemsList, action.payload],
      };
    case UPDATE:
      return {
        ...state,
        itemsList: state.itemsList.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case DELETE:
      return {
        ...state,
        itemsList: state.itemsList.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
