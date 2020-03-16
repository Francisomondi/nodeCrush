const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const fs = require('fs');

//GET BACK ALL THE POSTS
router.get('/',async (req,res)=>{
  try{
    const posts = await Post.find();
    res.json(posts);

  }catch(error){
    res.json({message: error});

  }
  

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
  

})


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

const readable = fs.createReadStream(__dirname + '/node.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 });
// create writable stream 
const writable = fs.createWriteStream(__dirname + '/nodePipe.txt');
// use pipe to copy readable to writable
 readable.pipe(writable);


var path = 'routes/node.txt';
// checks execute permission 
fs.access(path, fs.constants.R_OK, (err) => {  
    if (err) { 
      console.log("%s doesn't exist", path);

    } else { 
      console.log('can execute %s', path);
     } 
    }); 

module.exports = router;