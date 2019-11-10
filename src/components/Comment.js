import React from 'react';
import styled from 'styled-components';

const Comment = ({ body }) => {
    return (
        <CommentCard>
            <span>{body}</span>
        </CommentCard>
    );
};

export default Comment;

const CommentCard = styled.div`
    margin: 10px;
    padding: 5px;
    color: white;
    border-radius: 0.4em;
    background: #01a7ad;
`;
