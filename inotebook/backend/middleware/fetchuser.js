const jwt = require('jsonwebtoken');
JWT_SECRET = 'mernstackdevelopment';

const fetchuser = (req, res, next)=>{
    //get the user from jwt token and add it to the req object

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : 'Please authenticate using valid token'});
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(e){
        res.status(401).send({error : 'Please authenticate using valid token'});        
    }
}

module.exports = fetchuser