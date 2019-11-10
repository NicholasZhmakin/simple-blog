import React, { useState } from 'react';
import uuid from 'uuid';
import { createPost } from '../actions/createPost';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CreatePost = ({ onCreateNewPost }) => {
    const [newPost, setNewPost] = useState({
        id: '',
        title: '',
        body: '',
    });

    const handelChange = e => {
        const id = uuid.v4();
        setNewPost({
            ...newPost,
            id,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!newPost.title || !newPost.body) {
            alert('The fields cant be empty');
            return false;
        } else {
            onCreateNewPost(newPost);
            setNewPost({
                id: '',
                title: '',
                body: '',
            });
        }
    };

    const { title, body } = newPost;

    return (
        <Container>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="">Title:</label>
                <input onChange={handelChange} value={title} name="title" type="text" />
                <label htmlFor="">Body:</label>
                <input onChange={handelChange} value={body} name="body" type="text" />
                <button onClick={handleSubmit}>
                    <i className="fas fa-plus"></i>
                </button>
            </form>
            <Link to="/">
                <i className="far fa-hand-point-left"></i>
            </Link>
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewPost: newPost => {
            dispatch(createPost(newPost));
        },
    };
};

export default connect(null, mapDispatchToProps)(CreatePost);

const Container = styled.div`
    width: 600px;
    padding: 1em;
    margin: 5em auto;
    position: relative;
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
            overflow: hidden;
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
