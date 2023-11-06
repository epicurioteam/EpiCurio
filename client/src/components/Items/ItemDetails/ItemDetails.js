import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemDetails } from "../../../actions/labItem";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  //const [itemDetails, setItemDetails] = useState(null);
  const itemDetails = useSelector((state) => state.items.itemDetails);
  console.log("Item details:", itemDetails);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchItemDetails(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
        setLoading(false);
      });
  }, [dispatch, id]);

  if (itemDetails) {
    console.log("Item details:", itemDetails);
  }

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!itemDetails) {
    return (
      <Container>
        <Typography variant="h5">Item not found.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5">{itemDetails.name}</Typography>
          <Typography variant="subtitle1">
            Category: {itemDetails.category}
          </Typography>
          <Typography variant="body1">
            Description: {itemDetails.description}
          </Typography>
          {/* Add more item details as needed */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ItemDetails;
