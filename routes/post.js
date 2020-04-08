const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

const path = require('path');

//GET BACK ALL THE POSTS
router.get('/', async (req,res)=>{
  
  try{
    const posts= await Post.find();
    res.render('./post/index', {
      posts: posts

    });

  }catch(error){
    res.json({message: error});

  }

});

router.get('/add', (req, res) => {
  res.render('./post/add');
});


//create posts
router.post('/add',async (req,res)=>{
 const posts = new Post({
    title: req.body.title,
    author: req.body.author,
    story: req.body.story
 });
  // posts.title= req.body.title;
   // posts.author= req.body.author;
   // posts.story= req.body.story;
 
 try {
    await posts.save();
    res.redirect('/posts'); 
 } catch (error) {
   res.json({ message: error });
 }
});


//get back a specific post
router.get('/:id', async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id);
    res.json(post);
  }catch(error){
    res.json({message: error});

  }
  
});



//remove posts
router.delete('/:id', async (req, res)=>{
  try{
    const removedPost = await Post.deleteOne({ _id: req.params.id });
    res.json(removedPost);
  }catch(error){
    res.json({message:error});
  }
     
});
  
module.exports = router;