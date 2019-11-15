import axios from "axios";
import { getDetailsFail, getDetailsSuccess } from "./getDetails";
import { IPostEdit } from "../types/postInterface";
import { Dispatch } from "redux";
import { AppActions } from "../types/actions";

export const editPost = (id: string, editedPost: IPostEdit) => {
  return (dispatch: Dispatch<AppActions>) => {
    axios
      .put(`https://simple-blog-api.crew.red/posts/${id}`, editedPost, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 200) {
          axios
            .get(
              `https://simple-blog-api.crew.red/posts/${id}?_embed=comments`,
              {
                params: { _embed: "comments" }
              }
            )
            .then(response => {
              dispatch(getDetailsSuccess(response.data));
            })
            .catch(error => {
              dispatch(getDetailsFail(error.message));
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
