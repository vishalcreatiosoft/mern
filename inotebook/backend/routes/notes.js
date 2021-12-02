const express = require('express');
const router = new express.Router();


router.get('/',(req, res)=>{
    obj = {
        title : 'notes',
        status : 200
    }
    res.json(obj);
})


module.exports = router;
