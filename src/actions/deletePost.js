import axios from "axios";
import { initPosts } from "./init";

export const deletePost = id => {
  return dispatch => {
    axios
      .delete(`https://simple-blog-api.crew.red/posts/${id}`)
      .then(() => {
        dispatch(initPosts());
      })
      .catch(error => {
        console.log(error);
      });
  };
};
