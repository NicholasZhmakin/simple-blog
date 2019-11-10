import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as init from '../actions/init';
import Post from './Post';

const Main = ({ loading, error, posts, onInit }) => {
    useEffect(() => {
        onInit();
    }, []);

    if (loading || posts === undefined) {
        return (
            <Message>
                <h3>Loading...</h3>
            </Message>
        );
    } else if (error) {
        return (
            <Message>
                <h3>{error}</h3>
            </Message>
        );
    } else {
        return (
            <ContainerMain>
                <header>
                    <h1>Choose post</h1>
                    <Create>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/posts/new">
                            Create new post
                        </Link>
                    </Create>
                </header>

                <Grid>
                    {posts.length === 0 ? (
                        <h1>No post to show</h1>
                    ) : (
                        posts.map(post => <Post key={post.id} title={post.title} body={post.body} id={post.id} />)
                    )}
                </Grid>
            </ContainerMain>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        posts: state.posts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInit: () => {
            dispatch(init.initPosts());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const ContainerMain = styled.section`
    header {
        margin: 0 auto;
        padding: 1em;
        width: 500px;
        display: grid;
        grid-gap: 1.5em;
    }
    h1 {
        margin: 0 auto;
        color: white;
        font-size: 3.5em;
        font-family: 'ZCOOL XiaoWei', serif;
    }
`;

const Create = styled.div`
    margin: 0 auto;
    a {
        padding: 0.8em 1.2em;
        display: block;
        text-decoration: none;
        font-size: 1.2em;
        background: grey;
        font-weight: bold;
        border: 2px solid white;
        border-radius: 2em;
        transition: all 0.5s ease;
        cursor: pointer;
        :hover {
            background: #5e5d5d;
        }
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 1.2em;
    padding: 2em;
`;

const Message = styled.div`
    margin: 200px auto;
    width: 400px;
    padding: 20px;
    background: white;
    text-align: justify;
    border-radius: 0.3em;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
    border-left: 5px solid black;
`;
