import axios from "axios";
import { IPost } from "../types/postInterface";
import { Dispatch } from "redux";
import { initPostsSuccess, initPostsFail } from "./init";
import { AppActions } from "../types/actions";

export const createPost = (newPost: IPost) => {
  return (dispatch: Dispatch<AppActions>) => {
    axios
      .post("https://simple-blog-api.crew.red/posts", newPost, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 201) {
          axios
            .get("https://simple-blog-api.crew.red/posts")
            .then(response => {
              dispatch(initPostsSuccess(response.data));
            })
            .catch(error => {
              dispatch(initPostsFail(error.message));
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
