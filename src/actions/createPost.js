import axios from "axios";
import { initPosts } from "./init";

export const createPost = newPost => {
  return dispatch => {
    axios
      .post("https://simple-blog-api.crew.red/posts", newPost, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        dispatch(initPosts());
      })
      .catch(error => {
        console.log(error);
      });
  };
};
