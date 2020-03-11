const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');


//importing routes
postsRouter = require('./routes/post');

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,
    useUnifiedTopology: true  },
    ()=> console.log('connected to db'));


//routes
app.get('/', (req,res)=>{
 res.send('hello world');
});

app.use('/posts', postsRouter);

//listen
app.listen(3000, console.log('server started on port 3000'));