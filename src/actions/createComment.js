import axios from "axios";
import { getDetails } from "./getDetails";

export const createComment = newComment => {
  return dispatch => {
    axios
      .post("https://simple-blog-api.crew.red/comments", newComment, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        dispatch(getDetails(newComment.postId));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
