import axios from "axios";
import { AppActions } from "../types/actions";
import { IPostDetails } from "../types/postInterface";
import { Dispatch } from "redux";

export const getDetailsSuccess = (detailsPost: IPostDetails): AppActions => {
  return {
    type: "GET_DETAILS_SUCCESS",
    payload: detailsPost
  };
};

export const getDetailsFail = (detailsError: string): AppActions => {
  return {
    type: "GET_DETAILS_FAIL",
    payload: detailsError
  };
};

export const getDetails = (id: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    axios
      .get(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`, {
        params: { _embed: "comments" }
      })
      .then(response => {
        dispatch(getDetailsSuccess(response.data));
      })
      .catch(error => {
        dispatch(getDetailsFail(error.message));
      });
  };
};
