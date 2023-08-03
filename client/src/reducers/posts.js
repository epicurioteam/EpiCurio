import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';

export default (posts= [], action) => {
    switch (action.type) {
        case FETCH_ALL: // action.payload are the posts that gets fetched
            return action.payload;
        case CREATE: // action.payload is the post that should get created 
            return [...posts, action.payload];
        case UPDATE:
            // if the post is the post that gets updated, map the updated post to the newly-updated post 
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => (post._id === action.payload ? null : post));
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        default:
            return posts;
    }
}