import { Container, Grow, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import NavBar from "../Navbar/Navbar";

const Home = () => {
  // Object with properties that are objects that define CSS classes
  const classes = useStyles();

  // useDispatch() returns a function that can be used to dispatch action function.
  const dispatch = useDispatch();

  // define a state with a post id of the current post that the user is interacting with
  const [currentId, setCurrentId] = useState(0);

  // dispatch(getPosts()) is executed each time the component is initialized or re-rendered
  useEffect(() => {
    dispatch(getPosts());
    // console.log("Posts are fetched from db")
  }, [currentId, dispatch]);

  return (
    <>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
