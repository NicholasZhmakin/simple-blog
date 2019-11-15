import axios from "axios";
import { AppActions } from "../types/actions";
import { IPost } from "../types/postInterface";
import { Dispatch } from "redux";

export const initPostsStart = (): AppActions => {
  return {
    type: "INIT_POSTS_START"
  };
};

export const initPostsSuccess = (allPosts: IPost[]): AppActions => {
  return {
    type: "INIT_POSTS_SUCCESS",
    payload: allPosts
  };
};

export const initPostsFail = (error: string): AppActions => {
  return {
    type: "INIT_POSTS_FAIL",
    payload: error
  };
};

export const initPosts = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(initPostsStart());
    axios
      .get("https://simple-blog-api.crew.red/posts")
      .then(response => {
        dispatch(initPostsSuccess(response.data));
      })
      .catch(error => {
        dispatch(initPostsFail(error.message));
      });
  };
};
