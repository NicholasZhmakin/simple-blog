import { PostActionTypes } from "../types/actions";
import { IReducer } from "../types/reducerInteface";

const initState: IReducer = {
  loading: false,
  error: null,
  posts: null,
  detailsPost: null,
  detailsError: null
};

const reducer = (state = initState, action: PostActionTypes): IReducer => {
  switch (action.type) {
    case "INIT_POSTS_START":
      return {
        ...state,
        loading: true,
        error: null,
        posts: null,
        detailsPost: null,
        detailsError: null
      };

    case "INIT_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
        detailsPost: null,
        detailsError: null
      };

    case "INIT_POSTS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: null,
        detailsPost: null,
        detailsError: null
      };

    case "GET_DETAILS_SUCCESS":
      return {
        ...state,
        detailsPost: action.payload,
        detailsError: null
      };

    case "GET_DETAILS_FAIL":
      return {
        ...state,
        detailsPost: null,
        detailsError: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
