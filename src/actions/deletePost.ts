import axios from "axios";
import { initPostsSuccess, initPostsFail } from "./init";
import { Dispatch } from "redux";
import { AppActions } from "../types/actions";

export const deletePost = (id: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    axios
      .delete(`https://simple-blog-api.crew.red/posts/${id}`)
      .then(response => {
        console.log(response);
        axios
          .get("https://simple-blog-api.crew.red/posts")
          .then(response => {
            dispatch(initPostsSuccess(response.data));
          })
          .catch(error => {
            dispatch(initPostsFail(error.message));
          });
      })
      .catch(error => {
        console.log(error);
        axios
          .get("https://simple-blog-api.crew.red/posts")
          .then(response => {
            dispatch(initPostsSuccess(response.data));
          })
          .catch(error => {
            dispatch(initPostsFail(error.message));
          });
      });
  };
};
