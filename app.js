const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');
const uploads = require('./models/upload');

//importing routes
postsRouter = require('./routes/post');

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION,
   { useNewUrlParser: true,
    useUnifiedTopology: true  },
    (error)=> {
       if(!error){
           console.log('connected to db');
        }else{
           console.log(`error connecting to the db ${error}`);
     }
    });

//body-parser middlewares
app.use(bodyparser.json());

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//serving static files
app.use(express.static('public'));


app.use('/posts', postsRouter);

//loading home page
app.get('/', (req,res)=>{
 res.render('index');
});

app.post('/uploads', async (req, res) => {
   const upload = new uploads({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      city: req.body.city,
      story: req.body.story
   });

   try {
      const savedUpload = await upload.save()
      res.send(savedUpload);
   }
   catch (error) {
      res.json({ message: error });
   }  
});



//listen to a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));