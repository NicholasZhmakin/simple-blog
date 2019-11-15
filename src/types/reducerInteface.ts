import { IPost, IPostDetails } from "./postInterface";

export interface IReducer {
  loading: boolean;
  error: string | null;
  posts: IPost[] | null;
  detailsPost: IPostDetails | null;
  detailsError: string | null;
}
