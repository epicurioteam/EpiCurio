import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { fetchCategoryFields, saveItem, fetchCategory} from "../../actions/labItem.js";

import { updatePost, createPost } from "../../actions/posts";
import Input from "../Auth/Input.js";
import { configureStore } from "@reduxjs/toolkit";
import labItemReducer from "../../reducers/labItemForm.js";

import useStyles from "../Auth/styles";

const LabItemFormWrapper = () => {
  const store = configureStore({ reducer: labItemReducer });

  return (
    <Provider store={store}>
      <LabItemForm />
    </Provider>
  );
};

const LabItemForm = () => {
  const categories = useSelector((state) => state.categories);

  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    unit_quantity: "",
    location: "",
    shelf_life: "",
    vendor: "",
    description: "",
    creator: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const itemAttributes = useSelector((state) => state.itemFields);

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

  const handleSubmit = () => {
    dispatch(saveItem(formData));
  };

  const handleCategoryChange = (e) => {
    let newCategory = e.target.value;
    setCategory(newCategory);
    console.log(category);
    setFormData({ ...formData, category: newCategory });
  };

  useEffect(() => {
    dispatch(fetchCategory());
    console.log("categories are fetched");
  }, [fetchCategory]);

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryFields(category));
    }
    console.log(`${category} category fields are fetched`);
  }, [category, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
      {/* <form className={classes.form} onSubmit={} > */}
      <Grid container spacing={2}>
        <div>
          <label className="font-bold" htmlFor="category">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}>
            <option disabled>Select a category</option>
            {
              categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))
            }
            {/* <option value="glassPlasticWare">glassPlasticWare</option>
            <option value="electronic">electronic</option>
            <option value="safetyEquipment">safetyEquipment</option>
            <option value="squaretriangle">squaretriangle</option> */}
          </select>
        </div>

        {/* render the fields returned by the category */}
        {itemAttributes 
          .filter(
            (attribute) => 
              attribute !== "_id" &&
              attribute !== "createdAt" &&
              attribute !== "__v" &&
              attribute !== "category" 
          )
          .map((attribute) => (
            <Input
              key={`${attribute}`}
              type="string"
              name={`${attribute}`}
              label={`${attribute}`}
              handleChange={handleInputChange}
            />
          ))}
      </Grid>
      {/* {renderAdditionalFields()} */}
      <button onClick={handleSubmit}>Submit</button>
      {/* </form> */}
    </>
  );
};

export default LabItemFormWrapper;
