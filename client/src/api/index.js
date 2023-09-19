import axios from "axios";

const urlItem = "http://localhost:5000/item";

const urlAdmin = "http://localhost:5000/admin";

// Auth
export const signIn = (formData) => axios.post("/user/signin", formData);

export const signUp = (formData) => axios.post("/user/signup", formData);

// items actions
export const fetchCategoryFields = (category) =>
  axios.get(`${urlItem}/${category}`);

export const fetchItems = () => axios.get(urlItem);

export const saveItem = (newItem) => axios.post(urlItem, newItem);

export const updateItem = (id, updatedItem) =>
  axios.patch(`${urlItem}/${id}`, updatedItem);

export const deleteItem = (id) => axios.delete(`${urlItem}/${id}`);

// Category definition and retrieval
export const createNewCategory = (newCategory) =>
  axios.post(`${urlAdmin}`, newCategory);

export const fetchCategory = () => axios.get(`${urlAdmin}/categories`);
