import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  title: string;
  body: string;
  id: string;
}

const Post: React.FC<Props> = ({ title, body, id }) => {
  return (
    <PostCard>
      <Link to={"/posts/" + id}>
        <h2>{title}</h2>
      </Link>
      <p>{body}</p>
    </PostCard>
  );
};

export default Post;

const PostCard = styled.div`
  margin: 20px;
  padding: 20px;
  background: white;
  text-align: justify;
  border-radius: 0.3em;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
  border-left: 5px solid black;
  a {
    text-decoration: none;
    color: black;
    text-align: center;
    font-family: "Teko", sans-serif;
    :hover {
      color: grey;
    }
  }
`;
