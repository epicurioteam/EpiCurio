import React, { useEffect } from "react";
import { Typography, Card, CardContent, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemDetails } from "../../../actions/labItem";
import { useLocation } from "react-router-dom";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  //const itemDetails = location.state.item;
  const itemDetails = useSelector((state) => state.items.itemDetails); // Access the itemDetails property from the state
  console.log(itemDetails);

  useEffect(() => {
    console.log("Fetching item details for ID:", id);
    dispatch(fetchItemDetails(id))
      .then((response) => {
        console.log("Item details response:", response);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [dispatch, id]);

  if (!itemDetails) {
    return (
      <Container>
        <Typography variant="h5">Loading...</Typography>
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
