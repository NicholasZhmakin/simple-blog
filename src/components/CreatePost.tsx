import React, { useState } from "react";
import uuid from "uuid";
import { createPost } from "../actions/createPost";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IPost } from "../types/postInterface";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";
import { AppState } from "../store/store";

interface CreatePostProps {}

interface NewPost {
  id: string;
  title: string;
  body: string;
}

type Props = CreatePostProps & LinkStateProps & LinkDispatchProps;

const CreatePost: React.FC<Props> = ({ onCreateNewPost, ownProps }) => {
  const [newPost, setNewPost] = useState<NewPost>({
    id: "",
    title: "",
    body: ""
  });

  const handelChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void = e => {
    const id = uuid.v4();
    setNewPost({
      ...newPost,
      id,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = e => {
    e.preventDefault();
    if (!newPost.title || !newPost.body) {
      alert("The fields cant be empty");
      return false;
    } else {
      onCreateNewPost(newPost);
      ownProps.history.push("/");

      setNewPost({
        id: "",
        title: "",
        body: ""
      });
    }
  };

  const { title, body } = newPost;

  return (
    <Container>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="title">Title:</label>
        <input onChange={handelChange} value={title} id="title" type="text" />
        <label htmlFor="body">Body:</label>
        <textarea onChange={handelChange} value={body} id="body" />
        <CreateBtn onClick={handleSubmit}>
          <i className="fas fa-plus"></i>
        </CreateBtn>
      </form>
      <Link to="/">
        <i className="far fa-hand-point-left"></i>
      </Link>
    </Container>
  );
};

interface LinkStateProps {
  ownProps: any;
}

interface LinkDispatchProps {
  onCreateNewPost: (newPost: IPost) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CreatePostProps
): LinkStateProps => {
  return {
    ownProps: ownProps
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => {
  return {
    onCreateNewPost: bindActionCreators(createPost, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

const Container = styled.div`
  width: 600px;
  padding: 1em;
  margin: 5em auto;
  position: relative;
  form {
    margin: auto;
    padding: 2em;
    width: 400px;
    background: white;
    box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.5);
    input,
    textarea {
      width: 100%;
      border: 2px solid #008793;
      border-radius: 1.5em;
      padding: 0.8em;
      margin-bottom: 1em;
      overflow: hidden;
      :focus {
        background: whitesmoke;
      }
    }
    textarea {
      resize: vertical;
      height: 150px;
    }
    label {
      font-size: 1.2em;
      width: 100%;
      display: block;
      margin: 10px 0;
    }
  }
  a {
    position: absolute;
    bottom: 10px;
    left: 10px;
    text-decoration: none;
    color: white;
    font-size: 2em;
    transition: all 0.5s ease;
    :hover i {
      text-shadow: 0px 0px 10px white;
    }
  }
`;

const CreateBtn = styled.button`
  margin: 0 auto;
  display: block;
  border-radius: 50%;
  background: #008793;
  color: white;
  padding: 0.8em 1em;
  cursor: pointer;
  transition: all 0.5s ease;
  :hover {
    background: white;
    color: #008793;
  }
  i {
    font-size: 1.5em;
  }
`;
