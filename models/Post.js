const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: "please enter title",
    trim: true,
  },

  author: {
    type: String,
    required: "please enter the author",
    trim: true,
  },
  story: {
    type: String,
    required: "please enter story",
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Post = module.exports= mongoose.model('posts',postSchema);