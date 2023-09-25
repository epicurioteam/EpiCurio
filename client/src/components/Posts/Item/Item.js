import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../../actions/labItem";

import useStyles from "./styles";

const Item = ({ item, setCurrentId }) => {
  // aitem is actually props.aitem - sa props object is passed into functional component to define properties and their values for the object.
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={item.selectedFile}
        title={item.title}
      />

      <div className={classes.overlay}>
        <Typography variant="h6">{item.creator}</Typography>
        <Typography variant="body2">
          {moment(new Date(item.createdAt)).fromNow()}
        </Typography>
      </div>

      {/* 'more' button that is used to edit a item */}
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(item._id);
            console.log(`currentId changed to: ${item._id}`);
          }}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>
        {item.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {item.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likeitem(item._id));
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {item.likeCount}
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteItem(item._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
