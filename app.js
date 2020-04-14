const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require("express-session");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

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

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
    
//body-parser middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//serving static files
app.use(express.static('public'));

//express validator
//app.use(
  //expressValidator({ errorFormatter: (param, msg, value) => {
    // let namespace = param.split('.'),
    // root = namespace.shift(),
    // formParam = root;
     //while(namespace.length){
      //  formParam += '[' + namespace.shift() + ']';
    // }

    // return {
     //   param: formParam,
     //   msg: msg,
     //   value: value
    // };
  //}
  //})
//);

//express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true 
   
  })
);

//express messages middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});



//loading home page
app.get('/', (req,res)=>{

   res.render('index');
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