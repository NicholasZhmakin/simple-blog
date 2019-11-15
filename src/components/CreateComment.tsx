import React, { useState } from "react";
import { connect } from "react-redux";
import { createComment } from "../actions/createComment";
import styled from "styled-components";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";
import { ICommentCreate } from "../types/postInterface";

interface CreateCommentProps {
  postId: string;
}

interface NewComment {
  postId: string;
  body: string;
}

type Props = CreateCommentProps & LinkDispatchProps;

const CreateComment: React.FC<Props> = ({ postId, onCreateComment }) => {
  const [newComment, setNewComment] = useState<NewComment>({
    postId: postId,
    body: ""
  });

  const handelChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = e => {
    setNewComment({
      ...newComment,
      postId: postId,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = e => {
    e.preventDefault();
    if (!newComment.body) {
      alert("The field cant be empty");
      return false;
    } else {
      onCreateComment(newComment);
      setNewComment({
        postId: "",
        body: ""
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handelChange}
          value={newComment.body}
          id="body"
          type="text"
        />
        <button onClick={handleSubmit}>
          Add comment <i className="far fa-address-card"></i>
        </button>
      </form>
    </Container>
  );
};

interface LinkDispatchProps {
  onCreateComment: (newComment: ICommentCreate) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => {
  return {
    onCreateComment: bindActionCreators(createComment, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(CreateComment);

const Container = styled.div`
  form {
    margin: auto;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 1.2em;
    padding: 2em;
    justify-content: center;
    align-content: center;
    input {
      padding: 0.5em;
    }
    button {
      background: #01ad5d;
      border: 3px solid #01ad5d;
      color: white;
      cursor: pointer;
      font-size: 0.8em;
      font-weight: bold;
      :hover {
        background: none;
        color: #01ad5d;
      }
      i {
        font-size: 1em;
        margin-left: 5px;
      }
    }
  }
`;
