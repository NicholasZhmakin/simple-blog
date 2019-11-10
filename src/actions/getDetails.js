import axios from "axios";

export const getDetailsSuccess = detailsPost => {
  return {
    type: "GET_DETAILS_SUCCESS",
    payload: detailsPost
  };
};

export const getDetailsFail = detailsError => {
  return {
    type: "GET_DETAILS_FAIL",
    payload: detailsError
  };
};

export const getDetails = id => {
  return dispatch => {
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
