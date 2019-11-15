import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import EditPost from "./EditPost";
import CreateComment from "./CreateComment";
import { getDetails } from "../actions/getDetails";
import { deletePost } from "../actions/deletePost";
import { editPost } from "../actions/editPost";
import styled from "styled-components";
import { IPostDetails, IPostEdit } from "../types/postInterface";
import { AppState } from "../store/store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";

interface PostDetailsProps {}

type Props = PostDetailsProps & LinkStateProps & LinkDispatchProps;

const PostDetails: React.FC<Props> = ({
  detailsPost,
  detailsError,
  ownProps,
  onGetDetails,
  onDeletePost,
  onEditPost
}) => {
  const [editMode, setEditMode] = useState<Boolean>(false);

  useEffect(() => {
    onGetDetails(ownProps.match.params.id);
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    if (detailsPost !== null) {
      onDeletePost(detailsPost.id);
      ownProps.history.push("/");
    }
  };

  if (detailsPost) {
    const { id, title, body, comments } = detailsPost;
    return (
      <Container>
        {!editMode ? null : (
          <EditPost
            id={id}
            title={title}
            body={body}
            setEditMode={handleEdit}
            onEditPost={onEditPost}
          />
        )}
        <MainInfo>
          <DeleteBtn onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </DeleteBtn>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <EditBtn onClick={handleEdit}>
              Edit<i className="fas fa-edit"></i>
            </EditBtn>
          </div>
          <CreateComment postId={id} />
          <Comments>
            {comments.map(comment => (
              <Comment key={comment.id} body={comment.body} />
            ))}
          </Comments>
        </MainInfo>

        <Link to="/">
          <i className="far fa-hand-point-left"></i>
        </Link>
      </Container>
    );
  } else if (detailsError) {
    return (
      <Container>
        <MainInfo>
          <h2>No such post...</h2>
          <p>{detailsError}</p>
        </MainInfo>
        <Link to="/">
          <i className="far fa-hand-point-left"></i>
        </Link>
      </Container>
    );
  } else {
    return (
      <Container>
        <MainInfo>
          <h1>Loading...</h1>
        </MainInfo>
      </Container>
    );
  }
};

interface LinkStateProps {
  ownProps: any;
  detailsPost: IPostDetails | null;
  detailsError: string | null;
}

interface LinkDispatchProps {
  onGetDetails: (id: string) => void;
  onDeletePost: (id: string) => void;
  onEditPost: (id: string, editedPost: IPostEdit) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: PostDetailsProps
): LinkStateProps => {
  return {
    ownProps: ownProps,
    detailsPost: state.detailsPost,
    detailsError: state.detailsError
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => {
  return {
    onEditPost: bindActionCreators(editPost, dispatch),
    onGetDetails: bindActionCreators(getDetails, dispatch),
    onDeletePost: bindActionCreators(deletePost, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

const Container = styled.section`
  width: 800px;
  padding: 2em;
  margin: 5em auto;
  position: relative;
  text-align: justify;
  h2 {
     text-align: center;
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
`;

const MainInfo = styled.div`
  position: relative;
  margin: 20px;
  padding: 20px;
  background: white;
  text-align: justify;
  border-radius: 0.3em;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
  border-left: 5px solid black;
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: rgb(107, 6, 6);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;
  :hover i {
    color: rgb(180, 7, 7);
  }
  i {
    font-size: 1.5em;
  }
`;

const EditBtn = styled.button`
  margin: 1em auto;
  display: block;
  color: #ffa600;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;
  font-size: 1em;
  text-transform: uppercase;
  :hover {
    color: #ad7101;
  }
  i {
    margin-left: 5px;
    font-size: 1.5em;
  }
`;

const Comments = styled.div`
  margin: auto;
  width: 350px;
`;
