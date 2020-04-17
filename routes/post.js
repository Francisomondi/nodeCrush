const express = require('express');
const router = express.Router();
const Post = require(`../models/Post`);

const path = require('path');
const mongoose = require('mongoose');

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
router.post('/add', (req,res)=>{
 
  title= req.body.title;
   author= req.body.author;
   story= req.body.story;

   req.checkBody("title", "Title is required").notEmpty();
   req.checkBody("author", "author is required").notEmpty();
   req.checkBody("story", "story is required").notEmpty();

   const errors = req.validationErrors();
   if (errors) {
     res.render("./post/add", {
       errors: errors
     });

   }
    else {
    const posts = new Post({
      title: title,
      author: author,
      story: story
    });
      posts.save();
     req.flash("success", "post added SUCCESSFULLY");
     res.redirect("/posts");
   } 
   
});


//get back a specific post
router.get('/:id', async (req, res)=>{ 
 try{
  
    const post = await Post.findById(req.params.id);
     res.render('post/show',{
       post:post
       
     })
   }
   catch(error){
     res.json({message: error});

  }
  
});

//edit post
router.get('/edit/:id', async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);
    res.render('post/edit', {
      post: post

    })
  }
  catch (error) {
    res.json({ message: error });

  }

});

//update posts
router.post('/edit/:id', async (req, res) => {
  const posts ={};
   posts.title= req.body.title;
   posts.author= req.body.author;
   posts.story= req.body.story;

   let query = {_id: req.params.id}

  try {
    await Post.updateOne(query,posts);
     req.flash("success", "post updated Successfuly");
    res.redirect('/posts');
  } catch (error) {
    res.json({ message: error });
  }
});



//remove posts
router.delete('/:id', async (req, res)=>{
  try{
     await Post.deleteOne({ _id: req.params.id });
      req.flash("danger", "post deleted");
    res.send('success');
  }catch(error){
    res.json({message:error});
  }
     
});
  
module.exports = router;