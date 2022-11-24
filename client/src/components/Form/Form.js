
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost , updatePost} from "../../actions/posts";


const Form = ({ currentId, setCurrentId }) => {
  
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]); 

  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      
    } else {
      
      dispatch(createPost({...postData,name:user?.result?.name}));
      
    }
    clear()
  };
  const clear = () => {
    setCurrentId(null)
    setPostData({title:'',message:'',tags:'',selectedFile:''})
  };

  if(!user?.result?.name){
    return(
      <Paper className="classes.paper">
        <Typography variant="h6" align="center">
          Please Sign In to create your own Post and like other's posts.
          </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>Creating a Post</Typography>
        
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          required
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          multiline rows={4} 
          value={postData.message}
          required
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          require
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            required
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
