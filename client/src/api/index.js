import axios from "axios";

const url = "http://localhost:5000/posts";

const urlItem = "http://localhost:5000/item";

const urlAdmin = "http://localhost:5000/admin";

export const signIn = (formData) => axios.post("/user/signin", formData);

export const signUp = (formData) => axios.post("/user/signup", formData);

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const fetchCategoryFields = (category) => axios.get(`${urlItem}/${category}`);

export const createNewCategory = (newCategory) => axios.post(`${urlAdmin}`, newCategory);

export const saveItem = (newItem) => axios.post(urlItem, newItem);

export const fetchCategory = () => axios.get(`${urlAdmin}/categories`);