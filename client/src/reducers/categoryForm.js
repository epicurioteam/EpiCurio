import { CREATE_ITEM_CATEGORY } from "../constants/actionTypes";

export default (
    attributes = {}, action
) => {
    switch (action.type) {
        case CREATE_ITEM_CATEGORY:
            return attributes;
        default:
            return attributes;
    }
};