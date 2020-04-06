const express = require('express');
const router = express.Router();
const upload = require('../models/upload');
const path = require('path');


router.post('/', async (req, res) => {
    const uploads = new upload({
        firstname: req.body.firstname,
        lastname :req.body.lastname,
        email : req.body.email,
        password : req.body.password,
        address : req.body.address,
        city : req.body.city,
        story : req.body.story,
    });
    
    try {
        const savedUpload = await uploads.save();
        console.log(savedUpload);
    }
    catch (error) {
        res.json({ message: error });
    }
});




//get back a specific post
router.get('/:id', async (req, res) => {
    try {
        const post = await uploads.findById(req.params.id);
        res.json(upload);
    } catch (error) {
        res.json({ message: error });

    }

});

//remove posts
router.delete('/:id', async (req, res) => {
    try {
        const removedUpload = await uploads.deleteOne({ _id: req.params.id });
        res.json(removedUpload);
    } catch (error) {
        res.json({ message: error });
    }

});

module.exports = router;