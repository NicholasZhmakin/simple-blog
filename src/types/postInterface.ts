export interface IPost {
  id: string;
  title: string;
  body: string;
}

export interface IPostEdit {
  title: string;
  body: string;
}

export interface IPostDetails {
  id: string;
  title: string;
  body: string;
  comments: IComment[];
}

export interface IComment {
  id: string;
  postId: string;
  body: string;
}

export interface ICommentCreate {
  postId: string;
  body: string;
}
