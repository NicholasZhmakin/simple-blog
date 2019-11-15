import { IPost } from "./postInterface";
import { IPostDetails } from "./postInterface";

export const INIT_POSTS_START = "INIT_POSTS_START";
export const INIT_POSTS_SUCCESS = "INIT_POSTS_SUCCESS";
export const INIT_POSTS_FAIL = "INIT_POSTS_FAIL";

export const GET_DETAILS_SUCCESS = "GET_DETAILS_SUCCESS";
export const GET_DETAILS_FAIL = "GET_DETAILS_FAIL";

export interface InitPostsStartAction {
  type: typeof INIT_POSTS_START;
}

export interface InitPostsSuccessAction {
  type: typeof INIT_POSTS_SUCCESS;
  payload: IPost[];
}

export interface InitPostsFailAction {
  type: typeof INIT_POSTS_FAIL;
  payload: string;
}

export interface GetDetailsSuccessAction {
  type: typeof GET_DETAILS_SUCCESS;
  payload: IPostDetails;
}

export interface GetDetailsFailAction {
  type: typeof GET_DETAILS_FAIL;
  payload: string;
}

export type PostActionTypes =
  | InitPostsStartAction
  | InitPostsSuccessAction
  | InitPostsFailAction
  | GetDetailsSuccessAction
  | GetDetailsFailAction;

export type AppActions = PostActionTypes;
