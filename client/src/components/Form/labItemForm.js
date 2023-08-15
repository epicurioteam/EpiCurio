import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core'; 
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { fetchCategoryFields } from '../../actions/labItem.js';

import { updatePost, createPost } from '../../actions/posts'; // needs to look at actions


const LabItemForm = () => {
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
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
    setFormData({ name: '',
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
    dispatch(fetchCategoryFields(category));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="glassPlasticWare">glassPlasticWare</option>
          <option value="electronics">electronics</option>
          <option value="safetyEquipment">safetyEquipment</option>
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
      {/* {renderAdditionalFields()} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LabItemForm;
