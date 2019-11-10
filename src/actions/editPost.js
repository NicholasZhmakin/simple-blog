import axios from "axios";
import { getDetails } from "./getDetails";

export const editPost = (id, editedPost) => {
  return dispatch => {
    axios
      .put(`https://simple-blog-api.crew.red/posts/${id}`, editedPost, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        dispatch(getDetails(id));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
