const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');

//DB CONNECTION
mongoose.connect( "mongodb://localhost/crushcourse",
//process.env.DB_CONNECTION   
   { useNewUrlParser: true,
    useUnifiedTopology: true  },
    (error)=> {
       if(!error){
           console.log('connected to db');
        }else{
           console.log(`error connecting to the db!!!! ${error}`);
     }
    });
    
//body-parser middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//serving static files
app.use(express.static('public'));

//loading home page
app.get('/', (req,res)=>{

   res.render('index');
});

app.get('/post/add', (req, res)=>{
    res.render('./post/add');
});

//importing routes
const postsRouter = require('./routes/post');
const uploadsRouter = require('./routes/upload');
const UserRouter = require('./routes/users');

app.use('/posts', postsRouter);
app.use('/uploads', uploadsRouter);
app.use('/users', UserRouter);

//listen to a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));