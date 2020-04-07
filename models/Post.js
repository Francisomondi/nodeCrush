const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        
        author: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
);

const posts   = module.exports= mongoose.model('posts',postSchema);