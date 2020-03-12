const express = require('express');
const app = express();
const mongoose = require ('mongoose');
require('dotenv/config');
const bodyparser = require('body-parser');



//importing routes
postsRouter = require('./routes/post');

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,
    useUnifiedTopology: true  },
    ()=> console.log('connected to db'));


//middlewares
app.use(bodyparser.json());

//routes
app.get('/', (req,res)=>{
 res.send('hello world');
});

app.use('/posts', postsRouter);

//listen to a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));