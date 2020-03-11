const express = require('express');
const app = express();


//routes
app.get('/', (req,res)=>{
 res.send('hello world');
});

//listen
app.listen(3000, console.log('server started on port 3000'));