const connectToMongo = require('../database/db');
const express = require('express');


connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth',require('../routes/auth'));
app.use('/api/notes',require('../routes/notes'));




app.listen(port,()=>{
    console.log('server is running on port 3000');  
})