import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core'; 
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { updatePost, createPost } from '../../actions/posts';

// GET THE CURRENT ID
 
const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });
    // use the global posts array and assign the post with same ID as currentID, if not, var post = null
    const post = useSelector((state) => (currentId != 0 ? state.posts.find((message) => message._id === currentId) : null));

    const classes = useStyles();
    const dispatch = useDispatch();

    // if there's a post that being interacted with, make PostData the same as that post 
    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId == 0)  {
                dispatch(createPost(postData)); 
                clear();
            }
        else {
            dispatch(updatePost(currentId, postData));
            clear();
        }
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{!post ? 'Creating a Memory' : `Editing ${post.title}`}</Typography>
                <TextField 
                    name='creator' variant='outlined' label='Creator'
                    fullWidth 
                    value={postData.creator} // which can be nothing
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField 
                    name='title' variant='outlined' label='Title'
                    fullWidth 
                    value={postData.title} // which can be nothing
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField 
                    name='message' variant='outlined' label='Message'
                    fullWidth 
                    multiline
                    value={postData.message} // which can be nothing
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField 
                    name="tags"
                    variant="outlined" 
                    label="Tags" fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false} 
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;