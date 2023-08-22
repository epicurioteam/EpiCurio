import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Input from "../Auth/Input.js";
import useStyles from "../Auth/styles";

const CategoryForm = () => {
  const [attributes, setAttributes] = useState([]);

  const classes = useStyles();

  const addAttribute = () => {
    const newAttribute = { name: '', type: '' };
    setAttributes([...attributes, newAttribute]);
  };

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5">Add New Category</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* Inputs that gets rendered*/}
                <Grid item xs={12}>
                    <Input 
                        name="categoryName"
                        label="Category Name"
                        handleChange={handleChange}
                        autoFocus
                    />
                </Grid>

                {
                  attributes.map((attribute, index) => (
                    <Grid item xs={12} key={index} className="flex flex-row space-x-3">
                      <Input
                        name={`attribute${index}Name`}
                        label={`Attribute ${index} Name`}
                        handleChange={handleChange}
                        type='text'
                      />
                      <Input
                        name={`attribute${index}Type`}
                        label={`Attribute ${index} Type`}
                        handleChange={handleChange}
                        type='text'
                      />
                    </Grid> ))
                  }

                <Grid item xs={12} className={classes.buttonContainer}>
                {/* Add Attribute button */}
                    <Button
                        onClick={addAttribute}
                        variant="contained"
                        color="primary"
                        justifycontent='flex-end'
                    >
                        Add Attribute
                    </Button>
                </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  );
    // const [attributes, setAttributes] = useState([]);
  
    // function addAttribute() {
    //   const newAttribute = { name: '', type: '' };
    //   setAttributes([...attributes, newAttribute]);
    // }
  
    // function handleAttributeChange(index, key, value) {
    //   const updatedAttributes = [...attributes];
    //   updatedAttributes[index][key] = value;
    //   setAttributes(updatedAttributes);
    // }
  
    // return (
    //   <div>
    //     <form>
    //       {attributes.map((attribute, index) => (
    //         <div key={index}>
    //           <input
    //             type="text"
    //             value={attribute.name}
    //             placeholder="Attribute Name"
    //             onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
    //           />
    //           <input
    //             type="text"
    //             value={attribute.type}
    //             placeholder="Attribute Type"
    //             onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
    //           />
    //         </div>
    //       ))}
    //     </form>
    //     <button type="button" onClick={addAttribute}>
    //       Add Attribute
    //     </button>
    //   </div>
    // );
};

export default CategoryForm;
