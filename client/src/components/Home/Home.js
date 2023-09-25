import { Container, Grow, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchItems } from "../../actions/labItem";
import Items from "../Posts/Items";
import useStyles from "./styles";
import NavBar from "../Navbar/Navbar";

const Home = () => {
  // Object with properties that are objects that define CSS classes
  const classes = useStyles();

  // useDispatch() returns a function that can be used to dispatch action function.
  const dispatch = useDispatch();

  // define a state with a item id of the current item that the user is interacting with
  const [currentId, setCurrentId] = useState(0);

  // dispatch(getItems()) is executed each time the component is initialized or re-rendered
  useEffect(() => {
    dispatch(fetchItems());
    // console.log("Items are fetched from db")
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
              <Items setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
