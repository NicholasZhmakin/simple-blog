import axios from "axios";
import { getDetailsFail, getDetailsSuccess } from "./getDetails";
import { ICommentCreate } from "../types/postInterface";
import { Dispatch } from "redux";
import { AppActions } from "../types/actions";

export const createComment = (newComment: ICommentCreate) => {
  return (dispatch: Dispatch<AppActions>) => {
    axios
      .post("https://simple-blog-api.crew.red/comments", newComment, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 201) {
          axios
            .get(
              `https://simple-blog-api.crew.red/posts/${newComment.postId}?_embed=comments`,
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
