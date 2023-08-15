import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core'; 
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

import { updatePost, createPost } from '../../actions/posts'; // needs to look at actions


const LabItemForm = () => {
  const [category, setCategory] = useState('');
  const [logData, setLogData] = useState({
    name: '',
    unit_quantity: '',
    location: '',
    shelf_life: '',
    vendor: '',
    description: '',
    category: '', 
    creator: ''
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const clear = () => {
    setLogData({ name: '',
    unit_quantity: '',
    location: '',
    shelf_life: '',
    vendor: '',
    description: '',
    category: '', 
    creator: ''});
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderAdditionalFields = () => {
    if (!category) {
      return null; // No additional fields if no category selected
    }

    const categorySchema = mongoose.model(category);
    const schemaPaths = Object.keys(categorySchema.schema.paths);

    return schemaPaths
      .filter((path) => path !== '_id' && path !== '__v') // Exclude common fields
      .map((path) => (
        <div key={path}>
          <input
            type="text"
            name={path}
            placeholder={path}
            onChange={handleInputChange}
          />
        </div>
      ));
  };

  return (
    <form>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="Chemical">Chemical</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      {renderAdditionalFields()}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LabItemForm;
