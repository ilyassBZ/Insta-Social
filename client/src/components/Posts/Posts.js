import React from "react";
import Post from "./Post/Posts";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
     {posts.map((post) => (
		
         <Grid key={post._id} item xs={12} sm={6}> 
				 <Post post={post} setCurrentId={setCurrentId}/>
				 </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
