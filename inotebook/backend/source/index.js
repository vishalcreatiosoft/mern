const connectToMongo = require('../database/db');
const express = require('express');
const cors = require('cors')

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
	app.use(cors())
app.use('/api/auth',require('../routes/auth'));
app.use('/api/notes',require('../routes/notes'));




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);  
})
