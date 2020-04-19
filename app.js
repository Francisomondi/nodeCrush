const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const path = require('path');
const session = require("express-session");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const passport = require('passport');
require('./config/passport')(passport);

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
app.use(
  expressValidator({ errorFormatter: (param, msg, value) => {
     let namespace = param.split('.'),
     root = namespace.shift(),
     formParam = root;
     while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
     }

     return {
        param: formParam,
        msg: msg,
        value: value
     };
  }
  })
);

//express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true 
   
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//express messages middleware
app.use(flash());
app.use((req, res, next) =>{
  res.locals.messages = require("express-messages")(req, res);
  next();
});


app.use(passport.initialize());
app.use(passport.session());

//importing routes
const postsRouter = require('./routes/post');
const uploadsRouter = require('./routes/upload');
const UserRouter = require('./routes/users');
const indexRouter = require('./routes/index');

app.use('/posts', postsRouter);
app.use('/uploads', uploadsRouter);
app.use('/users', UserRouter);
app.use('/', indexRouter);

//listen to a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));