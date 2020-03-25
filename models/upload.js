const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
   
);

module.exports = mongoose.model('upload', uploadSchema);