const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

//GET BACK ALL THE POSTS
router.get('/',async (req,res)=>{
  try{
    const posts = await Post.find();
    res.json(posts);

  }catch(error){
    res.json({message: error});

  }
  

});

//set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

  }
});
///init upload
const uploads = multer({
  storage: storage
}).single('image');

//file upload
router.post('/uploads', (req,res)=>{
  res.send('the file will send');
});

//create posts
router.post('/',async (req,res)=>{
  const post = new Post({
   title: req.body.title,
    description: req.body.description
  });
    
  try{
    const savedPost = await post.save()
    res.json(savedPost);
  }
  catch(error){
     res.json({message: error});
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