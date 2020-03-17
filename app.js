const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');
const ejs = require('ejs');
const bodyparser = require('body-parser');




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
app.set('view engine', 'ejs');


//serving static files
app.use(express.static('public'));

//routes
app.get('/', (req,res)=>{
 res.render('index');
});

app.use('/posts', postsRouter);

//listen to a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));