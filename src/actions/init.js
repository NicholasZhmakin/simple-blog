import axios from "axios";

export const initPostsStart = () => {
  return {
    type: "INIT_POSTS_START"
  };
};

export const initPostsSuccess = allPosts => {
  return {
    type: "INIT_POSTS_SUCCESS",
    payload: allPosts
  };
};

export const initPostsFail = error => {
  return {
    type: "INIT_POSTS_FAIL",
    payload: error
  };
};

export const initPosts = () => {
  return dispatch => {
    dispatch(initPostsStart());
    axios
      .get("https://simple-blog-api.crew.red/posts")
      .then(response => {
        dispatch(initPostsSuccess(response.data));
      })
      .catch(error => {
        dispatch(initPostsFail(error.message));
      });
  };
};
