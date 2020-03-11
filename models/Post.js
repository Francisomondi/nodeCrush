const mongoose = require('mongoose');

const postsSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date:{
            type: date,
            default: Date.now
        }
    }
);

module.exports= mongoose.model('posts',postsSchema);