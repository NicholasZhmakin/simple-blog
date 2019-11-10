import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../actions/editPost';
import styled from 'styled-components';

const EditPost = ({ id, title, body, setEditMode, onEditPost }) => {
    const [editPost, setEditPost] = useState({
        title: title,
        body: body,
    });

    const handelChange = e => {
        setEditPost({
            ...editPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!editPost.title || !editPost.body) {
            alert('The fields cant be empty');
            return false;
        } else {
            onEditPost(id, editPost);
            setEditMode();
            setEditPost({
                id: '',
                title: '',
                body: '',
            });
        }
    };

    const handleOutsideModal = e => {
        if (e.target.classList.contains('modal')) {
            setEditMode();
        }
    };

    return (
        <Modal className="modal" onClick={handleOutsideModal}>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="">New title:</label>
                <input onChange={handelChange} value={editPost.title} name="title" type="text" />
                <label htmlFor="">New body:</label>
                <input onChange={handelChange} value={editPost.body} name="body" type="text" />
                <button onClick={handleSubmit}>
                    <i className="fas fa-save"></i>
                </button>
            </form>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onEditPost: (id, editedPost) => {
            dispatch(editPost(id, editedPost));
        },
    };
};

export default connect(null, mapDispatchToProps)(EditPost);

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
        padding: 2em;
        width: 400px;
        background: white;
        box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.5);
        input {
            width: 100%;
            border: 2px solid #008793;
            border-radius: 1.5em;
            padding: 0.8em;
            margin-bottom: 1em;
            :focus {
                background: whitesmoke;
            }
        }
        label {
            font-size: 1.2em;
            width: 100%;
            display: block;
            margin: 10px 0;
        }
        button {
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
        }
    }
`;
