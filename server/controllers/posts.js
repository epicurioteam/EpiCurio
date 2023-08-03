import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';
// import mongoose object model 

export const getPosts = async (req, res) => {
    try {

        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    }
    catch (error) 
    {
        res.status(404).json({ message: error.message })
    }   
}

export const createPost =  async (req, res) => {
    const { creator, title, message, tags, selectedFile } = req.body;

    const newPostMessage = new PostMessage({ creator, title, message, tags, selectedFile});

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // {...} - object destrucring. rename is possible.
    const { id: _id } = req.params;

    // sent from front end api - the to-be-updated version of the post 
    const { ...post } = req.body;

    console.log(_id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post with that id: ${_id}`);
    }

    const updatedPost = { ...post, _id };

    await PostMessage.findByIdAndUpdate(_id, updatedPost, {new: true});

    res.json(updatedPost);
}

// https://www.restapitutorial.com/httpstatuscodes.html 

export const deletePost = async (req, res) => {
    const { id: _id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post with that id: ${_id}`);
    }

    const deletedPost = await PostMessage.findByIdAndDelete(_id);

    res.json(deletedPost);
}
export const likePost = async (req, res) => {
    const { id: _id  } =  req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post with that id: ${_id}`);
    }

    const post = await PostMessage.findById(_id);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}