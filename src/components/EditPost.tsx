import React, { useState } from "react";
import styled from "styled-components";
import { IPostEdit } from "../types/postInterface";

interface EditPostProps {
  id: string;
  title: string;
  body: string;
  setEditMode: () => void;
  onEditPost: (id: string, editedPost: IPostEdit) => void;
}

interface EditPost {
  title: string;
  body: string;
}

const EditPost: React.FC<EditPostProps> = ({
  id,
  title,
  body,
  setEditMode,
  onEditPost
}) => {
  const [editPost, setEditPost] = useState<EditPost>({
    title: title,
    body: body
  });

  const handelChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void = e => {
    setEditPost({
      ...editPost,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = e => {
    e.preventDefault();
    if (!editPost.title || !editPost.body) {
      alert("The fields cant be empty");
      return false;
    } else {
      onEditPost(id, editPost);
      setEditMode();
      setEditPost({
        title: "",
        body: ""
      });
    }
  };

  const handleOutsideModal: (
    event: React.MouseEvent<HTMLElement>
  ) => void = e => {
    if ((e.target as HTMLElement).classList.contains("modal")) {
      setEditMode();
    }
  };

  return (
    <Modal className="modal" onClick={handleOutsideModal}>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="title">New title:</label>
        <input
          onChange={handelChange}
          value={editPost.title}
          id="title"
          type="text"
        />
        <label htmlFor="body">New body:</label>
        <textarea onChange={handelChange} value={editPost.body} id="body" />
        <button onClick={handleSubmit}>
          <i className="fas fa-save"></i>
        </button>
      </form>
    </Modal>
  );
};

export default EditPost;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  form {
    margin: auto;
    padding: 5em;
    width: 600px;
    background: white;
    box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.5);
    input,
    textarea {
      width: 100%;
      border: 2px solid #008793;
      border-radius: 1.5em;
      padding: 0.8em;
      margin-bottom: 1em;
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
    button {
      margin: 1em auto;
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
    }
  }
`;
