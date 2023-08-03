import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles'

const Post = ({post, setCurrentId}) => { // apost is actually props.apost - sa props object is passed into functional component to define properties and their values for the object. 
    const classes = useStyles();

    const dispatch = useDispatch()

    return (
        <Card className={classes.card}>

            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>

            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {/* 'more' button that is used to edit a post */}
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentId(post._id); console.log(`currentId changed to: ${post._id}`)}}>
                    <MoreHorizIcon fontSize='medium'/>
                </Button>
            </div>

            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag.trim()} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>
                    {post.title}
                </Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p' gutterBottom>
                        {post.message}
                    </Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => {dispatch(likePost(post._id))}}>
                    <ThumbUpAltIcon fontSize='small'/>
                    &nbsp;
                    Like 
                    &nbsp;
                    {post.likeCount}
                </Button>

                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small'/>
                    Delete
                </Button>
            </CardActions>

        </Card>
    )
}

export default Post;