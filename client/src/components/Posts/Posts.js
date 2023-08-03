import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    // choose from the global state the 'posts' object 
    // Subscribe to 'posts' data of the redux store so that whenever there's a change, the component re-renders.
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        /* react-fragments <></> to add multiple things
        <>
            <h1> POST</h1>
            <Post></Post>
            <Post></Post>
        </> */
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}      
            </Grid>
        )
    )
}

export default Posts;