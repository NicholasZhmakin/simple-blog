import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Default = props => {
    return (
        <Message>
            <div>
                <h1>404</h1>
                <h2>error</h2>
                <h3>page not found</h3>
                <h4>
                    the requester URL
                    <span>{props.location.pathname} </span>
                    was not found
                </h4>
                <Link to="/">
                    <i className="far fa-hand-point-left"></i>
                </Link>
            </div>
        </Message>
    );
};

export default Default;

const Message = styled.div`
    margin: 200px auto;
    width: 400px;
    padding: 20px;
    background: white;
    text-align: center;
    border-radius: 0.3em;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
    border-left: 5px solid black;
    span {
        color: red;
    }
    a {
        text-decoration: none;
        color: #800d20;
        font-size: 2em;
        transition: all 0.5s ease;
        :hover i {
            text-shadow: 0px 0px 10px #800d20;
        }
    }
`;
