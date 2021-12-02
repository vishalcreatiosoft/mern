const express = require('express');
const router = new express.Router();


router.get('/',(req, res)=>{
    
    console.log(req.body);
    res.send('welcome');
})


module.exports = router;
