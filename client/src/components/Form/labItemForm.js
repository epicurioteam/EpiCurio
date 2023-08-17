import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { fetchCategoryFields } from "../../actions/labItem.js";

import { updatePost, createPost } from "../../actions/posts";
import Input from "../Auth/Input.js"; // needs to look at actions
import { configureStore } from "@reduxjs/toolkit";
import labItemReducer from "../../reducers/labItem";

const LabItemFormWrapper = () => {
  const store = configureStore({ reducer: labItemReducer });

  return (
    <Provider store={store}>
      <LabItemForm />
    </Provider>
  );
};

const LabItemForm = () => {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    unit_quantity: "",
    location: "",
    shelf_life: "",
    vendor: "",
    description: "",
    category: "",
    creator: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const fields = useSelector((itemFields) => itemFields);

  const clear = () => {
    setFormData({
      name: "",
      unit_quantity: "",
      location: "",
      shelf_life: "",
      vendor: "",
      description: "",
      category: "",
      creator: "",
    });
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryFields(category));
    }
  }, [category, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option disabled>Select a category</option>
            <option value="glassPlasticWare">glassPlasticWare</option>
            <option value="electronics">electronics</option>
            <option value="safetyEquipment">safetyEquipment</option>
          </select>
        </div>

        {/* render the fields returned by the category */}
        {console.log(fields)}
        {fields
          .filter((field) => field !== "_id" && field !== "__v")
          .map((field) => {
            console.log(field);

            <div key={`${field}`}>
              <Input
                type="string"
                name={`${field}`}
                handleChange={handleInputChange}
              />
            </div>;
          })}
      </Grid>
      {/* {renderAdditionalFields()} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LabItemFormWrapper;
