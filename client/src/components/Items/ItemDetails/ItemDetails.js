import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
  Box,
  Divider,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Grid from "@material-ui/core/Grid";
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
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress size={80} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!itemDetails) {
    return (
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          textAlign="center"
        >
          <ErrorOutlineIcon color="secondary" style={{ fontSize: 60 }} />
          <Typography variant="h5" color="textSecondary">
            Item not found.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Box mb={2}>
            <Typography variant="h4" component="div" color="textPrimary">
              {itemDetails.name}
            </Typography>
          </Box>
          <Divider />
          <Box mt={2} mb={1}>
            <Typography variant="h6" component="div" color="textSecondary">
              Category: {itemDetails.category}
            </Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <Typography variant="body1" component="div">
              Description: {itemDetails.description}
            </Typography>
          </Box>
          {/* Add more item details as needed */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ItemDetails;
