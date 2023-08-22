import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
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
import { createCategory } from "../../actions/admin.js";

const CategoryForm = () => {
  const [formData, setFormData] = useState({ categoryName: '', categoryDefinition: {}});
  const [attributes, setAttributes] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const addAttribute = () => {
    const newAttribute = { name: '', type: '' };
    setAttributes([...attributes, newAttribute]);
  };

  const handleNameChange = (value) => {
    const updatedName = value;
    setFormData({...formData, categoryName: `${updatedName}`});
  }

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
      updatedAttributes[index][key] = value;
      setAttributes(updatedAttributes);
      setFormData({...formData, categoryDefinition: attributes});
      console.log(formData);
  };

  const handleSubmit = () => {
    dispatch(createCategory(formData));
  };

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
                        handleChange={(e) => handleNameChange(e.target.value)}
                        autoFocus
                    />
                </Grid>

                {
                  attributes.map((attribute, index) => (
                    <Grid item xs={12} key={index} className="flex flex-row space-x-3">
                      <Input
                        name={`attribute${index}Name`}
                        label={`Attribute ${index} Name`}
                        handleChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                        type='text'
                      />
                      <Input
                        name={`attribute${index}Type`}
                        label={`Attribute ${index} Type`}
                        handleChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
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

                <Grid item xs={12} className={classes.buttonContainer}>
                {/* Add submit button */}
                    <Button
                        variant="contained"
                        color="primary"
                        justifycontent='flex-start'
                        type='submit'
                    >
                        Submit
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
