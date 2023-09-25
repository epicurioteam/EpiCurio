import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Item from "./Item/Item";

import useStyles from "./styles";

const Items = ({ setCurrentId }) => {
  // choose from the global state the 'items' object
  // Subscribe to 'items' data of the redux store so that whenever there's a change, the component re-renders.
  const items = useSelector((state) => state.items);
  const classes = useStyles();

  return (
    /* react-fragments <></> to add multiple things
        <>
            <h1> POST</h1>
            <Post></Post>
            <Post></Post>
        </> */
    !items.length ? (
      <CircularProgress />
    ) : (
      <Grid
        className={classes.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {items.map((item) => (
          <Grid key={item._id} item xs={12} sm={6}>
            <Item item={item} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Items;
